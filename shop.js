

const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener(type, callback);
      }
    } else {
      elem.addEventListener(type, callback);
    }
  }
  
  
  
  
  
  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const overlay = document.querySelector("[data-overlay]");
  
  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  }
  
  addEventOnElem(navTogglers, "click", toggleNavbar);
  
  
  
  
  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");
  
  const activeElemOnScroll = function () {
    if (window.scrollY > 100) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      backTopBtn.classList.remove("active");
    }
  }
  
  addEventOnElem(window, "scroll", activeElemOnScroll);
  
  
  
  
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter]");
  
  let lastClickedBtn = filterBtn[0];
  
  const filter = function () {
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  
    for (let i = 0; i < filterItems.length; i++) {
      if (filterItems[i].dataset.filter === this.dataset.filterBtn) {
        filterItems[i].style.display = "block";
      } else {
        filterItems[i].style.display = "none";
      }
    }
  }
  
  addEventOnElem(filterBtn, "click", filter);
  
  
  
  
  
  
  


document.addEventListener("DOMContentLoaded", function () {
    // Navigation and Header
    const navToggler = document.querySelector("[data-nav-toggler]");
    const overlay = document.querySelector("[data-overlay]");
    const navbar = document.querySelector("[data-navbar]");
    const searchField = document.querySelector(".input-field");
    const searchBtn = document.querySelector(".search-btn");
    const cartBtn = document.querySelector(".header-action-btn[aria-label='cart']");
    const userBtn = document.querySelector(".header-action-btn[aria-label='user']");
    const navCloseBtn = document.querySelector(".nav-close-btn");
  
    // Function to toggle navigation menu
    function toggleNavbar() {
      navbar.classList.toggle("open");
      overlay.classList.toggle("open");
    }
  
    // Function to close navigation menu
    function closeNavbar() {
      navbar.classList.remove("open");
      overlay.classList.remove("open");
    }
  
    // Event listeners
    navToggler.addEventListener("click", toggleNavbar);
    overlay.addEventListener("click", closeNavbar);
    navCloseBtn.addEventListener("click", closeNavbar);
  
    // Search functionality
    searchBtn.addEventListener("click", function () {
      const searchTerm = searchField.value.trim();
      if (searchTerm !== "") {
        // Perform search (add your logic here)
        alert(`Search for: ${searchTerm}`);
      }
    });
  
    // Cart functionality
    cartBtn.addEventListener("click", function () {
      // Handle cart interaction (add your logic here)
      alert("Open cart or perform cart-related action");
    });
  
    // User functionality
    userBtn.addEventListener("click", function () {
      // Handle user interaction (add your logic here)
      alert("Open user menu or perform user-related action");
    });
  
    // Filter buttons
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((button) => {
      button.addEventListener("click", filterProducts);
    });
  
    function filterProducts(event) {
      const selectedFilter = event.target.getAttribute("data-filter-btn");
      const productItems = document.querySelectorAll(".scrollbar-item");
  
      productItems.forEach((item) => {
        const itemFilter = item.getAttribute("data-filter");
  
        if (selectedFilter === "all" || selectedFilter === itemFilter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }
  
    // Countdown timer
    const countdownTimeElements = document.querySelectorAll(".countdown-time");
    const countdownLabels = document.querySelectorAll(".countdown-label");
  
    function updateCountdown() {
      const endDate = new Date("2024-02-29T23:59:59").getTime();
      const now = new Date().getTime();
      const timeDifference = endDate - now;
  
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      countdownTimeElements[0].innerText = days;
      countdownTimeElements[1].innerText = hours;
      countdownTimeElements[2].innerText = minutes;
      countdownTimeElements[3].innerText = seconds;
  
      countdownLabels[0].innerText = days === 1 ? "Day" : "Days";
      countdownLabels[1].innerText = hours === 1 ? "Hour" : "Hours";
      countdownLabels[2].innerText = minutes === 1 ? "Min" : "Mins";
      countdownLabels[3].innerText = seconds === 1 ? "Sec" : "Secs";
    }
  
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial update
  
    // Lightbox for Quick View
    const quickViewButtons = document.querySelectorAll(".action-btn[aria-label='quick view']");
    const lightbox = document.getElementById("lightbox");
  
    quickViewButtons.forEach((button) => {
      button.addEventListener("click", openLightbox);
    });
  
    function openLightbox(event) {
      const productCard = event.target.closest(".product-card");
      const productName = productCard.querySelector(".card-title").innerText;
      const productPrice = productCard.querySelector(".card-price").innerText;
  
      const lightboxContent = `
        <div class="lightbox-content">
          <h2 class="h2">${productName}</h2>
          <p class="section-text">Price: ${productPrice}</p>
          <!-- Add more product details or customization options here -->
          <button class="btn" id="closeLightbox">Close</button>
        </div>
      `;
  
      lightbox.innerHTML = lightboxContent;
      lightbox.style.display = "flex";
  
      document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
    }
  
    function closeLightbox() {
      lightbox.innerHTML = "";
      lightbox.style.display = "none";
    }
  
    // Wishlist, Comparison, and Cart functionality
    const productCards = document.querySelectorAll(".product-card");
    const shoppingCart = [];
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
  
    productCards.forEach((card) => {
      const quickViewBtn = card.querySelector(".action-btn[aria-label='quick view']");
      const wishlistBtn = card.querySelector(".action-btn[aria-label='add to wishlist']");
      const compareBtn = card.querySelector(".action-btn[aria-label='compare']");
      const addToCartBtn = card.querySelector(".action-btn[aria-label='add to cart']");
  
      quickViewBtn.addEventListener("click", () => handleQuickView(card));
      wishlistBtn.addEventListener("click", () => handleWishlist(card));
      compareBtn.addEventListener("click", () => handleCompare(card));
      addToCartBtn.addEventListener("click", () => handleAddToCart(card));
    });
  
    function handleQuickView(card) {
      const productName = card.querySelector(".card-title").textContent;
      alert(`Quick view for ${productName}`);
      // Add your detailed quick view logic here (e.g., show a modal)
    }
  
    function handleWishlist(card) {
      const productName = card.querySelector(".card-title").textContent;
      if (!isInWishlist(productName)) {
        shoppingCart.push({ name: productName, price: getProductPrice(card), type: "wishlist" });
        alert(`Added ${productName} to wishlist`);
      } else {
        alert(`${productName} is already in your wishlist`);
      }
    }
  
    function handleCompare(card) {
      const productName = card.querySelector(".card-title").textContent;
      if (!isInComparison(productName)) {
        shoppingCart.push({ name: productName, price: getProductPrice(card), type: "comparison" });
        alert(`Added ${productName} to comparison`);
      } else {
        alert(`${productName} is already in your comparison list`);
      }
    }
  
    function handleAddToCart(card) {
      const productName = card.querySelector(".card-title").textContent;
      shoppingCart.push({ name: productName, price: getProductPrice(card), type: "cart" });
      alert(`Added ${productName} to cart`);
      updateCartUI();
    }
  
    function isInWishlist(productName) {
      return shoppingCart.some((item) => item.name === productName && item.type === "wishlist");
    }
  
    function isInComparison(productName) {
      return shoppingCart.some((item) => item.name === productName && item.type === "comparison");
    }
  
    function getProductPrice(card) {
      return parseFloat(card.querySelector(".card-price").getAttribute("value"));
    }
  
    function isInCart(productName) {
      return shoppingCart.some((item) => item.name === productName && item.type === "cart");
    }
  
    function updateCartUI() {
      cartList.innerHTML = "";
      let total = 0;
  
      shoppingCart.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)} (${item.type})`;
        cartList.appendChild(listItem);
  
        total += item.price;
      });
  
      totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  
    // Additional features can be added based on your project needs.
  
  });
  




  