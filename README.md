# NPM Explorer

A modern web application for exploring npm package metadata and download statistics. Built with Next.js, and TailwindCSS.

## Features

- 🔍 Search any npm package
- 📊 View detailed package metadata
- 📈 Track download statistics
- 🎨 Modern, responsive UI
- 🌙 Dark mode support
- 📱 Mobile-friendly design

## Tech Stack

- **Framework**: Next.js 15
- **UI**: TailwindCSS 4
- **Styling**: shadcn/ui components
- **State Management**: TanStack Query
- **API**: Hono, JStack
- **Deployment**:
  - **Frontend**: Vercel
  - **Backend**: Cloudflare Workers
- **Package Manager**: Bun

## Getting Started

1. Clone the repository

   ```bash
   git clone git@github.com:pyyupsk/npm-explorer.git
   cd npm-explorer
   ```

2. Install dependencies:
   ```bash
   bun install
   ```
3. Start the development server:
   ```bash
   bun run dev # for frontend
   bun run server:dev
   ```

## Available Scripts

- `bun build` - Build for production
- `bun dev` - Start development server
- `bun format` - Format code with Prettier
- `bun lint` - Run ESLint
- `bun lint:fix` - Fix ESLint errors
- `bun server:deploy` - Deploy backend to Cloudflare
- `bun server:dev` - Start backend development server
- `bun start` - Start production server
- `bun typecheck` - Run TypeScript type checking

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── constants/        # Application constants
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
├── server/           # API routes and server-side logic
├── styles/           # Global styles and TailwindCSS config
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and helpers
└── middleware.ts     # Next.js middleware configuration
```

## API Routes

- `/api/package/metadata` - Get package metadata
- `/api/downloads/range` - Get download statistics
- `/api/og` - Generate OpenGraph images

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
