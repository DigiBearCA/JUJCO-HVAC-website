/* JUJCO intro
   Home: blower winds up, then eases to the original logo pose (0°).
   Other pages: one intact logo + a random page transition. Never both. */
(function () {
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  if (window.__jujcoIntro) return;
  window.__jujcoIntro = true;

  var html = document.documentElement;
  var preloader = document.querySelector(".cs_preloader");
  var done = false;
  var leaving = false;
  var timers = [];
  var blowers = [];
  var fromNav = false;
  var storedMotion = "";

  try {
    fromNav = sessionStorage.getItem("jujcoNav") === "1";
    storedMotion = sessionStorage.getItem("jujcoMotion") || "";
    sessionStorage.removeItem("jujcoNav");
    sessionStorage.removeItem("jujcoMotion");
  } catch (err) {}

  function later(fn, ms) {
    timers.push(window.setTimeout(fn, ms));
  }

  function unlock() {
    html.classList.remove("cs_intro_lock");
    if (document.body) document.body.classList.remove("cs_intro_lock");
  }

  function lockScroll() {
    html.classList.add("cs_intro_lock");
    if (document.body) document.body.classList.add("cs_intro_lock");
  }

  if (preloader) lockScroll();

  function themeKey() {
    var body = document.body;
    if (!body || !body.className) return "hybrid";
    var m = body.className.match(/jtheme--([a-z]+)/);
    return m ? m[1] : "hybrid";
  }

  var KICKERS = {
    heat: "Heating",
    cool: "Cooling",
    hybrid: "Heat + Cool",
    air: "Air quality",
    urgent: "Emergency",
    gold: "JUJCO",
    about: "The shop",
    contact: "Book an Appointment",
    slate: "The work",
  };

  var MOTIONS = [
    "split",
    "wipe",
    "rise",
    "drop",
    "iris",
    "slash",
    "push",
    "diamond",
    "columns",
    "rows",
    "fold",
    "zoom",
    "sweep",
    "burst",
    "corner",
    "shutter",
  ];

  function recentMotions() {
    try {
      return JSON.parse(sessionStorage.getItem("jujcoRecent") || "[]");
    } catch (e) {
      return [];
    }
  }

  function rememberMotion(name) {
    var rec = recentMotions().filter(function (m) {
      return m !== name;
    });
    rec.unshift(name);
    if (rec.length > 4) rec = rec.slice(0, 4);
    try {
      sessionStorage.setItem("jujcoRecent", JSON.stringify(rec));
    } catch (e) {}
  }

  function pickMotion(prefer) {
    if (prefer && MOTIONS.indexOf(prefer) !== -1) return prefer;
    var avoid = recentMotions();
    var pool = MOTIONS.filter(function (m) {
      return avoid.indexOf(m) === -1;
    });
    if (!pool.length) pool = MOTIONS.slice();
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function pageTitle() {
    var el = document.querySelector(
      ".jdetail-hero h1, .jpage-hero h1, .cs_page_heading h1",
    );
    if (el) {
      var t = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (t) return t;
    }
    return (
      (document.title || "")
        .replace(/\s*\|\s*JUJCO.*$/i, "")
        .replace(/\s*[-–—]\s*Heating.*$/i, "")
        .replace(/\s*[-–—]\s*JUJCO.*$/i, "")
        .trim() || "Heating & Cooling"
    );
  }

  function pieClip(i, n) {
    var a0 = (i / n) * 360 - 90;
    var a1 = ((i + 1) / n) * 360 - 90;
    function pt(a) {
      var r = (a * Math.PI) / 180;
      return (
        (50 + Math.cos(r) * 80).toFixed(2) +
        "% " +
        (50 + Math.sin(r) * 80).toFixed(2) +
        "%"
      );
    }
    return "polygon(50% 50%, " + pt(a0) + ", " + pt(a1) + ")";
  }

  function buildMotion(stage, motion) {
    if (!stage) return;
    stage.setAttribute("data-jtrans", motion);
    stage.setAttribute("data-theme", themeKey());
    stage.classList.remove("has-slats");

    var extra = stage.querySelector(".jtrans__extra");
    if (extra) extra.parentNode.removeChild(extra);

    var n = 0;
    var kind = "";
    if (motion === "columns") {
      n = 6;
      kind = "cols";
    }
    if (motion === "rows") {
      n = 5;
      kind = "rows";
    }
    if (motion === "shutter") {
      n = 8;
      kind = "shutter";
    }
    if (motion === "burst") {
      n = 8;
      kind = "burst";
    }

    if (!n) return;

    extra = document.createElement("div");
    extra.className = "jtrans__extra jtrans__extra--" + kind;
    var mid = (n - 1) / 2;
    for (var i = 0; i < n; i++) {
      var s = document.createElement("span");
      s.style.setProperty("--i", String(i));
      s.style.setProperty("--n", String(n));
      s.style.setProperty("--d", String(Math.abs(i - mid)));
      if (kind === "burst") {
        var ang = ((i + 0.5) / n) * Math.PI * 2 - Math.PI / 2;
        s.style.setProperty("--dx", Math.cos(ang).toFixed(3));
        s.style.setProperty("--dy", Math.sin(ang).toFixed(3));
        s.style.clipPath = pieClip(i, n);
      }
      extra.appendChild(s);
    }
    var mark = stage.querySelector(".jtrans__mark");
    stage.insertBefore(extra, mark || stage.firstChild);
    stage.classList.add("has-slats");
  }

  function setupStage(root, motion) {
    var stage = root.querySelector(".jtrans");
    if (!stage) return motion;
    buildMotion(stage, motion);
    var kicker = stage.querySelector(".jtrans__kicker");
    var title = stage.querySelector(".jtrans__title");
    if (kicker) kicker.textContent = KICKERS[themeKey()] || "JUJCO";
    if (title) title.textContent = pageTitle();
    return motion;
  }

  /* Blower that always finishes on the original logo pose (0°). */
  function startBlower(el, opts) {
    if (!el) return null;
    opts = opts || {};
    var angle = 0;
    var vel = 0.04;
    var maxVel = opts.maxVel || 2.35;
    var windMs = opts.windMs || 2100;
    var homeMs = opts.homeMs || 780;
    var start = performance.now();
    var last = start;
    var locked = false;
    var homing = false;
    var homeFrom = 0;
    var homeTo = 0;
    var homeStart = 0;
    var raf = 0;

    function paint(a) {
      el.style.transform = "rotate(" + a + "deg)";
    }

    function snapHome() {
      angle = 0;
      vel = 0;
      paint(0);
    }

    function targetHome(a) {
      var rem = ((a % 360) + 360) % 360;
      if (rem < 0.8) return a - rem;
      var extra = 360 - rem;
      if (extra < 120) extra += 360;
      return a + extra;
    }

    function frame(now) {
      var dt = Math.min(now - last, 34);
      last = now;

      if (homing) {
        var t = Math.min((now - homeStart) / homeMs, 1);
        var e = 1 - Math.pow(1 - t, 5);
        angle = homeFrom + (homeTo - homeFrom) * e;
        paint(angle);
        if (t < 1) {
          raf = window.requestAnimationFrame(frame);
        } else {
          snapHome();
        }
        return;
      }

      if (!locked) {
        var p = Math.min((now - start) / windMs, 1);
        vel = 0.05 + p * p * p * maxVel;
        angle += vel * dt;
        paint(angle);
        raf = window.requestAnimationFrame(frame);
        return;
      }

      snapHome();
    }

    paint(0);
    raf = window.requestAnimationFrame(frame);

    var api = {
      lock: function () {
        if (homing || locked) return;
        locked = true;
        homing = true;
        homeFrom = angle;
        homeTo = targetHome(angle);
        homeStart = performance.now();
        if (!raf) raf = window.requestAnimationFrame(frame);
      },
      stop: function () {
        locked = true;
        homing = false;
        vel = 0;
        if (raf) window.cancelAnimationFrame(raf);
        raf = 0;
        snapHome();
      },
    };
    blowers.push(api);
    return api;
  }

  function finish() {
    if (done) return;
    done = true;
    timers.forEach(function (id) {
      window.clearTimeout(id);
    });
    blowers.forEach(function (b) {
      try {
        b.stop();
      } catch (e) {}
    });
    if (!preloader) {
      unlock();
      return;
    }
    preloader.classList.add("is-out");
    window.setTimeout(function () {
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      unlock();
      try {
        document.dispatchEvent(new Event("jujco:intro-done"));
      } catch (err) {}
    }, 420);
  }

  function bindDismiss(el) {
    if (!el) return;
    el.addEventListener("click", finish);
    el.addEventListener("touchstart", finish, { passive: true });
    var skip = el.querySelector(".jujco-cine__skip");
    if (skip) {
      skip.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        finish();
      });
    }
  }

  function runCinematic() {
    var rotor =
      preloader.querySelector(".jujco-cine__rotor") ||
      preloader.querySelector(".jujco-cine__fan");

    if (fromNav) {
      if (rotor) rotor.style.transform = "rotate(0deg)";
      preloader.classList.add("is-title");
      later(finish, 640);
      return;
    }

    startBlower(rotor, { windMs: 2100, maxVel: 2.5, homeMs: 820 });
    later(function () {
      preloader.classList.add("is-rev");
    }, 900);
    later(function () {
      preloader.classList.add("is-title");
      blowers.forEach(function (b) {
        b.lock();
      });
    }, 2400);
    later(finish, 5300);
  }

  function runMorph() {
    var motion = pickMotion(fromNav ? storedMotion : "");
    rememberMotion(motion);
    setupStage(preloader, motion);
    var hold = fromNav ? 160 : 480;
    var openAt = fromNav ? 220 : 720;
    var outAt = fromNav ? 980 : 1480;
    later(function () {
      preloader.classList.add("is-hold");
    }, hold);
    later(function () {
      preloader.classList.add("is-open");
    }, openAt);
    later(finish, outAt);
  }

  if (preloader) {
    bindDismiss(preloader);
    if (preloader.classList.contains("cs_preloader--cinematic")) {
      runCinematic();
    } else {
      runMorph();
    }
    later(finish, 6200);
  }

  function isInternal(anchor) {
    if (
      !anchor ||
      anchor.target === "_blank" ||
      anchor.hasAttribute("download")
    )
      return false;
    if (anchor.classList.contains("cs_video_open")) return false;
    if (anchor.hasAttribute("data-jpop")) return false;
    if (anchor.closest(".cs_video_popup, .jujco-bento-overlay")) return false;
    var href = anchor.getAttribute("href");
    if (
      !href ||
      href.charAt(0) === "#" ||
      /^(mailto:|tel:|javascript:)/i.test(href)
    )
      return false;
    var url;
    try {
      url = new URL(href, window.location.href);
    } catch (e) {
      return false;
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    if (url.origin !== window.location.origin) return false;
    var here = window.location.pathname.replace(/\/+$/, "") || "/";
    var there = url.pathname.replace(/\/+$/, "") || "/";
    if (there === here && url.search === window.location.search) return false;
    return url.href;
  }

  function stageHtml(motion) {
    return (
      '<div class="jtrans jtrans--exit" data-jtrans="' +
      motion +
      '" data-theme="' +
      themeKey() +
      '">' +
      '<span class="jtrans__panel jtrans__panel--a"></span>' +
      '<span class="jtrans__panel jtrans__panel--b"></span>' +
      '<span class="jtrans__seam"></span>' +
      '<div class="jtrans__mark">' +
      '<img class="jtrans__whole" src="assets/img/logo-mark.webp?v=mark2" alt="">' +
      "</div>" +
      "</div>"
    );
  }

  function playExit(href) {
    if (leaving) return;
    leaving = true;
    var motion = pickMotion();
    rememberMotion(motion);
    try {
      sessionStorage.setItem("jujcoNav", "1");
      sessionStorage.setItem("jujcoMotion", motion);
    } catch (e) {}

    if (!done && preloader) {
      window.location.href = href;
      return;
    }

    var ov = document.createElement("div");
    ov.className = "jtrans-exit";
    ov.setAttribute("aria-hidden", "true");
    ov.innerHTML = stageHtml(motion);
    document.body.appendChild(ov);
    buildMotion(ov.querySelector(".jtrans"), motion);
    lockScroll();
    window.requestAnimationFrame(function () {
      ov.classList.add("is-on");
    });
    window.setTimeout(function () {
      window.location.href = href;
    }, 420);
  }

  document.addEventListener(
    "click",
    function (e) {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest ? e.target.closest("a[href]") : null;
      if (!a) return;
      var href = isInternal(a);
      if (!href) return;
      e.preventDefault();
      playExit(href);
    },
    true,
  );

  window.addEventListener("pageshow", function (ev) {
    if (ev.persisted) {
      leaving = false;
      unlock();
      var leftover = document.querySelector(".jtrans-exit");
      if (leftover && leftover.parentNode)
        leftover.parentNode.removeChild(leftover);
    }
  });

  window.jujcoGo = playExit;
})();
