document.addEventListener("DOMContentLoaded", () => {
  /**
   * ===================================================================
   * 1. MOBILE MENU, SEARCH, CONTACT WIDGET
   * (No major changes here, your original working code + the previous fix)
   * ===================================================================
   */
  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-navigation");
  const pageOverlay = document.querySelector(".page-overlay");
  const body = document.body;

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("is-open");
      body.classList.toggle("mobile-menu-open");
    });
    pageOverlay.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      body.classList.remove("mobile-menu-open");
    });
  }

  // --- Search Overlay Toggle ---
  const searchToggles = document.querySelectorAll(".search-toggle");
  const searchOverlay = document.querySelector(".search-overlay");
  const closeSearchBtn = document.querySelector(".close-search");

  if (searchToggles.length > 0 && searchOverlay) {
    searchToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        searchOverlay.classList.add("is-open");
        searchOverlay.querySelector("input").focus();
      });
    });
    closeSearchBtn.addEventListener("click", () => {
      searchOverlay.classList.remove("is-open");
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchOverlay.classList.contains("is-open")) {
        searchOverlay.classList.remove("is-open");
      }
    });
  }

  // --- Contact Widget Logic ---
  const contactWidget = document.querySelector(".contact-widget-container");
  const contactToggleButton = document.querySelector(".contact-toggle-button");
  const contactCloseButton = document.getElementById("contact-close-button");

  if (contactWidget && contactToggleButton && contactCloseButton) {
    contactToggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      contactWidget.classList.add("is-open");
    });
    contactCloseButton.addEventListener("click", () =>
      contactWidget.classList.remove("is-open")
    );
    document.addEventListener("click", (e) => {
      if (!contactWidget.contains(e.target)) {
        contactWidget.classList.remove("is-open");
      }
    });
  }

  /**
   * ===================================================================
   * 2. DRAG-TO-SCROLL FOR PRODUCT CONTAINER (FIX 1)
   * ===================================================================
   */
  const productContainer = document.querySelector(".product-container");
  if (productContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    const startDragging = (e) => {
      isDown = true;
      productContainer.classList.add("is-dragging");
      startX = (e.pageX || e.touches[0].pageX) - productContainer.offsetLeft;
      scrollLeft = productContainer.scrollLeft;
    };

    const stopDragging = () => {
      isDown = false;
      productContainer.classList.remove("is-dragging");
    };

    const whileDragging = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = (e.pageX || e.touches[0].pageX) - productContainer.offsetLeft;
      const walk = (x - startX) * 2; // The multiplier makes the scroll faster
      productContainer.scrollLeft = scrollLeft - walk;
    };

    productContainer.addEventListener("mousedown", startDragging);
    productContainer.addEventListener("mouseleave", stopDragging);
    productContainer.addEventListener("mouseup", stopDragging);
    productContainer.addEventListener("mousemove", whileDragging);
    productContainer.addEventListener("touchstart", startDragging, {
      passive: true,
    });
    productContainer.addEventListener("touchend", stopDragging);
    productContainer.addEventListener("touchmove", whileDragging, {
      passive: false,
    });
  }

  /**
   * ===================================================================
   * 3. REUSABLE SLIDER FUNCTION WITH RESIZE HANDLING (FIX 2)
   * ===================================================================
   */
  const sliderInstances = {};

  function initializeSlider(sliderSelector, options = {}) {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return null;

    let instance = {
      slider,
      slidesContainer: slider.querySelector(".slides-container"),
      slides: slider.querySelectorAll(".slide, .blog-post-card"),
      paginationContainer: slider.querySelector(".hero-pagination"),
      config: { autoplay: true, autoplayDelay: 5000, ...options },
      slideCount: 0,
      currentSlide: 0,
      slideInterval: null,
      dots: [],
      isDragging: false,
      startPos: 0,
      currentTranslate: 0,
      prevTranslate: 0,
      animationID: null,

      setup() {
        this.slideCount = this.slides.length;
        if (this.slideCount === 0) return;
        this.slidesContainer.style.width = `${this.slideCount * 100}%`;
        this.slides.forEach((slide) => {
          slide.style.width = `${100 / this.slideCount}%`;
          slide.style.flexShrink = "0"; // Ensure slides don't shrink
        });

        if (this.paginationContainer) {
          this.paginationContainer.innerHTML = "";
          for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement("button");
            dot.classList.add("dot");
            dot.addEventListener("click", () => {
              this.showSlide(i);
              this.resetAutoplay();
            });
            this.paginationContainer.appendChild(dot);
            this.dots.push(dot);
          }
        }
        this.addEventListeners();
        this.showSlide(0);
        this.startAutoplay();
      },

      destroy() {
        this.stopAutoplay();
        // Remove all inline styles added by JS
        this.slidesContainer.removeAttribute("style");
        this.slides.forEach((slide) => slide.removeAttribute("style"));
        if (this.paginationContainer) this.paginationContainer.innerHTML = "";
        // Remove event listeners if they were added in a more complex setup
      },

      showSlide(n) {
        this.slidesContainer.style.transition = "transform 0.5s ease-in-out";
        this.currentSlide = n;
        const offset = -this.currentSlide * this.slides[0].offsetWidth;
        this.slidesContainer.style.transform = `translateX(${offset}px)`;
        this.prevTranslate = offset;

        if (this.dots.length > 0) {
          this.dots.forEach((dot) => dot.classList.remove("active"));
          if (this.dots[n]) this.dots[n].classList.add("active");
        }
      },

      startAutoplay() {
        if (!this.config.autoplay) return;
        this.slideInterval = setInterval(
          () => this.showSlide((this.currentSlide + 1) % this.slideCount),
          this.config.autoplayDelay
        );
      },

      stopAutoplay() {
        clearInterval(this.slideInterval);
      },

      resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
      },

      addEventListeners() {
        // Simplified for brevity, drag logic can be added back if needed
      },
    };

    instance.setup();
    sliderInstances[sliderSelector] = instance;
    return instance;
  }

  /**
   * ===================================================================
   * 4. RESIZE HANDLER TO MANAGE SLIDERS
   * ===================================================================
   */
  function manageSlidersOnResize() {
    const isMobile = window.innerWidth < 1024;

    // --- Blog Slider ---
    if (isMobile && !sliderInstances[".blog-section"]) {
      initializeSlider(".blog-section", {
        slidesSelector: ".blog-post-card",
        autoplay: false,
      });
    } else if (!isMobile && sliderInstances[".blog-section"]) {
      sliderInstances[".blog-section"].destroy();
      delete sliderInstances[".blog-section"];
    }

    // --- Hero Slider (always active, but needs recalculation) ---
    if (sliderInstances[".hero-slider"]) {
      sliderInstances[".hero-slider"].showSlide(
        sliderInstances[".hero-slider"].currentSlide
      );
    }
  }

  // Initial setup
  initializeSlider(".hero-slider");
  manageSlidersOnResize();

  // Add resize listener
  window.addEventListener("resize", manageSlidersOnResize);
});

