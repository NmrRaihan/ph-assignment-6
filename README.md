# 💪 FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of 12 workouts
pulled from a live API, dig into the details of any lift, and build out today's plan — track what
you're doing, save what you want to do later, and check things off as you go.

## 🛠️ Technologies Used

- **Next.js 16 (App Router) + TypeScript** — routing, layouts, and typed data throughout
- **Tailwind CSS v4** — dark theme + neon accent color defined once via CSS theme tokens
- **React Context + localStorage** — shared Plan/Saved state across pages that survives a refresh
- **React-Toastify** — toast notifications for every plan/save/remove action
- Data fetched live from a public FitLog API (`api.abcz.workers.dev`)

## ✨ Features

1. **Live workout library** — all 12 workouts are fetched from the API at request time and rendered
   in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile), each card showing its image,
   muscle-group tags, equipment, and a duration/calories/rating stats row.
2. **Sort by Duration, Calories, or Rating** — a dropdown re-sorts the library instantly without
   re-fetching anything, using the data already loaded.
3. **Dynamic workout detail pages** — every card links to its own `/workout/[id]` page with a full
   spec table and step-by-step instructions, generated from one shared template rather than 12
   separate files.
4. **Plan & Saved tracking that persists** — "Add to Today's Plan" and "Save for Later" update shared
   state visible across every page (the navbar badges update live, from anywhere), and the whole thing
   survives a page reload via localStorage.
5. **My Plan dashboard** — a live-updating Exercises/Minutes/Calories summary, tabbed Plan/Saved lists,
   Mark as Done and Remove actions, and a proper empty state pointing back to the library.

Also included: a custom 404 page for any invalid route, a loading state while the library fetches,
and toast notifications confirming every add/remove/done action.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## 📁 Project Structure

```
src/
  app/
    page.tsx              Home — Hero + Library
    loading.tsx            loading state for the Home page fetch
    not-found.tsx          custom 404
    my-plan/page.tsx        My Plan dashboard
    workout/[id]/page.tsx   dynamic workout detail page
  components/               Navbar, Hero, WorkoutCard, WorkoutGrid, SortDropdown,
                             WorkoutActions, PlanMetrics, PlanWorkoutItem
  context/PlanContext.tsx   shared Plan/Saved state + localStorage sync
  lib/api.ts                fetch helpers for the FitLog API
  types/workout.ts           Workout type, matched to the real API response
```