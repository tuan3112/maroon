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
      // This is the fix: toggle both classes on the correct elements
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
});