# Imgur Image Search App

## Overview

This Angular application allows users to search for images on Imgur, view them in a responsive grid layout, and open them in a modal for a full-screen view. It includes features like pagination, sorting options, and time window filtering.

## Features

- **Image Search**: Search for images on Imgur using keywords
- **Sorting Options**: Sort results by viral, top, time, or rising
- **Time Filtering**: Filter results by day, week, month, year, or all time
- **Responsive Grid Layout**: View images in a responsive grid that adapts to different screen sizes
- **Image Modal**: Click on any image to view it in a full-screen modal
- **Pagination**: Navigate through multiple pages of search results

## Technical Details

- Built with Angular 16+
- Uses standalone components
- Communicates with the Imgur API
- Implements client-side caching for improved performance
- Responsive design that works on mobile, tablet, and desktop

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/imgur-app.git
   cd imgur-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Usage

1. Enter a search term in the search box
2. (Optional) Select sorting options and time filters
3. Click "Search" or press Enter
4. Browse through the results
5. Click on any image to view it in full-screen mode
6. Use the pagination controls to navigate between pages

## Project Structure

- `src/app/app.component.ts` - Main component that handles the UI and user interactions
- `src/app/imgur.service.ts` - Service that communicates with the Imgur API
- `src/app/image-modal/image-modal.component.ts` - Component for displaying full-screen images

## API Integration

This application uses the Imgur API to search for images. The API requires a Client ID for authentication, which is included in the service.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Imgur API](https://apidocs.imgur.com/) for providing the image data
- [Angular](https://angular.io/) for the framework
