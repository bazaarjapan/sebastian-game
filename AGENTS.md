# Repository Guidelines

## Project Structure & Module Organization

This repository is a dependency-free static visual novel game. The root contains all runtime files:

- `index.html` - page structure, screens, audio/video elements, and script loading.
- `style.css` - Gothic/Victorian theme, layout, animations, HUD, modals, and responsive styling.
- `script.js` - game engine: screen flow, typewriter effect, BGM/SFX, save/load, HUD, endings.
- `scenes.js` - story scene graph, choices, affection deltas, backgrounds, and chapter routing.
- `images/`, `movie/`, `bgm/` - artwork, opening video, and looping music.
- `README.md`, `CLAUDE.md` - user-facing and architecture documentation.

There is no `tests/` directory and no build output directory.

## Build, Test, and Development Commands

No build step is required. Serve over HTTP because browser media policies can block video and audio over `file://`.

```sh
py -m http.server 8765
```

Open `http://localhost:8765/`. On Windows, prefer `py` because `python` may resolve to the Microsoft Store stub.

Useful checks:

```sh
node --check script.js
node --check scenes.js
```

These validate syntax only; they do not simulate gameplay.

## Coding Style & Naming Conventions

Use plain HTML, CSS, and vanilla JavaScript. Keep files dependency-free unless tooling is clearly justified. Use two-space indentation for HTML/CSS and follow the existing JavaScript style: `const`/`let`, semicolons, concise helpers, and IIFE modules such as `Music` and `Sfx`.

Scene IDs should follow patterns such as `s1_4`, `s3_choice1`, `chapter5_intro`, and `s4_end`. Asset keys in `IMG` should be short descriptive names, for example `hall` or `closeup`.

## Testing Guidelines

Before submitting changes, run the syntax checks and manually play affected paths in the browser. For story edits, verify that every `next` and choice target exists, and that `ending_branch` remains handled by `script.js`. For media or UI changes, confirm loading through the local HTTP server.

## Commit & Pull Request Guidelines

This directory may not include Git history, so use clear conventional messages such as `fix: correct chapter 4 route` or `feat: add new ending scene`. Pull requests should include a description, affected files, manual test steps, and screenshots or recordings for visual changes.

## Architecture Notes

The story is a directed graph in `scenes.js`; the engine renders scenes by ID in `script.js`. BGM persists until a scene declares a new `bgm` value, so do not tag every scene with music. Save data is stored in `localStorage` under `sebastian_save_v1`.
