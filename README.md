# Robota Mini App

## Project Overview
Robota Mini App is a Telegram Mini App designed to gamify user engagement through a token-based reward system and daily streak tracking.

## Technology Stack
- Frontend: Next.js 13+ (React framework)
- Backend: Express.js
- Database: Mongo and Redis

## Project Structure
- Frontend (Next.js):
  - `/app`: Main application directory (using App Router)
  - `/app/components`: Reusable React components
  - `/app/streak-celebration`: Streak celebration page
  - `/app/telegram-check`: Initial page for first-time users
  - `/app/home`: Main dashboard page
  - `/app/leaderboard`: Leaderboard page
  - `/app/friends`: Friends page

- Backend (Express.js):
  - Separate project (not in the same repository as the frontend)
  - Provides API endpoints for user data, streak tracking, and leaderboard

## Key Features
1. Daily Streak Tracking:
   - Users can maintain and view their daily login streak
   - Streak celebration page displays current streak and tokens earned

2. Token System:
   - Users earn `$TODO` tokens for various activities
   - Tokens are displayed in the user interface

3. Leaderboard:
   - Displays top users based on tokens or streaks

4. Telegram Integration:
   - Utilizes Telegram Mini App capabilities
   - Accesses Telegram user data for authentication and display

5. User Profile:
   - Displays user information fetched from Telegram

6. Friend System:
   - Users can view and interact with friends (details to be implemented)

## Authentication and Data Flow
- Initial authentication happens through Telegram Mini App
- Telegram user ID is used as the primary identifier for users
- Frontend stores Telegram ID in client-side storage (e.g., localStorage)
- Backend API requests include Telegram ID for user identification
- No server-side sessions implemented; the system relies on stateless API calls

## API Endpoints (Express.js Backend)
- `/api/users/authenticate`: authenticate the telegram user and then Creates or fetches user data
- `/api/users/welcome-token`: Awards welcome tokens to new users
- `/api/users/daily-streak`: Checks and updates daily streaks
- `/api/leaderboard`: Retrieves leaderboard data

## Frontend Routes
- `/`: Initial route, redirects based on user state
- `/telegram-check`: First-time user check and data collection
- `/streak-celebration`: Displays streak information after login
- `/home`: Main dashboard
- `/leaderboard`: Displays user rankings
- `/friends`: Friend list and interactions
- `/telegram-data`: Displays Telegram user information

## Development Notes
- The project uses Next.js 13+ features, including the App Router
- Server Components are used for data fetching where possible
- Client Components are used for interactive elements and state management
- Tailwind CSS is used for styling
- The backend is a separate Express.js project, not integrated into the Next.js API routes

## Current Development Status
- Basic structure and key pages implemented
- Integration with Telegram Mini App environment in progress
- Backend API structure defined, implementation details may vary

Note: This README reflects the current understanding of the project and may need updates as development progresses.