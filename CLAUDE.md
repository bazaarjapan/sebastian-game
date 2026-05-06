# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow ― Issue 駆動

非自明な作業 (シナリオ拡張・機能追加・リファクタなど) を始める前に、必ず GitHub Issue を切ってからブランチを作る。

1. **Issue を起票** — `gh issue create` で目的・スコープ・完了条件を書く。割り当てられた番号を控える
2. **ブランチを作る** — Issue 番号をブランチ名に含める。例: `feat/12-extend-story`、`fix/15-typo`
3. **キリのいいコミットごとに進捗を Issue に記録** — `gh issue comment <番号> --body "..."` で「何をやったか / 残りタスク」を都度コメントする。コミットメッセージのフッタにも `Refs #<番号>` を入れて Issue から辿れるようにする
4. **完了時に Issue を閉じる** — PR をマージするか、直接 `gh issue close <番号>` でクローズ

軽微な作業 (typo 修正、ドキュメントの一行追記など) は Issue を省略してよい。判断に迷ったら Issue を切る。

## Project

Static HTML/CSS/JS visual novel ("セバスチャン ―真夜中の薔薇館―"). No build step, no dependencies, designed for direct deployment to GitHub Pages. All assets are co-located: `images/`, `movie/`, `bgm/`.

## Running locally

The opening video and BGM are blocked from loading via `file://` due to browser autoplay/CORS policies. Always serve over HTTP:

```sh
py -m http.server 8765
# then open http://localhost:8765/
```

`python -m http.server` may fail on Windows because the user's default `python` is the Microsoft Store stub — use `py` (the launcher) instead.

To stop a backgrounded server: `Get-Process python* | Stop-Process -Force` (PowerShell).

There is no test runner. The closest thing to a lint/check is parsing the two JS files:

```sh
node --check script.js
node --check scenes.js
```

This catches syntax errors only; gameplay correctness still has to be verified in the browser.

## Deployment

Push the entire directory contents to a GitHub repo, then enable Pages from the root of `main`. There is no build artifact — what you see is what gets served. All asset paths are relative (`images/...`, `bgm/...`, `movie/...`), so it works under any subpath.

## Architecture

### Scene graph (`scenes.js`)

The story is a directed graph of nodes keyed by id (e.g. `s1_4`, `chapter3_intro`). Each node is one of:

- **Linear**: has `next` → engine waits for click, then renders the next id
- **Branching**: has `choices: [{text, affection, next}]` → engine renders buttons; clicking applies `affection` delta and jumps to `next`
- **Router**: special id `ending_branch` is intercepted by the engine (`script.js` `routeToEnding`) and dispatched to one of four endings based on `State.affection` thresholds (`>=8` true, `>=4` normal, `>=0` bittersweet, `<0` bad)

Per-scene fields supported by `renderScene()`:
- `bg` — sets background image (only swaps if changed)
- `character` — overlay image (`null` to hide)
- `speaker` — name plate text
- `text` — dialogue HTML, supports `<span class="narration">` for italicized prose
- `effect` — space-separated tokens: `shake`, `flash`, `heartbeat-start`, `heartbeat-stop`, `character-show`
- `bgm` — `'bgm1'` (calm) or `'bgm2'` (tense); only present on scenes that should *change* the track. Otherwise the current track keeps playing across many scenes.
- `chapter` — sets the displayed chapter number; only set on chapter intros

When adding scenes, **don't tag every node with `bgm`** — only the ones where the music should switch. The current track persists across un-tagged scenes.

### Engine (`script.js`)

State is global (`const State = {...}`), not encapsulated. The engine is built around three IIFE modules:

- **`Music`** — manages two `<audio>` elements with crossfade via `setInterval`. Persists mute state in `localStorage['sebastian_muted']`. Shares mute state with `Sfx`.
- **`Sfx`** — synthesizes UI sounds via Web Audio API (no audio files). Three sounds: `tick()` (per-character typewriter), `choose()` (choice click), `heart()` (positive affection). All return early if `Music.isMuted()`.
- The typewriter (`typeText` in `script.js`) builds a DOM skeleton mirroring the HTML structure of `text`, then progressively fills text nodes character-by-character. This is how it can both animate plain characters AND preserve inline tags like `<span class="narration">` and `<br>`.

### Save data

A single save slot is stored at `localStorage['sebastian_save_v1']` as JSON (current scene id, affection, BGM track). Mute is a separate key (`sebastian_muted`). If the save schema ever changes incompatibly, bump the key suffix rather than migrating in place — old saves should fail to load cleanly rather than corrupt state.

### HUD auto-fade

The top HUD (`#hud`) is transparent and fades to ~18% opacity after `HUD_IDLE_MS` (2.5s) of input inactivity. Mouse/touch/key activity bumps it back to full. The floating mute button (`#muteBtn`) is shown only on non-game screens (title/credits/ending); the game screen has an inline mute icon inside the HUD pill. `showScreen()` toggles this.

### Endings

`ENDINGS` lives in `script.js` (not `scenes.js`) — they're not scene graph nodes, they're a separate screen with their own background and BGM. The router function is `routeToEnding()`, called when `renderScene('ending_branch')` is invoked.

## Affection math

Choice deltas range roughly -5 to +4. The running total is clamped to `[-10, +10]`. The choice with the largest single impact is the final 5章 decision (-5 for refusal). When adding choices, keep deltas in this range — a single +10 choice would let players bypass earlier negative answers and still reach TRUE END.

## Adding content

**New scene**: add a node to `SCENES` with a unique id, point a previous node's `next` (or a choice's `next`) at it. Scene id convention: `s<chapter>_<n>` for linear nodes, `s<chapter>_choice<n>` for branch points, `chapter<n>_intro` for chapter openings, `s<chapter>_end` for chapter outros. Verify every `next` and choice target resolves to an existing id before considering the change done — there is no static checker for this.

**New chapter image**: add file under `images/`, then add a key to the `IMG` map at the top of `scenes.js` and reference it via `IMG.yourkey`. Asset keys are short descriptive names (`hall`, `closeup`).

**New SFX**: add a function inside the `Sfx` IIFE following the pattern of `tick`/`choose` — synthesize via `ctx.createOscillator()` + gain envelope, no audio file needed.

## Browser quirks to be aware of

- The opening `<video>` element has no `muted` attribute — the engine intentionally requires a click on "▶ オープニングを再生" to start with sound (browser autoplay policy blocks unmuted autoplay). Don't add `autoplay` or `muted` to the element or sound will never play.
- AudioContext must be created/resumed inside a user gesture handler. `Sfx.ensure()` is called from the OP-play, OP-skip, and title-button click handlers for this reason.
- The `bgm/*.mp3` files are `loop`ed — if you replace them, ensure they're seamless (no silence at start/end), or the loop point will click.
