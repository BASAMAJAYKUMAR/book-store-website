// Function to add event listeners to an element or an array of elements
const addEventOnElem = (elem, type, callback) => {
  if (elem.length > 1) {
    elem.forEach((el) => el.addEventListener(type, callback));
  } else {
    elem.addEventListener(type, callback);
  }
};

// Navigation Logic
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

// Header Logic
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.header');
  const navToggler = document.querySelector('[data-nav-toggler]');
  const overlay = document.querySelector('[data-overlay]');
  const searchBtn = document.querySelector('.search-btn');
  const searchField = document.querySelector('.input-field');

  // Navigation Toggle
  navToggler.addEventListener('click', () => {
    header.classList.add('nav-open');
  });

  overlay.addEventListener('click', () => {
    header.classList.remove('nav-open');
  });

  // Search functionality
  searchBtn.addEventListener('click', () => {
    searchField.classList.toggle('active');
  });

  // Hero Section Logic
  const heroBtn = document.querySelector('.hero .btn');

  heroBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Explore More button clicked');
  });

  // Feature Section Logic
  const featureCards = document.querySelectorAll('.feature-card');

  featureCards.forEach((card) => {
    card.addEventListener('click', () => {
      console.log('Feature Card Clicked');
    });
  });

  // Footer Logic
  const backToTopBtn = document.querySelector("[data-back-top-btn]");

  // Smooth scroll to anchor links
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  function smoothScroll(event) {
    event.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - header.offsetHeight,
        behavior: "smooth",
      });
    }
  }

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Intersection Observer for fading in elements
  const fadeInElements = document.querySelectorAll(".fade-in");
  const options = {
    root: null,
    threshold: 0.3,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  fadeInElements.forEach((element) => {
    observer.observe(element);
  });
});
