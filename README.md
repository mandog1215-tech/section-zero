# Section Zero Interactive — the studio site

The public home of Section Zero Interactive, an independent game studio.

**Live site:** https://mandog1215-tech.github.io/section-zero/

**Status:** live and current. The published state is tagged
`live-2026-11-26` (see Resume point below).

This site was rebuilt from the ground up in November 2026 — new
words, new pictures, new structure — and now shows only AirportSim,
with more games to join as they finish. It is built around four ideas:

- **Pulse.** The front page opens with tonight's work, fed by
  `pulse.js`. That file is the only place the live wire is edited;
  the homepage console and the Studio Desktop both read from it.
- **Studio.** `studio.html` presents the studio and its game: the
  studio, AirportSim, and the numbers behind it.
- **AirportSim.** The game's pages are built around its world rather
  than its paperwork — an airfield diagram, the airlines, the engine,
  the testing, and the road ahead.
- **Toys.** A draggable-window desktop (`desktop.html`), a pocket
  landing strip on the AirportSim page, and an idle starfield
  screensaver (`site.js`) that drifts in when a page is left alone.

Plain static HTML, CSS and JavaScript. No build step; GitHub Pages
serves the repository as it stands. Type is Bungee, Archivo and
Space Mono via Google Fonts. Everything else is drawn or written
in-repo.

## Publishing

GitHub Pages serves this repository as it stands — branch `main`,
path `/` (verified in the repo's Pages settings: status `built`).
Every push to `main` republishes the site; there is no build step
and no release artifact. The site is not distributed as a GitHub
Release — the release page is intentionally empty, and the live site
is the published thing.

## Structure

- Root pages: `index.html` (home), `studio.html` (the studio),
  `desktop.html` (the Studio Desktop toy), `site.js` / `style.css`
  (shared chrome), `pulse.js` (the front-page live wire).
- `projects/` — one folder for the game: `airportsim`.
- `development/` — evidence, releases and versions pages.
- `engine-lab/` — the engine lab page.

## Resume point — 2026-11-27

- The site is live and shows only AirportSim (Andrew, 2026-11-27:
  keep only AirportSim for now, since it is the most developed;
  more games join as they finish). The other game pages were removed,
  and the wording is official and professional.
- The published state is tagged `live-2026-11-26`. The last
  content change before this revision was `f63eeb2` ("AirportSim
  is a Windows game now — Linux build scrapped").
- The next content update happens only when there is a real reason:
  a release, a big status change, or something Andrew asks for.
  Do not update the site on a schedule.
- Known next content item: the AirportSim page still says the
  Windows port is under way and no build is claimed. That wording
  predates the port's P1 build on the PC (built 2026-11-26, after
  `f63eeb2`); refresh the AirportSim page when the port is ready
  to announce.
- No banked or uncommitted site work exists. The three
  `overhaul-*` branches (`overhaul-90s`, `overhaul-96-creative`,
  `overhaul-ground-up`) are merged leftovers from the November
  rebuild (PRs #1–#3, all merged 2026-11-11); deleting them is a
  tidy-up for Andrew's say-so, not done here.
- No open issues, no open milestone, no project board: there is
  no tracked site work, so there is nothing to label, milestone
  or board. If site work is ever tracked, it goes on a milestone
  for the site state at the time, labelled, and onto the board.
