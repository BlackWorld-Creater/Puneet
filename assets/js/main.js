// Preloader
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".preloader");

  // Hide preloader after page loads
  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.classList.add("hide");
    }, 1500);
  });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburger) {
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
  }
});

// --- NEW: Typed Text Effect for Hero ---
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

if (typedTextSpan && cursorSpan) {
  const textArray = [
    "a Community Builder.",
    "a Visionary Thinker.",
    "a Partner in Growth.",
  ];
  const typingDelay = 100;
  const erasingDelay = 60;
  const newTextDelay = 1500; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing"))
        cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing"))
        cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1,
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  setTimeout(type, newTextDelay + 250);
}

// --- NEW: Initialize AOS (Animate on Scroll) ---
AOS.init({
  duration: 800,
  once: true, // whether animation should happen only once
  offset: 100, // offset (in px) from the original trigger point
});

// --- OBSERVER: (Optional - can be removed if using AOS, but kept for custom elements) ---
// If you want to keep the observer for specific elements not using AOS, you can.
// But AOS now handles most. I'll comment it out to avoid conflicts.
// You can delete this entire observer block if you rely solely on AOS.

/*
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".philosophy-card, .value-item, .venture-card, .timeline-item, .competency-item",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });
*/

// Hero scroll down button functionality
const heroScroll = document.querySelector(".hero-scroll");
if (heroScroll) {
  heroScroll.addEventListener("click", function () {
    const storySection = document.querySelector("#story");
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// Active navlink on scroll (Keep this as is)
const sections = document.querySelectorAll("section[id]");
function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelectorAll(".nav-link")
          .forEach((link) => link.classList.remove("active"));
        navLink.classList.add("active");
      }
    }
  });
  if (scrollY < 100) {
    document
      .querySelectorAll(".nav-link")
      .forEach((link) => link.classList.remove("active"));
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) homeLink.classList.add("active");
  }
}
window.addEventListener("scroll", highlightNavOnScroll);
document.addEventListener("DOMContentLoaded", highlightNavOnScroll);
