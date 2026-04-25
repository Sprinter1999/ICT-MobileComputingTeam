(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function safeSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* localStorage may be disabled */ }
  }

  onReady(function () {
    var root = document.documentElement;
    var body = document.body;
    if (!body) return;

    var page = body.getAttribute("data-page") || "";
    var navLinks = document.querySelectorAll(".nav a[data-page]");
    navLinks.forEach(function (link) {
      if (link.getAttribute("data-page") === page) {
        link.classList.add("active");
      }
    });

    var langBtn = document.querySelector("[data-lang-toggle]");

    function applyLang(lang, shouldSave) {
      var normalized = lang === "en" ? "en" : "zh-CN";
      root.setAttribute("data-lang", normalized);
      root.setAttribute("lang", normalized);
      body.classList.toggle("lang-en", normalized === "en");
      body.classList.toggle("lang-zh", normalized !== "en");

      if (langBtn) {
        langBtn.textContent = normalized === "en" ? "中文" : "English";
        langBtn.setAttribute("aria-label", normalized === "en" ? "切换到中文" : "Switch to English");
      }

      if (shouldSave) {
        safeSet("ictmc-lang", normalized === "en" ? "en" : "zh");
      }
    }

    var savedLang = safeGet("ictmc-lang");
    applyLang(savedLang === "en" ? "en" : "zh-CN", false);

    if (langBtn) {
      langBtn.addEventListener("click", function () {
        var next = root.getAttribute("data-lang") === "en" ? "zh-CN" : "en";
        applyLang(next, true);
      });
    }

    var menuBtn = document.querySelector("[data-menu-toggle]");
    var nav = document.querySelector(".nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function () {
        nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
      });
    }
  });
})();
