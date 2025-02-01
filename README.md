# Car Dealer App

A simple car dealer web application built using **Next.js** and **Tailwind CSS**. This app allows users to filter vehicles by make and model year, and view a list of available car models for each selection.

## Features

- **Vehicle Make Selection**: Fetches vehicle makes from the NHTSA API and allows the user to select a car make from a dropdown.
- **Model Year Selection**: Users can select the model year of the car, ranging from 2015 to the current year.
- **Dynamic Routing**: Based on user selections, the app navigates to a result page with details of car models.
- **Static Generation**: Uses `generateStaticParams` for pre-rendering the result pages for specific makes and years.
- **Tailwind CSS Styling**: Responsive design and easy-to-use UI components styled with Tailwind CSS.
- **Loading States**: Displays a loading indicator while fetching data using React Suspense.

## Architecture

- **Next.js (App Router)**: Utilizes Next.js' app directory structure for better modularity and easier routing.
- **API Integration**: Fetches data from the National Highway Traffic Safety Administration (NHTSA) API for vehicle makes and models.
- **Static Site Generation (SSG)**: Uses `generateStaticParams` to pre-generate result pages at build time for certain makes and years.
- **Responsive Design**: Fully responsive, using Tailwind CSS to ensure the application works well on both mobile and desktop devices.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version >= 16)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Development

To start the development server and view the app locally:

1. Run the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

You can now begin editing the project. The page will reload automatically as you make changes.

## Build and Production

To build the application for production:

1. Run the build command:

   ```bash
   npm run build
   ```

2. To start the production server:
   ```bash
   npm start
   ```

This will serve the app optimized for production.

## Folder Structure

```
/app
  /result
    /[makeId]
      /[year]
        page.tsx            # Result page displaying the vehicle models
  page.tsx                  # Main filter page with dropdowns for make and year
/public
  /images                   # Images, icons, etc.
/styles
  /globals.css              # Global styles (Tailwind is configured here)
/components
  - Custom components (optional)
/utils
  - Helper functions (optional)
/.next                      # Build output (generated during build)
```

## Environment Variables

Create a `.env.local` file in the root of the project for any local environment variables (if needed). Example:

```
NEXT_PUBLIC_API_URL=https://vpic.nhtsa.dot.gov/api
```

## Linting and Formatting

To maintain code quality and consistency, the project uses **ESLint** and **Prettier**.

- To lint the code, run:

  ```bash
  npm run lint
  ```

- To format the code, run:
  ```bash
  npm run format
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
