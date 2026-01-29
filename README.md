# PasteVault - Frontend

A modern, responsive web interface for PasteVault - a secure paste sharing service. Built with Next.js and Tailwind CSS.

## Features

- Create text pastes with optional expiration and view limits
- Clean, dark-themed UI
- Copy URL/content to clipboard
- Responsive design (mobile-friendly)
- Server-side rendering for paste viewing
- Real-time form validation

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page - Create new paste |
| `/p/[id]` | View paste page (SSR) |

## Running Locally

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see [backend README](../vault/README.md))

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pastevault-frontend.git
   cd pastevault-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```
   BACKEND_URL=http://localhost:8080
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   ```
   http://localhost:3000
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BACKEND_URL` | Backend API URL | `http://localhost:8080` |

## Project Structure

```
vault-frontend/
├── app/
│   ├── layout.tsx        # Root layout with header
│   ├── page.tsx          # Home page (create paste)
│   ├── globals.css       # Global styles
│   └── p/
│       └── [id]/
│           └── page.tsx  # View paste page
├── components/
│   ├── PasteForm.tsx     # Create paste form
│   ├── PasteView.tsx     # Display paste content
│   └── CopyButton.tsx    # Copy to clipboard button
├── lib/
│   └── api.ts            # API client functions
└── next.config.ts        # API proxy configuration
```

## API Integration

The frontend proxies API requests to the backend:

| Frontend Route | Backend Route |
|----------------|---------------|
| `/api/healthz` | `BACKEND_URL/api/healthz` |
| `/api/pastes` | `BACKEND_URL/api/pastes` |
| `/api/pastes/:id` | `BACKEND_URL/api/pastes/:id` |

This is configured in `next.config.ts` using Next.js rewrites.

## Build

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Import repository on [vercel.com](https://vercel.com)
2. Add environment variable:
   - `BACKEND_URL`: Your backend API URL
3. Deploy

### Manual

```bash
npm run build
npm start
```

## Design Decisions

### 1. Server-Side Rendering
The `/p/[id]` page uses SSR to fetch paste data, ensuring the view count is incremented correctly and content is available for SEO.

### 2. API Proxy
Next.js rewrites proxy API requests to the backend, keeping all routes on the same domain and avoiding CORS issues in production.

### 3. Dark Theme
A dark color scheme reduces eye strain and provides a modern developer-friendly aesthetic.

### 4. Minimal Dependencies
Only essential dependencies are used to keep the bundle size small and maintainable.

## License

MIT
