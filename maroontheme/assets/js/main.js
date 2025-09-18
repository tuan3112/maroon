document.addEventListener("DOMContentLoaded", () => {
  /**
   * ===================================================================
   * 1. GLOBAL UI & WIDGETS (Runs on all pages)
   * ===================================================================
   */
  const body = document.body;

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-navigation");
  const pageOverlay = document.querySelector(".page-overlay");

  if (menuToggle && mobileNav && pageOverlay) {
    const toggleMenu = () => {
      body.classList.toggle("mobile-menu-open");
      mobileNav.classList.toggle("is-open");
    };

    menuToggle.addEventListener("click", toggleMenu);
    pageOverlay.addEventListener("click", toggleMenu);
  }

  // --- Search Overlay Toggle ---
  const searchToggles = document.querySelectorAll(".search-toggle");
  const searchOverlay = document.querySelector(".search-overlay");
  const closeSearchBtn = document.querySelector(".close-search");

  if (searchToggles.length > 0 && searchOverlay && closeSearchBtn) {
    searchToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        searchOverlay.classList.add("is-open");
        const searchInput = searchOverlay.querySelector("input");
        if (searchInput) {
          searchInput.focus();
        }
      });
    });
    closeSearchBtn.addEventListener("click", () => {
      searchOverlay.classList.remove("is-open");
    });
  }

  // --- Contact Widget Logic ---
  const contactWidget = document.querySelector(".contact-widget-container");
  if (contactWidget) {
    const contactToggleButton = contactWidget.querySelector(
      ".contact-toggle-button"
    );
    const contactCloseButton = contactWidget.querySelector(
      "#contact-close-button"
    );

    if (contactToggleButton) {
      contactToggleButton.addEventListener("click", (e) => {
        e.stopPropagation();
        contactWidget.classList.add("is-open");
      });
    }
    if (contactCloseButton) {
      contactCloseButton.addEventListener("click", () =>
        contactWidget.classList.remove("is-open")
      );
    }
  }

  /**
   * ===================================================================
   * 2. WOOCOMMERCE & FILTERING LOGIC (jQuery Dependent)
   * ===================================================================
   */

  if (typeof jQuery === "undefined") {
    return;
  }

  const $ = jQuery;

  // --- AJAX Product Filter Logic ---
  const filterSidebar = document.getElementById("filter-sidebar");
  if (filterSidebar && typeof maroon_ajax !== "undefined") {
    const productGrid = document.getElementById("product-grid-main");
    const applyFiltersBtn = document.getElementById("apply-filters");
    const clearFiltersBtn = document.getElementById("clear-filters");

    const performAjaxFilter = () => {
      if (!productGrid) return;

      const selectedShapes = Array.from(
        document.querySelectorAll('input[name="shape"]:checked')
      ).map((el) => el.value);
      const selectedMaterials = Array.from(
        document.querySelectorAll('input[name="material"]:checked')
      ).map((el) => el.value);
      const selectedPrices = Array.from(
        document.querySelectorAll('input[name="price"]:checked')
      ).map((el) => el.value);

      productGrid.style.opacity = "0.5";

      $.ajax({
        url: maroon_ajax.ajax_url,
        type: "post",
        data: {
          action: "maroon_filter_products",
          shape: selectedShapes,
          material: selectedMaterials,
          price: selectedPrices,
        },
        success: function (response) {
          productGrid.innerHTML = response;
          productGrid.style.opacity = "1";
        },
        error: function () {
          productGrid.innerHTML = "<p>An error occurred. Please try again.</p>";
          productGrid.style.opacity = "1";
        },
      });
    };

    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener("click", performAjaxFilter);
    }

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        const checkboxes = filterSidebar.querySelectorAll(
          'input[type="checkbox"]'
        );
        if (checkboxes.length) {
          checkboxes.forEach((checkbox) => (checkbox.checked = false));
        }
        performAjaxFilter();
      });
    }
  }
});

// Toggle the visibility of the contact options
document.addEventListener("DOMContentLoaded", function () {
  const contactButton = document.querySelector(".contact-toggle-button");
  const contactWidget = document.querySelector(".contact-widget-container");
  const contactOptions = contactWidget.querySelector(".contact-options");

  if (contactButton && contactOptions) {
    contactButton.addEventListener("click", function () {
      contactWidget.classList.toggle("is-open");
    });
  }
});
