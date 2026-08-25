/* JUJCO motion — scroll, morph, 3D. Never splits heading letters. */
(function () {
  "use strict";

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touch =
    !window.matchMedia ||
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function qsa(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  function rise() {
    var els = qsa(
      "[data-rise], .jdetail-step, .jdetail-fact, .j3d, .jstat, .jrole, .jcase, .jarticle, .jmap-card",
    );
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-up");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-up");
          io.unobserve(en.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach(function (el, i) {
      el.style.setProperty("--rise-delay", Math.min(i % 6, 5) * 70 + "ms");
      io.observe(el);
    });
  }

  function tilt3d() {
    if (reduce || touch) return;
    qsa(".j3d, .jujco-svc, .jstat, .jrole, .jcase").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "perspective(900px) rotateY(" +
          (px * 7).toFixed(2) +
          "deg) rotateX(" +
          (-py * 7).toFixed(2) +
          "deg) translateY(-4px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  function heroParallax() {
    if (reduce || touch) return;
    var heros = qsa(".jdetail-hero, .jpage-hero");
    if (!heros.length) return;
    var ticking = false;
    function update() {
      var y = window.scrollY || 0;
      heros.forEach(function (h) {
        var orbs = h.querySelector(".jmorph");
        if (orbs)
          orbs.style.transform =
            "translate3d(0," + (y * 0.18).toFixed(1) + "px,0)";
      });
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true },
    );
  }

  function morphLoop() {
    if (reduce) return;
    qsa(".jmorph__orb").forEach(function (el, i) {
      el.style.animationDelay = i * -4 + "s";
    });
  }

  function hideHrefAfter() {
    /* Some preview/print layers append attr(href). Kill it on crumbs. */
    var s = document.getElementById("jujco-crumb-fix");
    if (s) return;
    s = document.createElement("style");
    s.id = "jujco-crumb-fix";
    s.textContent =
      ".jcrumbs a::after,.jcrumbs a::before,.breadcrumb a::after,.breadcrumb a::before,.jdetail-hero a::after,.cs_page_heading a::after{content:none!important;display:none!important}";
    document.head.appendChild(s);
  }

  function init() {
    hideHrefAfter();
    rise();
    tilt3d();
    heroParallax();
    morphLoop();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
