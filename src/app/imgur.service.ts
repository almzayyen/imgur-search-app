import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of, catchError, finalize } from 'rxjs';

export interface SearchOptions {
  sort?: 'viral' | 'top' | 'time' | 'rising' | 'none'; 
  window?: 'day' | 'week' | 'month' | 'year' | 'all' | 'none'; 
  page?: number;
  perPage?: number;
}

export interface SearchResponse {
  data: any[];
  success: boolean;
  status: number;
  totalPages?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ImgurService {
  private clientId = 'b067d5cb828ec5a';
  private apiUrl = 'https://api.imgur.com/3/gallery/search';
  private defaultPerPage = 60;
  private cache: Map<string, SearchResponse> = new Map();
  private allFetchedData: Map<string, any[]> = new Map();

  constructor(private http: HttpClient) {}

  searchImages(
    query: string,
    options: SearchOptions = {}
  ): Observable<SearchResponse> {
    const headers = new HttpHeaders({
      Authorization: `Client-ID ${this.clientId}`,
    });

    // Build the URL - this time we'll use the actual page from options
    let url = this.apiUrl;
    
    // Only add sort if it's provided and not 'none'
    if (options.sort && options.sort !== 'none') {
      url += `/${options.sort}`;
      
      // Add window only if sort is 'top' (as per Imgur API requirements)
      if (options.sort === 'top' && options.window && options.window !== 'none') {
        url += `/${options.window}`;
      }
      
      // Use the actual page number from options
      const pageToFetch = options.page || 0;
      url += `/${pageToFetch}`;
    }

    url += `?q=${encodeURIComponent(query)}`;
    
    // Add a parameter to get more results per page
    url += '&perPage=100';

    console.log('API URL:', url); // Debug log

    // Create a cache key that includes the page number
    const cacheKey = url;
    
    // Check cache for the API request
    if (this.cache.has(cacheKey)) {
      console.log('Serving from cache:', cacheKey);
      return of(this.cache.get(cacheKey)!);
    }

    // Make the API request
    return this.http.get<SearchResponse>(url, { headers }).pipe(
      map((response: any) => {
        // Filter out items without images or with broken links
        const filteredData = response.data.filter((item: any) => {
          return (
            item.images &&
            item.images.length > 0 &&
            item.images[0].type &&
            item.images[0].type.startsWith('image/')
          );
        });

        console.log(`API returned ${response.data.length} items, filtered to ${filteredData.length}`);

        // Estimate total pages based on the response
        // Imgur doesn't provide a total count, so we'll estimate
        const totalPages = Math.max(10, Math.ceil(filteredData.length / 10)); // Assume at least 10 pages
        
        console.log(`Estimated total pages: ${totalPages}`);

        const result = {
          ...response,
          data: filteredData,
          totalPages: totalPages,
        };

        // Cache the result
        this.cache.set(cacheKey, result);

        return result;
      }),
      catchError((error) => {
        console.error('Error fetching images:', error);
        return of({ data: [], success: false, status: 500, totalPages: 0 });
      })
    );
  }

  // Clear cache method
  clearCache() {
    this.cache.clear();
    this.allFetchedData.clear();
  }
}
