# Scrybe AI Frontend: Light Theme and Layout Overhaul (Phase 1)

This document summarizes the changes made to normalize the UI to a clean light theme, ensure full-screen layout, and improve consistency.

## Goals
- Light theme as the default across the app
- Full viewport height usage with robust containers
- Consistent header/tabs styles and table visuals
- Preserve all business logic

## Key Changes

1) Global light baseline
- `src/assets/styles/index.css`: set body to light background (`bg-gray-50 text-gray-900`), ensure `html, body, #root` are height:100%. Removed dark gradient overlay.

2) Header (app)
- `src/components/layout/Header.js`: Restyled for light theme (white background, border bottom, accessible button variants). Mobile menu and desktop buttons now use light palette.

3) Main App and Tabs
- `src/App.js`:
  - Removed unused dark `AppBackground` and legacy `Footer` import.
  - Updated Tab group to light styles (white background, gray borders, primary selection state, accessible focus rings).
  - Converted AI Track Record to light table/card visuals (gray-50 header, gray-200 borders, readable text colors).

4) Legacy Footer (if used anywhere else)
- `src/components/layout/Footer.js`: Lightened hover colors and text for consistency.

## What to Expect
- The app now occupies full height and renders on a light surface by default.
- Headers/tabs are crisp with white backgrounds and proper borders.
- Performance table (AI Track Record) reads clearly on light theme.

## Notes for Contributors
- Prefer `bg-white` cards with `border border-gray-200` and `shadow-sm|shadow-soft` for surfaces.
- Use text colors: `text-gray-900` for headings, `text-gray-700/600/500` for body/subtext.
- Accents: `primary` and `secondary` color scales from `tailwind.config.js`.
- Avoid `bg-white/5`, `text-white`, or glassmorphism on light surfaces.
- Tabs: selected → `bg-primary-50 text-primary-700 border-primary-200`; unselected → `bg-white text-gray-600 hover:bg-gray-50`.

## Next Phases (Suggested)
- Sweep specific cards (Momentum, Price Action, Volatility, etc.) to remove remaining dark-on-light mixes (e.g., `text-gray-300` on white) and unify to `text-gray-600`.
- Ensure all landing components align spacing to `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Accessibility: verify color contrast; add focus states where missing.
- Add a simple visual regression smoke test for critical pages.

