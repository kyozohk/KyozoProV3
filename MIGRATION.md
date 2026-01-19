# Vite to Next.js Migration Guide

This project has been converted from Vite to Next.js 15 with App Router.

## What Changed

### Files Added
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration for Next.js
- `tailwind.config.ts` - Tailwind CSS configuration
- `.eslintrc.json` - ESLint configuration for Next.js
- `src/app/layout.tsx` - Root layout component
- `src/app/page.tsx` - Home page component

### Files Modified
- `package.json` - Updated dependencies and scripts
- `postcss.config.mjs` - Updated for Next.js
- `src/styles/tailwind.css` - Updated Tailwind imports
- `src/app/App.tsx` - Added 'use client' directive

### Files to Remove (Old Vite Files)
- `vite.config.ts` - No longer needed
- `index.html` - Next.js handles HTML generation
- `src/main.tsx` - Entry point moved to App Router

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Remove old Vite files (optional):
```bash
rm vite.config.ts index.html src/main.tsx
```

## Development

Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

Build for production:
```bash
pnpm build
```

Start production server:
```bash
pnpm start
```

## Key Differences

1. **Client Components**: Components using hooks need 'use client' directive
2. **Routing**: Next.js App Router uses file-system based routing
3. **Imports**: No need for file extensions in imports
4. **Static Assets**: Place in `/public` directory
5. **Environment Variables**: Use `NEXT_PUBLIC_` prefix for client-side variables

## Notes

- The existing warning lints about unused imports are pre-existing and not related to the migration
- TypeScript errors about missing 'next' module will resolve after running `pnpm install`
- The app structure remains the same - all components are in `src/app/components`
