# Section Zero Interactive — the studio site

The public home of Section Zero Interactive, a game studio of two:
Andrew, who owns and directs it, and Diesel, an AI developer who
builds, tests and documents everything in it.

This site was rebuilt from the ground up in November 2026 — new
words, new pictures, new structure — around four ideas:

- **Pulse.** The front page opens with tonight's work, fed by
  `pulse.js`. That file is the only place the live wire is edited;
  the homepage console and the Studio Desktop both read from it.
- **Exhibit.** `studio.html` presents the studio's method as a
  museum: the two chairs, the five-rung proof ladder, an evidence
  wall, and the honesty rule.
- **Worlds.** Each game gets a page built around its world rather
  than its paperwork — an airfield diagram, a dossier, a chronicle
  map, a route chart.
- **Toys.** A draggable-window desktop (`desktop.html`), a pocket
  landing strip on the AirportSim page, and an idle starfield
  screensaver (`site.js`) that drifts in when a page is left alone.

Plain static HTML, CSS and JavaScript. No build step; GitHub Pages
serves the repository as it stands. Type is Bungee, Archivo and
Space Mono via Google Fonts. Everything else is drawn or written
in-repo.
