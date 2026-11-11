/* ============================================================
   SECTION ZERO — shared behaviour for the ground-up site.
   One job lives here: the starfield screensaver, reachable
   from the button in every header and footer, and drifting
   in on its own when a page sits idle. Any key or click
   brings the lights back up.
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
