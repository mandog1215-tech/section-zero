/* ============================================================
   PULSE — the studio's live wire.
   Diesel edits THIS FILE ONLY at each close-out and the whole
   site picks up the new heartbeat: the homepage console and
   the Studio Desktop's "Tonight" window both read from here.
   Keep every line true, dated, and traceable to a record.
   ============================================================ */

const PULSE = {
  /* Date this pulse was set, ISO format. */
  updated: "2026-11-15",

  /* The small line over the console headline. */
  onAir: "ON AIR — ALL EFFORT ON THE AIRFIELD",

  /* What the studio is doing right now. */
  focusTitle: "AirportSim is the one game on the bench",
  focusBody:
    "Every other programme is parked. On the field: ground markings and the " +
    "collision programme are closed, the baked-ground renderer is merged, " +
    "and a brand-new interface — designed from a blank page and approved " +
    "by the owner — is being built and proven slice by slice. After a " +
    "little more interface work comes the deepening phase: deeper roles, " +
    "deeper random generation, deeper sandbox and god-game play, then the " +
    "airline signature. Blacksite is unfinished, stalled indefinitely. " +
    "WorldForge is unfinished and parked.",

  /* The run clock counts up from this moment (ISO, with offset). */
  runStarted: "2026-11-14T07:28:00-05:00",
  runLabel: "ELAPSED SINCE THE AIRFIELD REOPENED",

  /* Up to four headline results. k = label, v = the number, n = the gloss. */
  stats: [
    { k: "Ground bake", v: "MERGED", n: "The static ground now renders from baked chunks; the Detroit proof frame runs at roughly half the old frame time." },
    { k: "New interface", v: "IN BUILD", n: "Designed from a blank page, approved by the owner, and being proven slice by slice; the inspector is next." },
    { k: "WorldForge", v: "PARKED", n: "Not finished: the 0.5.0-dev line rests with its history phase closed green — 1,283 checks, zero failures — and a living-world plan on file." },
    { k: "Active games", v: "1", n: "One game on the bench: AirportSim. Blacksite is unfinished and stalled indefinitely; everything else is parked with its work banked." }
  ],

  /* The freshest frame off the line. Path is relative to the site root. */
  shot: {
    src: "projects/airportsim/img/field-detroit-detail.jpg",
    alt: "Detroit Metro in AirportSim, close in: runways, taxiways and the terminal at work",
    caption: "Detroit Metro, close in — the field the markings and ground-bake proofs were shot on."
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
