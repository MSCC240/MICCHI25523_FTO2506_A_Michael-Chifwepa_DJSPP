# 🎧 Podcast App — Portfolio Project

A polished React podcast discovery app with global audio playback, favourites, filters, pagination, and a show detail page. Built as the final project for the DJS course.

## Live demo

_(Insert your Vercel URL here)_

## Features

- Landing page: searchable, sortable, filterable grid of podcast previews
- Dynamic show detail pages with seasons and episodes
- **Global audio player** (persistent across pages) with play/pause, seek and progress
- **Favourites**: mark episodes, persisted in `localStorage`, dedicated Favourites page
- Recommended shows carousel on the landing page
- Theme toggle (Light / Dark) persisted in `localStorage`
- Responsive layout for desktop/tablet/mobile
- Deployed to Vercel (SPA routing fallback configured)

## Tech stack

- React (Vite)
- React Router
- CSS modules (or Tailwind — replace with your styling system)
- LocalStorage for persistence
- Optional: `date-fns` for date formatting, `react-slick` or native scroll-snap for carousel

## Quick start

```bash
# install
npm install

# dev
npm run dev

# build
npm run build

# preview production locally
npm run preview
```
