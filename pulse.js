/* ============================================================
   PULSE — the studio's live wire.
   Diesel edits THIS FILE ONLY at each close-out and the whole
   site picks up the new heartbeat: the homepage console and
   the Studio Desktop's "Tonight" window both read from here.
   Keep every line true, dated, and traceable to a record.
   ============================================================ */

const PULSE = {
  /* Date this pulse was set, ISO format. */
  updated: "2026-11-11",

  /* The small line over the console headline. */
  onAir: "ON AIR — THE LONG NIGHT SHIFT",

  /* What the studio is doing right now. */
  focusTitle: "An airport game is being carried across the line into a game",
  focusBody:
    "AirportSim spent a long while as a workshop full of clever systems that were " +
    "hard to actually play. Tonight it is being rebuilt, piece by proven piece, " +
    "into something a person can sit down with: clearer clicks, honest signs, " +
    "cargo that finally shows up, and airlines that remember how you treated " +
    "them. Underneath the paint, its engine is being swapped from SDL2 to SDL3 " +
    "so it stands on the same foundation as LONGSHOT.",

  /* The run clock counts up from this moment (ISO, with offset). */
  runStarted: "2026-11-11T01:09:00-05:00",
  runLabel: "ELAPSED ON THE TRANSFORMATION RUN",

  /* Up to four headline results. k = label, v = the number, n = the gloss. */
  stats: [
    { k: "Stands repaired", v: "2,252", n: "Parking spots shifted across 26 airport layouts so no aircraft nose rests against a terminal wall." },
    { k: "Airport catalogue", v: "253", n: "Real-world layouts in the pack, with 58 aircraft types on the flight roster." },
    { k: "Engine swap", v: "SDL3", n: "AirportSim is moving off SDL2 tonight to share LONGSHOT's newer foundation." },
    { k: "Proof standard", v: "4 lanes", n: "Every change runs the full public test battery and gets photographed before it counts." }
  ],

  /* The freshest frame off the line. Path is relative to the site root. */
  shot: {
    src: "projects/airportsim/img/field-day.jpg",
    alt: "Wide aerial view of an AirportSim airfield from directly above: two runways crossing green fields, the taxiway web, a small terminal, and one jet taxiing out",
    caption: "Fresh off the proof camera: the whole field from above — runways crossing in the green, taxiways picked out in yellow, and one jet taxiing out."
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
