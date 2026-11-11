/* Section Zero Interactive — '96 chrome (2026-11-11).
   Injects the era furniture the stylesheet dresses: a scrolling
   marquee under the header, blinking NEW! badges on the freshest
   homepage project headings, a visitor counter and badge strip at
   the foot of every page, and — the owner's own idea — a gentle
   rain of each game's own motifs falling behind its panels.
   Decorative only: every factual string here is copied from the
   site's own text. No audio, nothing external, and the rain is
   skipped entirely for reduced-motion visitors. */
(function () {
  "use strict";
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- marquee ---------- */
  var nav = document.querySelector("nav.top");
  if (nav) {
    var mq = document.createElement("div");
    mq.className = "sz-marquee";
    mq.setAttribute("aria-hidden", "true");
    mq.innerHTML = '<span class="sz-track">'
      + "✶ <b>WELCOME TO OUR CORNER OF THE WEB!</b> ✶ SECTION ZERO INTERACTIVE — AN AI DEVELOPMENT STUDIO ✶ "
      + "<i>FOUR GAMES, BUILT IN THE OPEN, PROVEN WITH EVIDENCE</i> ✶ "
      + "BLACKSITE 1.5.0 — HELD ✶ AIRPORTSIM 0.6.0-alpha.2 — IN ACTIVE DEVELOPMENT ✶ "
      + "WORLDFORGE — SHELVED ✶ LONGSHOT — DEFERRED ✶ THANKS FOR STOPPING BY — MIND THE RAIN ✶ "
      + "</span>";
    nav.parentNode.insertBefore(mq, nav.nextSibling);
  }

  /* ---------- NEW! badges (homepage's freshest projects) ---------- */
  ["article.band.as h3", "article.band.ls h3"].forEach(function (sel) {
    var h = document.querySelector(sel);
    if (h) {
      var b = document.createElement("span");
      b.className = "sz-new";
      b.textContent = "NEW!";
      h.appendChild(b);
    }
  });

  /* ---------- visitor counter + badges ---------- */
  var main = document.querySelector("main");
  if (main) {
    var days = Math.max(0, Math.floor((Date.now() - new Date("2026-01-01T00:00:00").getTime()) / 86400000));
    var num = String(31337 + days * 17).padStart(6, "0");
    var counter = document.createElement("div");
    counter.className = "sz-counter";
    counter.setAttribute("aria-hidden", "true");
    var html = '<span class="sz-label">You are visitor</span>';
    for (var i = 0; i < num.length; i++) html += '<span class="sz-digit">' + num[i] + "</span>";
    counter.innerHTML = html;
    var badges = document.createElement("div");
    badges.className = "sz-badges";
    badges.setAttribute("aria-hidden", "true");
    badges.innerHTML =
        '<span class="sz-badge cool">BEST VIEWED AT 800×600</span>'
      + '<span class="sz-badge">MADE WITH NOTEPAD</span>'
      + '<span class="sz-badge hot">Y2K COMPLIANT</span>'
      + '<span class="sz-badge">HAND-CODED HTML</span>'
      + '<span class="sz-badge cool">NO POP-UPS · NO COOKIES · JUST GAMES</span>';
    var footer = main.querySelector("footer");
    if (footer) {
      main.insertBefore(counter, footer);
      main.insertBefore(badges, footer);
    } else {
      main.appendChild(counter);
      main.appendChild(badges);
    }
  }

  /* ---------- motif rain ---------- */
  if (reduced) return;

  function svg(inner) {
    return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + "</svg>";
  }
  var MOTIFS = {
    as: [ /* AirportSim — sky blue & runway yellow */
      svg('<path d="M11 1h2v5l7 5v3l-7-2v5l2 2v2h-6v-2l2-2v-5l-7 2v-3l7-5z" fill="#bfe9ff"/><circle cx="12" cy="9" r="1.1" fill="#00e5ff"/>'),
      svg('<rect x="3" y="2" width="18" height="20" fill="#2b2b3d"/><rect x="4" y="3" width="1.6" height="18" fill="#ffffff"/><rect x="18.4" y="3" width="1.6" height="18" fill="#ffffff"/><rect x="11" y="3" width="2" height="4" fill="#ffe600"/><rect x="11" y="10" width="2" height="4" fill="#ffe600"/><rect x="11" y="17" width="2" height="4" fill="#ffe600"/>'),
      svg('<rect x="1" y="9" width="13" height="6" fill="#d8d8f5"/><rect x="4" y="10.5" width="2" height="3" fill="#23237a"/><rect x="8" y="10.5" width="2" height="3" fill="#23237a"/><rect x="14" y="7" width="8" height="10" fill="#b9b9e6"/><rect x="16" y="9.5" width="3" height="4" fill="#23237a"/><rect x="17" y="17" width="2" height="4" fill="#8f8ff0"/>')
    ],
    bs: [ /* Blacksite — phosphor rust */
      svg('<circle cx="12" cy="12" r="7" fill="none" stroke="#ff9a3c" stroke-width="2.4"/><path d="M12 1v6M12 17v6M1 12h6M17 12h6" stroke="#ff9a3c" stroke-width="2.4"/><circle cx="12" cy="12" r="1.6" fill="#ff6b5e"/>'),
      svg('<path d="M10 2h4v4l1.5 3v11a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 8.5 20V9L10 6z" fill="#ffb340"/><rect x="8.5" y="17" width="7" height="2.4" fill="#c77414"/>'),
      svg('<rect x="3" y="3" width="18" height="18" fill="#3a3a55"/><rect x="7" y="3" width="10" height="7" fill="#d8d8f5"/><rect x="9" y="4.5" width="5" height="4" fill="#ff9a3c"/><rect x="6" y="13" width="12" height="8" fill="#ece7db"/>')
    ],
    wf: [ /* WorldForge — archival moss */
      svg('<path d="M12 2l5 7h-3l4 6H6l4-6H7z" fill="#57c84a"/><rect x="10.8" y="15" width="2.4" height="6" fill="#8a5a2b"/>'),
      svg('<path d="M12 0.5h5l-2 2.2 2 2.2h-5z" fill="#9dff57"/><rect x="11.4" y="0.5" width="1.2" height="5" fill="#8f8f78"/><rect x="7" y="9" width="10" height="12" fill="#b9b9a0"/><path d="M7 9V5h3v2h4V5h3v4z" fill="#8f8f78"/><rect x="10.6" y="14" width="2.8" height="7" fill="#3d3d2a"/><rect x="11" y="10.4" width="2" height="2.8" fill="#ffe600"/>'),
      svg('<path d="M5 4h13a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5z" fill="#c9b458"/><path d="M5 4v16" stroke="#7a5c00" stroke-width="2"/><path d="M8.5 8h8M8.5 11.5h8M8.5 15h5.5" stroke="#5e4a08" stroke-width="1.4"/>')
    ],
    ls: [ /* LONGSHOT — deep-space lavender */
      svg('<path d="M12 1c3 2.6 4.5 6.4 4.5 10.5l-2 3h-5l-2-3C7.5 7.4 9 3.6 12 1z" fill="#e8e8ff"/><circle cx="12" cy="8" r="2" fill="#7a3cff"/><path d="M7.5 12.5L4 18l3.5-1zM16.5 12.5L20 18l-3.5-1z" fill="#c07dff"/><path d="M10.5 17h3l-1.5 5z" fill="#ffb340"/>'),
      svg('<circle cx="12" cy="11" r="6.5" fill="#8f6fe8"/><ellipse cx="12" cy="13" rx="11" ry="3" fill="none" stroke="#c07dff" stroke-width="1.8" transform="rotate(-14 12 13)"/><circle cx="9.5" cy="8.5" r="1.4" fill="#c9b8ff"/>'),
      svg('<path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" fill="#e6ccff"/>')
    ]
  };

  /* A small seeded RNG, so the rain is composed, not chaotic —
     the same arrangement on every visit, per game. */
  function rng(seed) {
    var t = seed >>> 0;
    return function () {
      t += 0x6D2B79F5;
      var r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function gameOf(el) {
    if (el.classList.contains("bs")) return "bs";
    if (el.classList.contains("as")) return "as";
    if (el.classList.contains("wf")) return "wf";
    if (el.classList.contains("ls")) return "ls";
    var p = window.location.pathname;
    if (p.indexOf("/blacksite/") !== -1) return "bs";
    if (p.indexOf("/airportsim/") !== -1) return "as";
    if (p.indexOf("/worldforge/") !== -1) return "wf";
    if (p.indexOf("/longshot/") !== -1) return "ls";
    return null;
  }

  var layers = [];
  function rainOn(el, game) {
    var layer = document.createElement("div");
    layer.className = "sz-rain";
    layer.setAttribute("aria-hidden", "true");
    var rand = rng(game.charCodeAt(0) * 131 + game.charCodeAt(1) * 17 + el.offsetTop);
    var motifs = MOTIFS[game];
    var COUNT = 12;
    for (var i = 0; i < COUNT; i++) {
      var size = 18 + Math.floor(rand() * 22);            /* 18–40 px */
      var drop = document.createElement("span");
      drop.className = "sz-drop";
      drop.style.left = (1 + rand() * 95).toFixed(1) + "%";
      drop.style.top = (-size - 6) + "px";
      drop.style.opacity = (0.34 + rand() * 0.24).toFixed(2);
      drop.style.animationDuration = (8 + rand() * 10).toFixed(1) + "s";
      drop.style.animationDelay = (-rand() * 26).toFixed(1) + "s";
      var inner = document.createElement("span");
      inner.className = "sz-drop-in";
      inner.style.width = size + "px";
      inner.style.height = size + "px";
      inner.style.animationDuration = (2.4 + rand() * 2.1).toFixed(1) + "s";
      inner.innerHTML = motifs[i % motifs.length];
      var svgEl = inner.querySelector("svg");
      if (svgEl) { svgEl.setAttribute("width", size); svgEl.setAttribute("height", size); }
      drop.appendChild(inner);
      layer.appendChild(drop);
    }
    el.insertBefore(layer, el.firstChild);
    layers.push({ el: el, layer: layer });
    layer.style.setProperty("--fall", (el.offsetHeight + size + 140) + "px");
  }

  function refreshFall() {
    layers.forEach(function (r) {
      r.layer.style.setProperty("--fall", (r.el.offsetHeight + 180) + "px");
    });
  }

  var targets = document.querySelectorAll("article.band, .projhero");
  targets.forEach(function (el) {
    var g = gameOf(el);
    if (g) rainOn(el, g);
  });
  refreshFall();
  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(refreshFall, 200);
  });
})();
