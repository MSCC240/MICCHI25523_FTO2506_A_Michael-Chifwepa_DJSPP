# 🎧 DJS Portfolio Piece — Podcast App (React)

## Overview

A polished React podcast app built as the final DJS portfolio project.
Features a searchable, sortable, and filterable listing of podcast previews, dynamic show detail pages with season/episode browsing, a global audio player, and a favourites system persisted to `localStorage`.

## Live demo

[_Live App on Vercel_](https://my-demopodcast-app.vercel.app/)

## Tech stack

- React (functional components + hooks)
- React Router for navigation
- Context API for global state (audio, favourites, podcasts)
- Vite for dev + build
- Plain CSS / CSS modules

# Key features

## 🔊 Global Audio Player

- Plays audio using a placeholder API
- Keeps the player fixed at the bottom of the screen across all pages
- Ensures uninterrupted playback when navigating between pages
- Provides play, pause, seek, and progress tracking

## ❤️ Favourites

- Allows users to favourite or unfavourite episodes via a button/icon
- Uses localStorage to persist favourites across sessions
- Provide visual feedback for favourited items
- Creates a favourites page displaying all saved episodes
- Displays associated show and season for each favourite
- Groups favourites by show title
- Add sorting options:

* A–Z / Z–A by title
* Newest / Oldest by date added

## 🎠 Recommended Shows Carousel

- Adds a horizontally scrollable carousel to the landing page
- Shows each show’s image, title, and genre tags
- Supports looping and navigation via swipe or arrows
- Clicking a carousel item navigates to the show’s detail page

## 🌗 Theme Toggle

- Includes a toggle for switching between light and dark mode
- Persistant theme selection using localStorage
- Ensures the entire app UI updates smoothly
- Uses appropriate icons to indicate current theme
- Reflects selected theme across all views and components