// This code should be placed at the end of your existing main.js file,
// or inside the DOMContentLoaded event listener.

// Ensure this runs after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if we are on the product page by looking for a specific element
  const productGrid = document.getElementById("product-grid-main");
  if (!productGrid) {
    // If the product grid doesn't exist, we're not on the products page.
    // So, we stop executing the rest of this script.
    return;
  }

  // --- 1. MOCK PRODUCT DATA ---
  // In a real application, this would come from a server/database.
  const allProducts = [
    {
      id: 1,
      name: "Kính Mắt Mèo",
      price: 250000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Mắt Mèo",
      material: "Nhựa",
    },
    {
      id: 2,
      name: "Kính Browline",
      price: 280000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Browline",
      material: "Nhựa pha kim loại",
    },
    {
      id: 3,
      name: "Kính Tròn Kim Loại",
      price: 320000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Hình Tròn",
      material: "Kim loại",
    },
    {
      id: 4,
      name: "Kính Vuông Titan",
      price: 450000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Hình Vuông",
      material: "Titan",
    },
    {
      id: 5,
      name: "Kính Oval Acetate",
      price: 350000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Hình Oval",
      material: "Acetate",
    },
    {
      id: 6,
      name: "Kính Chữ Nhật",
      price: 190000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Chữ Nhật",
      material: "Nhựa",
    },
    {
      id: 7,
      name: "Kính Đa Giác",
      price: 290000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Đa Giác",
      material: "Kim loại",
    },
    {
      id: 8,
      name: "Kính Nhựa Dẻo",
      price: 210000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Hình Vuông",
      material: "Nhựa Dẻo",
    },
    {
      id: 9,
      name: "Kính Classic",
      price: 260000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Browline",
      material: "Acetate",
    },
    {
      id: 10,
      name: "Kính Modern",
      price: 380000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Mắt Mèo",
      material: "Titan",
    },
    {
      id: 11,
      name: "Kính Simple",
      price: 180000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Hình Tròn",
      material: "Nhựa",
    },
    {
      id: 12,
      name: "Kính Elegant",
      price: 310000,
      image: "assets/images/products/kinh-mat-maroon-1.jpg",
      shape: "Hình Oval",
      material: "Nhựa pha kim loại",
    },
  ];

  let currentlyDisplayedProducts = [...allProducts];

  // --- 2. RENDER PRODUCTS FUNCTION ---
  const resultsCountEl = document.querySelector(".results-count");

  function renderProducts(products) {
    productGrid.innerHTML = ""; // Clear existing products
    if (products.length === 0) {
      productGrid.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
    } else {
      products.forEach((product) => {
        const productCard = `
                    <article class="product-card">
                        <a href="product-detail.html" class="product-card-link" aria-label="View details for ${
                          product.name
                        }">
                            <div class="product-image-container">
                                <img src="${product.image}" alt="${
          product.name
        }" loading="lazy"/>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${product.name}</h3>
                                <div class="product-meta">
                                    <p class="product-price">${product.price.toLocaleString(
                                      "vi-VN"
                                    )} VNĐ</p>
                                    <span class="product-detail-link">Chi tiết</span>
                                </div>
                            </div>
                        </a>
                    </article>
                `;
        productGrid.innerHTML += productCard;
      });
    }
    // Update results count
    resultsCountEl.textContent = `Hiển thị ${products.length} của ${allProducts.length} kết quả`;
  }

  // --- 3. FILTER LOGIC ---
  const filterSidebar = document.getElementById("filter-sidebar");
  const filterToggleBtn = document.querySelector(".filter-toggle-btn");
  const closeFilterBtn = document.querySelector(".close-filter-btn");
  const filterOverlay = document.querySelector(".filter-overlay");
  const applyFiltersBtn = document.getElementById("apply-filters");
  const clearFiltersBtn = document.getElementById("clear-filters");
  const filterCheckboxes = document.querySelectorAll(
    '.filter-content input[type="checkbox"]'
  );

  function toggleFilterPanel() {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      document.body.classList.toggle("filter-open-mobile");
    } else {
      document.body.classList.toggle("filter-open-desktop");
    }
  }

  filterToggleBtn.addEventListener("click", toggleFilterPanel);
  closeFilterBtn.addEventListener("click", toggleFilterPanel);
  filterOverlay.addEventListener("click", toggleFilterPanel);

  applyFiltersBtn.addEventListener("click", () => {
    const selectedFilters = {
      shape: [],
      material: [],
      price: [],
    };

    filterCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedFilters[checkbox.name].push(checkbox.value);
      }
    });

    let filteredProducts = allProducts.filter((product) => {
      const shapeMatch =
        selectedFilters.shape.length === 0 ||
        selectedFilters.shape.includes(product.shape);
      const materialMatch =
        selectedFilters.material.length === 0 ||
        selectedFilters.material.includes(product.material);

      const priceMatch =
        selectedFilters.price.length === 0 ||
        selectedFilters.price.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return product.price >= min && product.price <= max;
        });

      return shapeMatch && materialMatch && priceMatch;
    });

    currentlyDisplayedProducts = filteredProducts;
    sortProducts(); // Re-sort after filtering
    toggleFilterPanel();
  });

  clearFiltersBtn.addEventListener("click", () => {
    filterCheckboxes.forEach((checkbox) => (checkbox.checked = false));
    currentlyDisplayedProducts = [...allProducts];
    sortProducts(); // Re-sort after clearing
  });

  // --- 4. SORT LOGIC ---
  const sortBySelect = document.getElementById("sort-by");

  function sortProducts() {
    const sortValue = sortBySelect.value;
    let sorted = [...currentlyDisplayedProducts];

    if (sortValue === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    }
    // 'default' case doesn't need sorting, it keeps the filtered order

    renderProducts(sorted);
  }

  sortBySelect.addEventListener("change", sortProducts);

  // --- 5. INITIAL RENDER ---
  renderProducts(allProducts);
});
// This code should be placed at the end of your existing main.js file,
// or inside the DOMContentLoaded event listener.

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // --- 1. GLOBAL SCRIPTS (Run on all pages) ---
  // ==========================================================================

  // --- Mobile Menu, Search, Contact Widget ---
  // (This is your existing, working code for these features)
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-navigation");
  const pageOverlay = document.querySelector(".page-overlay");
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      document.body.classList.toggle("mobile-menu-open");
    });
    pageOverlay.addEventListener("click", () => {
      document.body.classList.remove("mobile-menu-open");
    });
  }
  // ... add other global scripts like search and contact widget here ...

  // --- Toast Notification Handler ---
  const toastNotification = document.getElementById("toast-notification");
  let toastTimeout;
  function showToast(message) {
    if (!toastNotification) return;
    clearTimeout(toastTimeout);
    toastNotification.textContent = message;
    toastNotification.classList.add("is-visible");
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove("is-visible");
    }, 3000);
  }

  // --- Global Cart Icon Handler ---
  const headerCartIconGlobal = document.querySelector(
    ".header-actions .cart-icon"
  );
  if (headerCartIconGlobal) {
    headerCartIconGlobal.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.innerWidth < 1024) {
        // On mobile, always go to the cart page
        window.location.href = "cart.html";
      } else {
        // On desktop, always open the modal
        const cartModal = document.getElementById("cart-modal");
        const productDetailLayout = document.querySelector(
          ".product-detail-layout"
        );
        let productData = null;

        // Check if we are on the product detail page to get data
        if (productDetailLayout) {
          productData = {
            name: document.querySelector(".product-title-detail").textContent,
            price: parseFloat(
              document
                .querySelector(".current-price")
                .textContent.replace(/[^0-9]/g, "")
            ),
            quantity: parseInt(document.getElementById("quantity-input").value),
          };
        }

        // Generate and show the modal
        cartModal.innerHTML = getCartHTML(productData);
        openModal(cartModal);
        attachCartModalListeners(productData);
      }
    });
  }

  // ==========================================================================
  // --- 2. PAGE-SPECIFIC SCRIPTS ---
  // ==========================================================================

  // --- Product Detail Page Logic ---
  const productDetailLayout = document.querySelector(".product-detail-layout");
  if (productDetailLayout) {
    // --- Image Gallery ---
    const mainImage = document.getElementById("main-product-image");
    const thumbnails = document.querySelectorAll(".thumbnail-img");
    const prevBtn = document.querySelector(".gallery-nav.prev");
    const nextBtn = document.querySelector(".gallery-nav.next");
    let currentImageIndex = 0;
    function updateGallery(index) {
      mainImage.src = thumbnails[index].dataset.src;
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      thumbnails[index].classList.add("active");
      currentImageIndex = index;
    }
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => updateGallery(index));
    });
    prevBtn.addEventListener("click", () =>
      updateGallery(
        (currentImageIndex - 1 + thumbnails.length) % thumbnails.length
      )
    );
    nextBtn.addEventListener("click", () =>
      updateGallery((currentImageIndex + 1) % thumbnails.length)
    );

    // --- Quantity Selector ---
    const minusBtn = document.querySelector(".quantity-btn.minus");
    const plusBtn = document.querySelector(".quantity-btn.plus");
    const quantityInput = document.getElementById("quantity-input");
    minusBtn.addEventListener("click", () => {
      let val = parseInt(quantityInput.value);
      if (val > 1) quantityInput.value = val - 1;
    });
    plusBtn.addEventListener("click", () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    // --- "Buy Now" and "Add to Cart" Buttons ---
    const buyNowBtn = document.querySelector(".btn-buy-now");
    const addToCartBtn = document.querySelector(".btn-add-to-cart");

    buyNowBtn.addEventListener("click", () => {
      if (window.innerWidth < 1024) {
        window.location.href = "customer-info.html";
      } else {
        const productData = {
          name: document.querySelector(".product-title-detail").textContent,
          price: parseFloat(
            document
              .querySelector(".current-price")
              .textContent.replace(/[^0-9]/g, "")
          ),
          quantity: parseInt(quantityInput.value),
        };
        const customerInfoModal = document.getElementById(
          "customer-info-modal"
        );
        customerInfoModal.innerHTML = getCustomerInfoHTML(productData);
        openModal(customerInfoModal);
        attachCustomerInfoListeners();
      }
    });

    addToCartBtn.addEventListener("click", () => {
      headerCartIconGlobal.classList.add("shake");
      setTimeout(() => headerCartIconGlobal.classList.remove("shake"), 820);
      const cartCount = headerCartIconGlobal.querySelector(".cart-count");
      cartCount.textContent =
        parseInt(cartCount.textContent) + parseInt(quantityInput.value);
      showToast(`${quantityInput.value} sản phẩm đã được thêm vào giỏ hàng!`);
    });
  }

  // --- Related Products Carousel Logic ---
  const relatedSliderWrapper = document.querySelector(
    ".related-products-section .slider-wrapper"
  );
  if (relatedSliderWrapper) {
    // ... (The related products carousel script you already have) ...
  }

  // ==========================================================================
  // --- 3. HELPER FUNCTIONS (for Modals) ---
  // ==========================================================================
  const modalOverlay = document.getElementById("modal-overlay");

  function openModal(modal) {
    if (!modal || !modalOverlay) return;
    modalOverlay.classList.add("is-open");
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    if (!modal || !modalOverlay) return;
    modalOverlay.classList.remove("is-open");
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  // Close any open modal when overlay is clicked
  if (modalOverlay) {
    modalOverlay.addEventListener("click", () => {
      const openModals = document.querySelectorAll(".modal.is-open");
      openModals.forEach(closeModal);
    });
  }

  function getCustomerInfoHTML(productData) {
    const subtotal = productData.price * productData.quantity;
    const shipping = 20000;
    const discount = -20000;
    const total = subtotal + shipping + discount;
    const formatCurrency = (num) => num.toLocaleString("vi-VN") + " VNĐ";
    return `
            <div class="modal-content">
                <div class="modal-header">                    
                    <img src="assets/images/icons/icon-logo-maroon.svg" alt="Maroon Icon" style="height: 24px;">
                    <h2>Chốt đê! </h2>
                    <img src="assets/images/icons/harry-face-icon.svg" alt="Harry Face Icon"/>
                    <button class="modal-close-btn" id="close-customer-info">&times;</button>
                    </div>
                <div class="order-summary-box">
                    <h3 class="summary-title">Tổng tiền hàng</h3>
                    <div class="summary-row"><span class="item-name">${
                      productData.name
                    }</span><span class="item-qty">${
      productData.quantity
    }</span><span class="item-price">${formatCurrency(subtotal)}</span></div>
                    <div class="summary-row"><span class="item-name">Phí vận chuyển</span><span class="item-qty">1</span><span class="item-price">${formatCurrency(
                      shipping
                    )}</span></div>
                    <div class="summary-row"><span class="item-name">Ưu đãi</span><span class="item-qty">1</span><span class="item-price">${formatCurrency(
                      discount
                    )}</span></div>
                    <div class="summary-total"><span>Thành tiền</span><span>${formatCurrency(
                      total
                    )}</span></div>
                </div>
                <form class="customer-info-form">
                    <div class="form-group"><label>Họ Tên*</label><input type="text" placeholder="Họ và tên đầy đủ" required></div>
                    <div class="form-group"><label>Điện Thoại*</label><input type="tel" placeholder="Số điện thoại nhận hàng" required></div>
                    <div class="form-group"><label>Địa Chỉ*</label><input type="text" placeholder="Địa chỉ nhận hàng" required></div>
                    <div class="form-actions"><button type="button" class="btn btn-secondary" id="cancel-checkout">Quay Lại</button><button type="button" class="btn btn-primary" id="confirm-checkout">Chốt Luôn</button></div>
                </form>
            </div>`;
  }

  function getPaymentSuccessHTML() {
    return `
            <div class="modal-content page-centered-message">
                 <button class="modal-close-btn" style="position:absolute; top:1rem; right:1rem;" id="close-success">&times;</button>
                 <div class="success-icon"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
                <h1>Cảm ơn bạn!</h1><p>Maroon sẽ liên hệ với bạn để xác nhận đơn hàng.</p>
                <button class="btn btn-primary" id="back-to-home">Quay Lại Trang Chủ</button>
            </div>`;
  }

  function getCartHTML(productData) {
    if (!productData) {
      return `
                <div class="modal-content">
                    <div class="modal-header"><h2>Giỏ hàng</h2><button class="modal-close-btn" id="close-cart">&times;</button></div>
                    <p style="text-align:center; padding: 2rem 0;">Giỏ hàng của bạn đang trống.</p>
                    <div class="form-actions"><a href="products.html" class="btn btn-primary" style="width:100%; justify-content:center;">Bắt đầu mua sắm</a></div>
                </div>`;
    }
    const subtotal = productData.price * productData.quantity;
    const shipping = 20000;
    const discount = -20000;
    const total = subtotal + shipping + discount;
    const formatCurrency = (num) => num.toLocaleString("vi-VN") + " VNĐ";
    return `
            <div class="modal-content">
                <div class="modal-header"><h2>Giỏ hàng</h2><button class="modal-close-btn" id="close-cart">&times;</button></div>
                <div class="order-summary-box">
                    <div class="summary-row"><span class="item-name">${
                      productData.name
                    }</span><span class="item-qty">${
      productData.quantity
    }</span><span class="item-price">${formatCurrency(subtotal)}</span></div>
                    <div class="summary-total"><span>Tổng tạm tính</span><span>${formatCurrency(
                      total
                    )}</span></div>
                </div>
                 <div class="form-actions"><button type="button" class="btn btn-secondary" id="continue-shopping">Quay lại</button><button type="button" class="btn btn-primary" id="checkout-from-cart">Chốt đê</button></div>
            </div>`;
  }

  function attachCustomerInfoListeners() {
    const customerInfoModal = document.getElementById("customer-info-modal");
    const paymentSuccessModal = document.getElementById(
      "payment-success-modal"
    );
    document
      .getElementById("close-customer-info")
      .addEventListener("click", () => closeModal(customerInfoModal));
    document
      .getElementById("cancel-checkout")
      .addEventListener("click", () => closeModal(customerInfoModal));
    document
      .getElementById("confirm-checkout")
      .addEventListener("click", () => {
        closeModal(customerInfoModal);
        paymentSuccessModal.innerHTML = getPaymentSuccessHTML();
        openModal(paymentSuccessModal);
        document
          .getElementById("close-success")
          .addEventListener("click", () => closeModal(paymentSuccessModal));
        document
          .getElementById("back-to-home")
          .addEventListener(
            "click",
            () => (window.location.href = "index.html")
          );
      });
  }

  function attachCartModalListeners(productData) {
    const cartModal = document.getElementById("cart-modal");
    document
      .getElementById("close-cart")
      .addEventListener("click", () => closeModal(cartModal));

    const continueBtn = document.getElementById("continue-shopping");
    if (continueBtn)
      continueBtn.addEventListener("click", () => closeModal(cartModal));

    const checkoutBtn = document.getElementById("checkout-from-cart");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        closeModal(cartModal);
        const customerInfoModal = document.getElementById(
          "customer-info-modal"
        );
        customerInfoModal.innerHTML = getCustomerInfoHTML(productData);
        openModal(customerInfoModal);
        attachCustomerInfoListeners();
      });
    }
  }
});

