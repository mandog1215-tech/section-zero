/* ============================================================
   PULSE — the studio's live wire.
   Diesel edits THIS FILE ONLY at each close-out and the whole
   site picks up the new heartbeat: the homepage console and
   the Studio Desktop's "Tonight" window both read from here.
   Keep every line true, dated, and traceable to a record.
   ============================================================ */

const PULSE = {
  /* Date this pulse was set, ISO format. */
  updated: "2026-11-26",

  /* The small line over the console headline. */
  onAir: "ON AIR — 0.6.3 PROVEN, REBUILD PAUSED",

  /* What the studio is doing right now. */
  focusTitle: "WildGenesis 3D rests at 0.6.3, proven",
  focusBody:
    "The rebuild is paused. Two slices are done and proven — the new structure and the bug-catching gate, 48 checks to 0 failures — and the next slice's work is banked, unproven, until the owner calls for it. WildGenesis 3D remains the studio's current game: a 3D god-game evolution sandbox in Unity, a restructure of the game its first builder made — the same game, the same systems, rebuilt cleanly. God powers are free and unlimited. AirportSim's 7.0 'Latitude' test copy sits with the owner, awaiting his verdict. Blacksite is unfinished, shelved for good. WorldForge is unfinished and parked.",

  /* The run clock counts up from this moment (ISO, with offset). */
  runStarted: "2026-11-26T17:52:00-05:00",
  runLabel: "ELAPSED SINCE THE REBUILD BEGAN",

  /* Up to four headline results. k = label, v = the number, n = the gloss. */
  stats: [
    { k: "Rebuild — structure", v: "DONE", n: "All 45 scripts moved into the new layout with no code changed; the dead code is deleted. Proven 48 checks to 0 failures on the same seed." },
    { k: "Bug-catching gate", v: "DONE", n: "Static analysis checks every change against a 215-warning baseline and fails on any new one. Proven in 26 seconds." },
    { k: "Core extraction", v: "PAUSED", n: "The next slice's work is banked, unproven, until the owner calls for it. Nothing lands without proof." },
    { k: "AirportSim", v: "TEST COPY", n: "7.0 'Latitude' sits with the owner, awaiting his verdict. The deepening list is halted." }
  ],

  /* The freshest frame off the line. Path is relative to the site root. */
  shot: {
    src: "projects/wildgenesis/img/world-overview.png",
    alt: "WildGenesis 3D, the living world from above: continents, oceans and creatures on a spherical planet",
    caption: "The living world, from above — the frame the 0.6.3 proofs were shot on."
  }
};

/* ---------- renderer (no need to edit below this line) ---------- */
(function () {
  function el(id) { return document.getElementById(id); }
  var t = el("pulse-title"), b = el("pulse-body"), o = el("pulse-onair"),
      g = el("pulse-stats"), im = el("pulse-shot-img"), cp = el("pulse-shot-cap"),
      dt = el("pulse-date");
  if (t) t.textContent = PULSE.focusTitle;
  if (b) b.textContent = PULSE.focusBody;
  if (o) o.lastChild.textContent = " " + PULSE.onAir;
  if (dt) dt.textContent = PULSE.updated;
  if (g) {
    g.innerHTML = "";
    PULSE.stats.forEach(function (s) {
      var d = document.createElement("div"); d.className = "stat";
      var k = document.createElement("div"); k.className = "k"; k.textContent = s.k;
      var v = document.createElement("div"); v.className = "v"; v.textContent = s.v;
      var n = document.createElement("div"); n.className = "n"; n.textContent = s.n;
      d.appendChild(k); d.appendChild(v); d.appendChild(n); g.appendChild(d);
    });
  }
  if (im) { im.src = PULSE.shot.src; im.alt = PULSE.shot.alt; }
  if (cp) cp.textContent = PULSE.shot.caption;

  var clock = el("pulse-clock"), label = el("pulse-clock-label");
  if (label) label.textContent = PULSE.runLabel;
  if (clock) {
    var start = new Date(PULSE.runStarted).getTime();
    function tick() {
      var ms = Date.now() - start;
      if (isNaN(ms) || ms < 0) { clock.textContent = "—"; return; }
      var s = Math.floor(ms / 1000),
          h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
      function p(x) { return (x < 10 ? "0" : "") + x; }
      clock.textContent = h + ":" + p(m) + ":" + p(sec);
    }
    tick(); setInterval(tick, 1000);
  }

  /* The Studio Desktop's Tonight window, if present on this page. */
  var dw = el("desk-tonight");
  if (dw) {
    dw.innerHTML = "";
    var h = document.createElement("p");
    var strong = document.createElement("strong"); strong.textContent = PULSE.focusTitle;
    h.appendChild(strong); dw.appendChild(h);
    PULSE.stats.forEach(function (s) {
      var p = document.createElement("p");
      p.textContent = s.k + ": " + s.v + " — " + s.n;
      dw.appendChild(p);
    });
  }
})();
