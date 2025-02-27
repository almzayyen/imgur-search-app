import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ImgurService, SearchOptions } from './imgur.service';
import { ImageModalComponent } from './image-modal/image-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, ImageModalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'imgur-app';
  images: any[] = [];
  query: string = '';
  loading: boolean = false;
  error: string | null = null;
  selectedImage: any = null;
  
  // Search options
  sortOptions = ['none', 'viral', 'top', 'time', 'rising'];
  windowOptions = ['none', 'day', 'week', 'month', 'year', 'all'];
  
  // Default search options
  searchOptions: SearchOptions = {
    sort: 'viral',
    window: 'day',
    page: 0,
    perPage: 60
  };
  
  // Pagination
  currentPage = 0;
  totalPages = 0;
  hasMorePages = true;

  constructor(private imgurService: ImgurService) {}

  searchImages(resetPage: boolean = true) {
    if (this.query.trim()) {
      this.loading = true;
      this.error = null;
      
      // Reset page if requested
      if (resetPage) {
        this.searchOptions.page = 0;
        this.currentPage = 0;
      }
      
      console.log(`Searching with options:`, this.searchOptions);
      
      this.imgurService.searchImages(this.query, this.searchOptions).subscribe(
        (response) => {
          this.images = response.data;
          this.loading = false;
          
          // Update pagination info
          if (response.totalPages) {
            this.totalPages = response.totalPages;
            console.log(`Total pages: ${this.totalPages}`);
          }
          
          // Check if we have more pages
          this.hasMorePages = this.currentPage < this.totalPages - 1;
          console.log(`Current page: ${this.currentPage + 1}, Has more pages: ${this.hasMorePages}`);
          
          if (this.images.length === 0) {
            if (this.currentPage > 0) {
              // If current page is empty but not the first page, go back
              this.error = 'No more images found. Returning to previous page.';
              setTimeout(() => {
                this.prevPage();
              }, 1500);
            } else {
              this.error = 'No images found. Try a different search term.';
            }
          }
        },
        (error) => {
          console.error('Error fetching images:', error);
          this.loading = false;
          this.error = 'An error occurred while fetching images. Please try again.';
        }
      );
    }
  }

  openImageModal(item: any) {
    this.selectedImage = item.images[0];
    this.selectedImage.title = item.title;
    this.selectedImage.description = item.description;
  }

  closeImageModal() {
    this.selectedImage = null;
  }
  
  // Pagination methods
  nextPage() {
    if (this.hasMorePages) {
      this.searchOptions.page = (this.searchOptions.page || 0) + 1;
      this.currentPage = this.searchOptions.page;
      console.log(`Moving to page ${this.currentPage + 1}`); // Debug log
      this.searchImages(false);
    }
  }
  
  prevPage() {
    if (this.searchOptions.page && this.searchOptions.page > 0) {
      this.searchOptions.page -= 1;
      this.currentPage = this.searchOptions.page;
      console.log(`Moving to page ${this.currentPage + 1}`); // Debug log
      this.searchImages(false);
    }
  }
  
  // Update search options and trigger search
  updateSearchOptions() {
    this.clearCache();
    this.searchImages(true);
  }
  
  // Check if we're on the last page
  isLastPage(): boolean {
    return this.currentPage >= this.totalPages - 1 || !this.hasMorePages;
  }

  clearCache() {
    this.imgurService.clearCache();
  }
}
