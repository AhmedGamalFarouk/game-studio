# Game Studio

Welcome to Game Studio, a Next.js application designed to showcase a collection of games, manage a wishlist, and provide information about various game categories.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Learn More](#learn-more)
- [Deployment](#deployment)

## Features

- **Home Page**: Displays a curated selection of games.
- **Games Listing**: Browse all available games with detailed pages for each.
- **Categories**: Explore games by different categories.
- **Wishlist**: Add games to your personal wishlist.
- **About Us**: Information about the Game Studio.
- **Contact Us**: Contact form or information.
- **API Integration**: Backend API for games and wishlist management.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/) or [Bun](https://bun.sh/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/game-studio.git
   cd game-studio
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Development Server

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the files.

## Project Structure

The project follows a standard Next.js application structure:

- `src/app/`: Contains all the Next.js pages and API routes.
  - `src/app/page.js`: The main home page.
  - `src/app/about/page.js`: About Us page.
  - `src/app/categories/page.js`: Categories listing page.
  - `src/app/contact/page.js`: Contact Us page.
  - `src/app/games/page.js`: Games listing page.
  - `src/app/games/[gameId]/page.js`: Dynamic page for individual game details.
  - `src/app/wishlist/page.js`: Wishlist page.
  - `src/app/api/`: API routes.
    - `src/app/api/games/route.js`: API for fetching games.
    - `src/app/api/wishlist/route.js`: API for managing the wishlist.
    - `src/app/api/wishlist/[id]/route.js`: API for specific wishlist items.
- `src/components/`: Reusable React components.
  - `src/components/GameCard.js`: Component for displaying game information.
  - `src/components/Navbar.js`: Navigation bar component.
- `src/data/`: Local data sources.
  - `src/data/navigation.js`: Navigation links data.
  - `src/data/wishlistData.js`: Sample wishlist data.
- `public/`: Static assets like images and icons.
- `styles/`: Global CSS styles.

## API Endpoints

- `GET /api/games`: Get all games.
- `GET /api/games/[gameId]`: Get a specific game by ID.
- `GET /api/wishlist`: Get all items in the wishlist.
- `POST /api/wishlist`: Add a game to the wishlist.
- `DELETE /api/wishlist/[id]`: Remove a game from the wishlist.
