/* JUJCO — unique heading / copy motion, content-aware, responsive. */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch =
    !window.matchMedia ||
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var isSmall = window.innerWidth < 768;
  var isMedium = window.innerWidth < 992;

  function qsa(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  function themeOf(text) {
    var t = (text || "").toLowerCase();
    if (/emergenc|24\/7|urgent/.test(t)) return "emergency";
    if (/heat pump|hybrid|dual-fuel/.test(t)) return "hybrid";
    if (/heat|furnace|boiler|winter|warm|hydronic/.test(t)) return "heat";
    if (/cool|ac |air condition|summer|seer/.test(t)) return "cool";
    if (/air quality|humid|hrv|erv|duct|indoor air/.test(t)) return "air";
    if (/team|expert|meet our|technician/.test(t)) return "team";
    if (/testimonial|feedback|client|review/.test(t)) return "quote";
    if (/faq|question|asked/.test(t)) return "faq";
    if (/blog|news|article/.test(t)) return "news";
    if (/price|plan|pricing/.test(t)) return "price";
    if (/process|how we|working process|from the first/.test(t))
      return "process";
    if (/about|why choose|trusted|protected/.test(t)) return "about";
    if (/contact|book|appointment/.test(t)) return "contact";
    if (/project|work in|gallery|showcase|install/.test(t)) return "work";
    if (/service/.test(t)) return "service";
    return "default";
  }

  function splitWords(el) {
    if (el.dataset.jujcoSplit === "words") return qsa(".jujco-word", el);
    var text = el.textContent;
    el.textContent = "";
    text.split(/(\s+)/).forEach(function (w) {
      if (w === "") return;
      if (/^\s+$/.test(w)) {
        el.appendChild(document.createTextNode(w));
        return;
      }
      var s = document.createElement("span");
      s.className = "jujco-word";
      s.textContent = w;
      el.appendChild(s);
    });
    el.dataset.jujcoSplit = "words";
    return qsa(".jujco-word", el);
  }

  function splitChars(el) {
    if (el.dataset.jujcoSplit === "chars") return qsa(".jujco-char", el);
    var nodes = Array.prototype.slice.call(el.childNodes);
    var frag = document.createDocumentFragment();
    nodes.forEach(function (node) {
      if (node.nodeType === 3) {
        node.nodeValue.split(/(\s+)/).forEach(function (part) {
          if (part === "") return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            var word = document.createElement("span");
            word.className = "jujco-word";
            for (var i = 0; i < part.length; i++) {
              var s = document.createElement("span");
              s.className = "jujco-char";
              s.textContent = part[i];
              word.appendChild(s);
            }
            frag.appendChild(word);
          }
        });
      } else if (node.nodeName === "BR") {
        frag.appendChild(document.createElement("br"));
      } else {
        frag.appendChild(node);
      }
    });
    el.innerHTML = "";
    el.appendChild(frag);
    el.dataset.jujcoSplit = "chars";
    return qsa(".jujco-char", el);
  }

  function hashVar(text) {
    var h = 0;
    text = text || "";
    for (var i = 0; i < text.length; i++) h = (h << 5) - h + text.charCodeAt(i);
    return String(Math.abs(h) % 4);
  }

  function tag(el, kind, theme) {
    if (!el || el.hasAttribute("data-jfx")) return;
    el.setAttribute("data-jfx", theme);
    el.setAttribute("data-jfx-kind", kind);
    el.setAttribute("data-jfx-var", hashVar(el.textContent));
    el.classList.add("jfx", "jfx--" + theme, "jfx-" + kind);
  }

  function playBlock(el) {
    el.classList.add("is-in");
  }

  function playWords(el, distY, distX, scale) {
    var words = splitWords(el);
    words.forEach(function (w, i) {
      w.style.display = "inline-block";
      w.style.transition =
        "transform .55s cubic-bezier(.22,.7,.2,1), opacity .5s ease";
      w.style.transitionDelay = Math.min(i * (isSmall ? 18 : 28), 360) + "ms";
      w.style.opacity = "0";
      w.style.transform =
        "translate(" +
        (distX || 0) +
        "px," +
        (distY || 18) +
        "px) scale(" +
        (scale || 1) +
        ")";
    });
    el._jfxPlay = function () {
      words.forEach(function (w) {
        w.style.opacity = "1";
        w.style.transform = "none";
      });
      el.classList.add("is-in");
    };
  }

  function playChars(el, theme) {
    var chars = splitChars(el);
    chars.forEach(function (c, i) {
      c.style.display = "inline-block";
      c.style.transition =
        "transform .6s cubic-bezier(.22,.7,.2,1), opacity .55s ease";
      c.style.transitionDelay = Math.min(i * 16, 420) + "ms";
      c.style.opacity = "0";
      if (theme === "heat") c.style.transform = "translateY(22px)";
      else if (theme === "cool") c.style.transform = "translateY(-18px)";
      else if (theme === "hybrid")
        c.style.transform = "translateY(14px) scale(.92)";
      else if (theme === "emergency")
        c.style.transform = "translateY(10px) scale(1.08)";
      else c.style.transform = "translateY(16px)";
    });
    el._jfxPlay = function () {
      chars.forEach(function (c) {
        c.style.opacity = "1";
        c.style.transform = "none";
      });
      el.classList.add("is-in");
    };
  }

  function initHeadings() {
    if (reduceMotion) {
      qsa(
        ".cs_hero_title, .cs_hero_mini_title, .cs_hero_subtitle, .cs_section_title, .cs_section_subtitle, .cs_page_heading h1, .cs_cta_title, .cs_accordian_title",
      ).forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }

    /* Hero kicker */
    qsa(".cs_hero_mini_title").forEach(function (el) {
      var th = themeOf(el.textContent);
      tag(el, "kicker", th);
    });

    /* Hero titles — whole line only. Splitting words/letters stacked them on one spot. */
    qsa(".cs_hero_title").forEach(function (el) {
      tag(el, "hero", themeOf(el.textContent));
    });

    /* Hero subtitles / descriptions */
    qsa(".cs_hero_subtitle").forEach(function (el) {
      var hero = el.closest(".cs_hero");
      var src = hero ? hero.querySelector(".cs_hero_title") || el : el;
      tag(el, "lede", themeOf(src.textContent));
    });

    /* Section kickers */
    qsa(".cs_section_subtitle").forEach(function (el) {
      var wrap = el.closest(".cs_section_heading") || el.parentElement;
      var title = wrap ? wrap.querySelector(".cs_section_title") : null;
      tag(el, "kicker", themeOf((title || el).textContent));
    });

    /* Section titles */
    qsa(".cs_section_title").forEach(function (el) {
      tag(el, "section", themeOf(el.textContent));
      el.classList.add("jfx-line");
    });

    /* Section body copy under headings */
    qsa(".cs_section_heading p, .cs_section_heading .cs_section_text").forEach(
      function (el) {
        var title =
          el.parentElement &&
          el.parentElement.querySelector(".cs_section_title");
        tag(el, "copy", themeOf((title || el).textContent));
      },
    );

    /* Inner-page banners */
    qsa(".cs_page_heading h1").forEach(function (el) {
      tag(el, "page", themeOf(el.textContent + " " + (document.title || "")));
    });

    /* CTA titles */
    qsa(".cs_cta_title").forEach(function (el) {
      var th = themeOf(el.textContent) || "emergency";
      tag(el, "cta", th === "default" ? "contact" : th);
    });

    /* FAQ questions — no split, keep clicks intact */
    qsa(".cs_accordian_title").forEach(function (el) {
      tag(el, "faq", themeOf(el.textContent));
    });

    /* Card titles except hexagon service cards (those overflow if split) */
    qsa(
      ".cs_card_title, .cs_post_title, .cs_team_title, .cs_iconbox h3, .cs_iconbox_title",
    ).forEach(function (el) {
      if (el.closest(".cs_service_card")) return;
      tag(el, "card", themeOf(el.textContent));
    });

    var io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            function (entries) {
              entries.forEach(function (en) {
                if (!en.isIntersecting) return;
                var el = en.target;
                if (el._jfxPlay) el._jfxPlay();
                else playBlock(el);
                io.unobserve(el);
              });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
          )
        : null;

    qsa("[data-jfx]").forEach(function (el) {
      if (io) io.observe(el);
      else if (el._jfxPlay) el._jfxPlay();
      else playBlock(el);
    });
  }

  function parallaxMouse() {
    if (isTouch || reduceMotion) return;
    var layers = qsa("[data-parallax]");
    if (!layers.length) return;
    var tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = null;
    window.addEventListener(
      "mousemove",
      function (e) {
        tx = e.clientX / window.innerWidth - 0.5;
        ty = e.clientY / window.innerHeight - 0.5;
        if (!raf) raf = requestAnimationFrame(apply);
      },
      { passive: true },
    );
    function apply() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      layers.forEach(function (l) {
        var d = parseFloat(l.getAttribute("data-parallax")) || 10;
        l.style.transform =
          "translate3d(" +
          (cx * d).toFixed(1) +
          "px," +
          (cy * d).toFixed(1) +
          "px,0)";
      });
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002)
        raf = requestAnimationFrame(apply);
      else raf = null;
    }
  }

  function wipeReveal() {
    var els = qsa(".jujco-wipe");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      els.forEach(function (e) {
        e.classList.add("in-view");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    els.forEach(function (e) {
      io.observe(e);
    });
  }

  function bento() {
    var items = qsa(".jujco-bento__item");
    if (!items.length) return;
    var overlay = document.getElementById("jujcoBentoOverlay");
    items.forEach(function (it) {
      it.addEventListener("click", function () {
        if (!overlay) return;
        var img = it.querySelector("img");
        var slot = overlay.querySelector("img");
        if (img && slot) slot.src = img.src;
        overlay.classList.add("is-open");
      });
    });
    if (overlay)
      overlay.addEventListener("click", function () {
        overlay.classList.remove("is-open");
      });
  }

  function marquee() {
    qsa(".jujco-marquee__track").forEach(function (tr) {
      if (!tr.dataset.cloned) {
        tr.innerHTML = tr.innerHTML + tr.innerHTML;
        tr.dataset.cloned = "true";
      }
    });
  }

  function init() {
    initHeadings();
    parallaxMouse();
    wipeReveal();
    bento();
    marquee();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
