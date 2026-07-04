# Swifty Mario

An original endless side-scrolling platform prototype. The player runs across an infinite procedurally-extended course, collecting coins, stomping enemies, and breaking mario to accumulate a distance-weighted score.

---

## Tech Stack

| Layer          | Technology               | Version  | Role                                                              |
| -------------- | ------------------------ | -------- | ----------------------------------------------------------------- |
| Framework      | React                    | 19.2     | UI rendering, component tree                                      |
| Language       | TypeScript               | 6.0      | Static typing                                                     |
| Build          | Vite                     | 8.0      | Dev server, HMR, bundling                                         |
| Styling        | Tailwind CSS             | 4.3      | Utility-first CSS                                                 |
| State          | Jotai                    | 2.20     | Atom-based state (difficulty, leaderboard, player name, renderer) |
| Graphics (alt) | PixiJS                   | 8.18     | Optional WebGL renderer, lazy-loaded                              |
| Animation      | GSAP                     | 3.15     | Score counter tween                                               |
| Audio          | Howler.js                | 2.2      | Sound effects via Web Audio                                       |
| Validation     | Zod                      | 4.4      | Runtime schema checks (level data, leaderboard, player name)      |
| Routing        | React Router             | 7.15     | SPA routing: home, fullscreen, 404                                |
| Error Tracking | Sentry                   | 10.53    | Exception capture in production                                   |
| Testing        | Vitest + Testing Library | 4.1      | Unit and integration tests                                        |
| E2E            | Playwright               | 1.60     | Browser-level end-to-end tests                                    |
| Component Dev  | Storybook                | 10.4     | Isolated component development                                    |
| Linting        | ESLint + Prettier        | 10 / 3.8 | Code quality, formatting                                          |

---

## Architecture

```
src/
  components/        UI components (game stage, HUD, selectors, sprites, overlays)
    renderers/       DOM and PixiJS renderers (switchable at runtime)
  constants/         Game physics, level data, difficulty presets
  hooks/             React hooks (game loop, simulation, keyboard, audio, viewport)
  pages/             Route-level pages (home, fullscreen, 404)
  routes/            Layout wrapper
  schema/            Zod schemas
  services/          Sentry, Howler sound bank, WAV synthesis
  stores/            Jotai atoms with localStorage persistence
  types/             TypeScript type definitions
  utils/             Pure game logic (physics, collision, enemies, map, camera, scoring)
```

The game simulation runs in React refs via `useGameSimulation`, driven by a fixed-timestep `requestAnimationFrame` loop. Each tick produces a new immutable `GameState`, broadcast to subscribers via `useSyncExternalStore`.

Two renderers are available: a DOM renderer (Tailwind-styled divs) and an experimental PixiJS WebGL renderer (lazy-loaded). The world extends infinitely by cloning the level segment with per-segment enemy variation.

---

## Development

```sh
pnpm install
pnpm dev          # Start dev server
pnpm test         # Run unit tests
pnpm e2e          # Run Playwright e2e tests
pnpm storybook    # Component explorer
pnpm build        # Production build
```
