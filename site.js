/* ============================================================
   SECTION ZERO — shared behaviour for the ground-up site.
   Two jobs live here: the starfield screensaver, reachable
   from the button in every header and drifting in on its own
   when a page sits idle; and the motif rain (second IIFE).
   ============================================================ */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var saver = document.createElement("div");
  saver.id = "saver";
  saver.setAttribute("role", "dialog");
  saver.setAttribute("aria-label", "Starfield screensaver. Press any key or click to return.");
  var cv = document.createElement("canvas");
  var hint = document.createElement("div");
  hint.className = "hint";
  hint.textContent = "SECTION ZERO AFTER DARK — ANY KEY OR CLICK TO WAKE";
  saver.appendChild(cv);
  saver.appendChild(hint);
  document.body.appendChild(saver);

  var ctx = cv.getContext("2d"), stars = [], raf = null, W = 0, H = 0, meteor = null;

  function build() {
    W = cv.width = saver.clientWidth; H = cv.height = saver.clientHeight;
    stars = [];
    var n = Math.min(340, Math.floor(W * H / 6500));
    for (var i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.6 + 0.4,
        tw: Math.random() * Math.PI * 2,
        sp: 0.008 + Math.random() * 0.03,
        hue: [45, 205, 0, 330][Math.floor(Math.random() * 4)]
      });
    }
  }
  function drawStatic() {
    ctx.fillStyle = "#05070F"; ctx.fillRect(0, 0, W, H);
    stars.forEach(function (s) {
      ctx.beginPath();
      ctx.fillStyle = s.hue ? "hsla(" + s.hue + ",90%,78%,.9)" : "rgba(255,255,255,.9)";
      ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill();
    });
  }
  function frame() {
    ctx.fillStyle = "rgba(5,7,15,.55)"; ctx.fillRect(0, 0, W, H);
    stars.forEach(function (s) {
      s.tw += s.sp;
      var a = 0.45 + 0.55 * Math.abs(Math.sin(s.tw));
      ctx.beginPath();
      ctx.fillStyle = s.hue ? "hsla(" + s.hue + ",90%,80%," + a + ")" : "rgba(255,255,255," + a + ")";
      ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill();
    });
    if (!meteor && Math.random() < 0.004) {
      meteor = { x: Math.random() * W * 0.7 + W * 0.2, y: Math.random() * H * 0.3, vx: -7, vy: 4, life: 1 };
    }
    if (meteor) {
      var grad = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x + 90, meteor.y - 60);
      grad.addColorStop(0, "rgba(255,255,255,.95)"); grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = grad; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(meteor.x, meteor.y); ctx.lineTo(meteor.x + 90, meteor.y - 60); ctx.stroke();
      meteor.x += meteor.vx; meteor.y += meteor.vy; meteor.life -= 0.02;
      if (meteor.life <= 0 || meteor.x < -120) meteor = null;
    }
    raf = requestAnimationFrame(frame);
  }
  function start() {
    if (saver.classList.contains("on")) return;
    saver.classList.add("on");
    build();
    if (reduced) { drawStatic(); } else { frame(); }
  }
  function stop() {
    saver.classList.remove("on");
    if (raf) cancelAnimationFrame(raf);
    raf = null; meteor = null;
    poke();
  }
  document.querySelectorAll(".saver-btn").forEach(function (b) {
    b.addEventListener("click", start);
  });
  saver.addEventListener("pointerdown", stop);
  window.addEventListener("keydown", function () { if (saver.classList.contains("on")) stop(); });
  window.addEventListener("resize", function () { if (saver.classList.contains("on")) build(); });

  /* Idle drift-in after two and a half quiet minutes (never under reduced motion). */
  var idleTimer = null;
  function poke() {
    if (reduced) return;
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(start, 150000);
  }
  ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"].forEach(function (ev) {
    window.addEventListener(ev, poke, { passive: true });
  });
  poke();

  /* Footer year, where a slot exists. */
  var y = document.getElementById("foot-year");
  if (y) y.textContent = new Date().getFullYear();
})();

/* ============================================================
   MOTIF RAIN — the owner's idea, restored and turned up:
   little glyphs from each game's world drift down the page
   in two depths, behind the content. The set is chosen by
   the page's <body data-rain="..."> attribute. Never runs
   under prefers-reduced-motion; pauses in a hidden tab.
   ============================================================ */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var SETS = {
    forge:    { g: ["♜", "★", "▲", "✦"], c: ["#B07D2B", "#7A5A21", "#2FA84F", "#EE3A24"] },
    airfield: { g: ["✈", "★", "●", "◆"], c: ["#2456E6", "#EE3A24", "#E8A90C", "#0E9594"] },
    vault:    { g: ["◎", "★", "♦", "✚"], c: ["#EE3A24", "#1D2440", "#FF7BAC", "#3A4266"] },
    voyage:   { g: ["★", "●", "◆", "▲"], c: ["#6C4BD8", "#5B83F0", "#E8A90C", "#EE3A24"] },
    mix:      { g: ["★", "♜", "✈", "●", "▲", "◆"], c: ["#E8A90C", "#EE3A24", "#2456E6", "#0E9594", "#B07D2B", "#6C4BD8"] }
  };
  var set = SETS[document.body.getAttribute("data-rain")] || SETS.mix;
  var cv = document.createElement("canvas");
  cv.id = "rain";
  cv.setAttribute("aria-hidden", "true");
  document.body.appendChild(cv);
  var ctx = cv.getContext("2d");
  var W = 0, H = 0, pieces = [], raf = null, t = 0;

  function make(near, first) {
    return {
      x: Math.random() * W,
      y: first ? Math.random() * H : -40 - Math.random() * 80,
      s: near ? 20 + Math.random() * 12 : 11 + Math.random() * 6,
      v: near ? 34 + Math.random() * 26 : 15 + Math.random() * 13,
      a: near ? 0.5 : 0.32,
      ph: Math.random() * Math.PI * 2,
      sw: 6 + Math.random() * 10,
      rot: (Math.random() - 0.5) * 0.6,
      rs: (Math.random() - 0.5) * 0.35,
      g: set.g[Math.floor(Math.random() * set.g.length)],
      c: set.c[Math.floor(Math.random() * set.c.length)]
    };
  }
  function build(first) {
    W = cv.width = Math.floor(window.innerWidth);
    H = cv.height = Math.floor(window.innerHeight);
    pieces = [];
    var i;
    for (i = 0; i < 16; i++) pieces.push(make(false, first));
    for (i = 0; i < 10; i++) pieces.push(make(true, first));
  }
  function frame() {
    t += 1 / 60;
    ctx.clearRect(0, 0, W, H);
    pieces.forEach(function (p, i) {
      p.y += p.v / 60;
      p.rot += p.rs / 60;
      if (p.y > H + 46) pieces[i] = make(p.s > 17, false);
      var x = p.x + Math.sin(t * 0.9 + p.ph) * p.sw;
      ctx.save();
      ctx.translate(x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.c;
      ctx.font = p.s + 'px "Segoe UI Symbol","Noto Sans Symbols 2","Apple Symbols",sans-serif';
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(p.g, 0, 0);
      ctx.restore();
    });
    raf = requestAnimationFrame(frame);
  }
  build(true);
  frame();
  window.addEventListener("resize", function () { build(true); });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; }
    else if (!raf) frame();
  });
})();
