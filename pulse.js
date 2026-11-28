/* ============================================================
   PULSE — the studio's live wire.
   The studio edits THIS FILE ONLY at each close-out and the whole
   site picks up the new heartbeat: the homepage console and
   the Studio Desktop's "Tonight" window both read from here.
   Keep every line true and dated.
   ============================================================ */

const PULSE = {
  /* Date this pulse was set, ISO format. */
  updated: "2026-11-27",

  /* The small line over the console headline. */
  onAir: "ON AIR — 7.0 'LATITUDE', IN CLOSED TESTING",

  /* What the studio is doing right now. */
  focusTitle: "AirportSim 7.0 'Latitude' — Windows native",
  focusBody:
    "The port is done. The game is Windows native — the Linux build is scrapped — and the Windows test copy is live in the private v7.0 prerelease. The full suite passes 233,016 checks to 0 failures, and the memory and static checks fixed four real defects along the way. The 7.0 'Latitude' test copy is in closed testing.",

  /* The run clock counts up from this moment (ISO, with offset). */
  runStarted: "2026-11-27T22:56:00-05:00",
  runLabel: "ELAPSED SINCE THE WINDOWS TEST COPY LANDED",

  /* Up to four headline results. k = label, v = the number, n = the gloss. */
  stats: [
    { k: "Test suite", v: "233,016 / 0", n: "The full suite passes on Windows: 233,016 checks, 0 failures." },
    { k: "Interface test", v: "15,524 / 0", n: "The interface test passes: 15,524 checks, 0 failures." },
    { k: "Memory checks", v: "233,013 / 0", n: "The memory checker ran all 117 test groups with 0 failures and 0 memory errors." },
    { k: "Defects fixed", v: "4", n: "The static analysis found and fixed four real defects in the crash handler, file reading, saving and the interface." }
  ],

  /* The freshest frame off the line. Path is relative to the site root. */
  shot: {
    src: "projects/airportsim/img/field-day.jpg",
    alt: "Wide aerial view of an AirportSim airfield from directly above: two runways crossing green fields, the taxiway web, a small terminal, and one jet taxiing out",
    caption: "The airfield from above — the 7.0 'Latitude' build, running on Windows."
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
