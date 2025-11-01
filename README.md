# Next.js REST API

This repository contains a simple Next.js REST API.

## Requirements
- Node.js 18+ (or the Node version used by your environment)
- npm (or yarn)
- A running MongoDB instance (connection string required)

## Setup & Installation

Follow these steps to get the project running locally:

```bash
# 1. Clone the repository
git clone https://github.com/tanjona17/nextjs15_rest_api.git

# 2. Enter the project folder
cd nextjs15_rest_api

# 3. Install dependencies
npm install

# 4. Create a .env file in the project root

# 5. Run the app in development mode
npm run dev
```

## Setup environment variables

Create a `.env` file in the project root.

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Common commands

- Run development server: `npm run dev`
- Build for production: `npm run build`

## Notes
- The API routes are located under `app/api` (for example: `app/api/dashboard/blogs`).
- Ensure your MongoDB URI is reachable from your environment.