// --- Carousel for RELATED Products Container ---
// Find the wrapper for the related products slider
const relatedSliderWrapper = document.querySelector(
  ".related-products-section .slider-wrapper"
);

// Only run this script if the slider wrapper exists on the page
if (relatedSliderWrapper) {
  const slider = relatedSliderWrapper.querySelector(
    ".related-products-container"
  );
  const prevButton = relatedSliderWrapper.querySelector(".slider-arrow.prev");
  const nextButton = relatedSliderWrapper.querySelector(".slider-arrow.next");
  const slides = Array.from(slider.children);

  let currentIndex = 0;
  const itemsPerScreen = 3; // We want to show 3 items on desktop

  function updateSliderPosition() {
    // Check if we are on a desktop-sized screen
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop) {
      // On mobile, reset any transform styles and let native scroll work
      slider.style.transform = "";
      // Hide arrows on mobile
      prevButton.style.display = "none";
      nextButton.style.display = "none";
      return;
    }

    // On desktop, show the arrows
    prevButton.style.display = "block";
    nextButton.style.display = "block";

    // --- Desktop Carousel Logic ---
    // Get the width of a single slide
    const slideWidth = slides[0].offsetWidth;
    // Get the value of the gap between slides from CSS
    const gap = parseInt(window.getComputedStyle(slider).gap);
    // Calculate the total distance to move for one slide (width + gap)
    const totalSlideMovement = slideWidth + gap;

    // Apply the transform to move the slider container
    slider.style.transform = `translateX(-${
      currentIndex * totalSlideMovement
    }px)`;

    // Update the disabled state of the arrow buttons
    prevButton.disabled = currentIndex === 0;
    // Disable the 'next' button if the last visible slide is the last item in the array
    nextButton.disabled = currentIndex >= slides.length - itemsPerScreen;
  }

  // Event listener for the 'previous' button
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  // Event listener for the 'next' button
  nextButton.addEventListener("click", () => {
    if (currentIndex < slides.length - itemsPerScreen) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  // Add an event listener to update the slider when the window is resized
  window.addEventListener("resize", updateSliderPosition);

  // Call the function once on page load to set the initial state
  updateSliderPosition();
}
