const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
      elem.forEach(function (el) {
        el.addEventListener(type, callback);
      });
    } else {
      elem.addEventListener(type, callback);
    }
  };
  
  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const overlay = document.querySelector("[data-overlay]");
  
  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  };
  
  addEventOnElem(navTogglers, "click", toggleNavbar);
  
  document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('.header');
    const navToggler = document.querySelector('[data-nav-toggler]');
    const overlay = document.querySelector('[data-overlay]');
    const searchBtn = document.querySelector('.search-btn');
    const searchField = document.querySelector('.input-field');
  
    navToggler.addEventListener('click', function () {
      header.classList.add('nav-open');
    });
  
    overlay.addEventListener('click', function () {
      header.classList.remove('nav-open');
    });
  
    // Search functionality
  searchBtn.addEventListener('click', function () {
    searchField.classList.toggle('active');
  });

  // Additional logic for search functionality
  const searchForm = document.querySelector('form');
  const productItems = document.querySelectorAll('.product-item');

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = searchField.value.trim().toLowerCase();

    if (searchTerm !== '') {
      filterProducts(searchTerm);
    } else {
      // If the search term is empty, show all products
      productItems.forEach(item => item.style.display = 'block');
    }
  });

  function filterProducts(searchTerm) {
    productItems.forEach(item => {
      const title = item.querySelector('.product-title').textContent.toLowerCase();

      // Check if the title includes the search term
      if (title.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
    // Hero Section Logic
    const heroBtn = document.querySelector('.hero .btn');
  
    heroBtn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Explore More button clicked');
    });
  
    const featureCards = document.querySelectorAll('.feature-card');
  
    featureCards.forEach(function (card) {
      card.addEventListener('click', function () {
        console.log('Feature Card Clicked');
      });
    });
  
    const backToTopBtn = document.querySelector("[data-back-top-btn]");
  
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(function (link) {
      addEventOnElem(link, "click", smoothScroll);
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
  
    addEventOnElem(backToTopBtn, "click", function (e) {
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
  
    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);
  
    fadeInElements.forEach(function (element) {
      observer.observe(element);
    });
  });
  
