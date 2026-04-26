(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function safeGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* localStorage may be disabled */
    }
  }

  function initLanguageAndNav() {
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
        langBtn.setAttribute(
          "aria-label",
          normalized === "en" ? "切换到中文" : "Switch to English"
        );
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
        menuBtn.setAttribute(
          "aria-expanded",
          nav.classList.contains("open") ? "true" : "false"
        );
      });
    }
  }

  function initCarousels() {
    var carousels = document.querySelectorAll("[data-carousel]");

    carousels.forEach(function (carousel) {
      /*
        防止 main.js 被重复加载时，
        同一个轮播被初始化多次，导致速度忽快忽慢。
      */
      if (carousel.getAttribute("data-carousel-ready") === "true") {
        return;
      }

      carousel.setAttribute("data-carousel-ready", "true");

      var slides = carousel.querySelectorAll(".carousel-slide");
      var dots = carousel.querySelectorAll(".dot");
      var prevBtn = carousel.querySelector(".carousel-prev");
      var nextBtn = carousel.querySelector(".carousel-next");

      if (!slides.length) return;

      var currentIndex = 0;
      var timer = null;
      var intervalTime = 4000;
      var isHovering = false;

      function showSlide(index) {
        if (index < 0) {
          currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
          currentIndex = 0;
        } else {
          currentIndex = index;
        }

        slides.forEach(function (slide, i) {
          slide.classList.toggle("active", i === currentIndex);
        });

        dots.forEach(function (dot, i) {
          dot.classList.toggle("active", i === currentIndex);
        });
      }

      function nextSlide() {
        showSlide(currentIndex + 1);
      }

      function prevSlide() {
        showSlide(currentIndex - 1);
      }

      function stopAutoPlay() {
        if (timer !== null) {
          clearInterval(timer);
          timer = null;
        }
      }

      function startAutoPlay() {
        stopAutoPlay();

        if (slides.length <= 1) return;
        if (isHovering) return;
        if (document.hidden) return;

        timer = setInterval(function () {
          nextSlide();
        }, intervalTime);
      }

      function restartAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          nextSlide();
          restartAutoPlay();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          prevSlide();
          restartAutoPlay();
        });
      }

      dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
          showSlide(index);
          restartAutoPlay();
        });
      });

      carousel.addEventListener("mouseenter", function () {
        isHovering = true;
        stopAutoPlay();
      });

      carousel.addEventListener("mouseleave", function () {
        isHovering = false;
        startAutoPlay();
      });

      document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
          stopAutoPlay();
        } else {
          startAutoPlay();
        }
      });

      showSlide(0);
      startAutoPlay();
    });
  }

  onReady(function () {
    initLanguageAndNav();
    initCarousels();
  });
})();