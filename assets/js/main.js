document.addEventListener("DOMContentLoaded", () => {
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
  const searchToggles = document.querySelectorAll(".search-toggle"); // Can be multiple buttons
  const searchOverlay = document.querySelector(".search-overlay");
  const closeSearchBtn = document.querySelector(".close-search");

  if (searchToggles.length > 0 && searchOverlay) {
    searchToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        searchOverlay.classList.add("is-open");
        // When the overlay opens, focus the input field
        searchOverlay.querySelector("input").focus();
      });
    });

    closeSearchBtn.addEventListener("click", () => {
      searchOverlay.classList.remove("is-open");
    });

    // Also close search overlay with the Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchOverlay.classList.contains("is-open")) {
        searchOverlay.classList.remove("is-open");
      }
    });
  }
});
// --- HERO SLIDER ---
const slider = document.querySelector(".hero-slider");

if (slider) {
  const slidesContainer = slider.querySelector(".slides-container");
  const slides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".dot");
  const slideCount = slides.length;
  let currentSlide = 0;
  let slideInterval;

  // --- Drag and Swipe Variables ---
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  const showSlide = (n) => {
    // --- FIX: Faster animation ---
    slidesContainer.style.transition = "transform 0.5s ease-in-out";

    // Calculate the new position for the slide container
    const offset = -n * (100 / slideCount);
    slidesContainer.style.transform = `translateX(${offset}%)`;

    // Update the active class on dots
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[n].classList.add("active");

    currentSlide = n;
  };

  const nextSlide = () => {
    let newSlide = (currentSlide + 1) % slideCount;
    showSlide(newSlide);
  };

  const previousSlide = () => {
    let newSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(newSlide);
  };

  const startSlideShow = () => {
    // Clear any existing interval to prevent duplicates
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  };

  const stopSlideShow = () => {
    clearInterval(slideInterval);
  };

  // Click event for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Pause on hover
  slider.addEventListener("mouseenter", stopSlideShow);
  slider.addEventListener("mouseleave", startSlideShow);

  // --- Drag and Swipe Event Listeners ---
  slides.forEach((slide, index) => {
    // Add listeners for both mouse and touch events
    slide.addEventListener("mousedown", dragStart(index));
    slide.addEventListener("touchstart", dragStart(index));

    slide.addEventListener("mouseup", dragEnd);
    slide.addEventListener("touchend", dragEnd);

    slide.addEventListener("mouseleave", dragEnd);
    slide.addEventListener("mousemove", drag);
    slide.addEventListener("touchmove", drag);
  });

  function getPositionX(event) {
    // Prevent default drag behavior on images
    event.preventDefault();
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }

  function dragStart(index) {
    return function (event) {
      isDragging = true;
      startPos = getPositionX(event);
      // Disable smooth transition for real-time dragging
      slidesContainer.style.transition = "none";
      stopSlideShow(); // Stop auto-slide while dragging

      // For animation frame logic
      animationID = requestAnimationFrame(animation);
    };
  }

  function drag(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      // Calculate movement and apply it
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  function animation() {
    if (isDragging) {
      const slideWidth = slides[0].getBoundingClientRect().width;
      let offset =
        -currentSlide * slideWidth + (currentTranslate - prevTranslate);

      // --- FIX: Constrain dragging at the edges ---
      // Prevent dragging right on the first slide
      if (currentSlide === 0 && offset > 0) {
        offset = 0;
      }
      // Prevent dragging left on the last slide
      const maxOffset = -(slideCount - 1) * slideWidth;
      if (currentSlide === slideCount - 1 && offset < maxOffset) {
        offset = maxOffset;
      }

      slidesContainer.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(animation);
    }
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;

    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    // Determine if drag was enough to change slide
    // Threshold is now 50px for a more responsive feel
    if (movedBy < -50 && currentSlide < slideCount - 1) {
      nextSlide();
    } else if (movedBy > 50 && currentSlide > 0) {
      previousSlide();
    } else {
      // Snap back to the current slide if drag was not enough
      showSlide(currentSlide);
    }

    // Reset translate values and restart slideshow
    currentTranslate = 0;
    prevTranslate = 0;
    startSlideShow();
  }

  // Initialize the slider at the first slide
  showSlide(0);
  // Start the slideshow
  startSlideShow();
}

// Add this inside your DOMContentLoaded event listener, after the other code

// --- PRODUCT SLIDER DRAG/SWIPE ---
const productContainer = document.querySelector(".product-container");

if (productContainer) {
  let isDown = false;
  let startX;
  let scrollLeft;

  productContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    productContainer.classList.add("is-dragging");
    startX = e.pageX - productContainer.offsetLeft;
    scrollLeft = productContainer.scrollLeft;
  });

  productContainer.addEventListener("mouseleave", () => {
    isDown = false;
    productContainer.classList.remove("is-dragging");
  });

  productContainer.addEventListener("mouseup", () => {
    isDown = false;
    productContainer.classList.remove("is-dragging");
  });

  productContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - productContainer.offsetLeft;
    const walk = (x - startX) * 2; // The multiplier makes the scroll faster
    productContainer.scrollLeft = scrollLeft - walk;
  });

  // --- Touch support for mobile devices ---
  productContainer.addEventListener(
    "touchstart",
    (e) => {
      isDown = true;
      startX = e.touches[0].pageX - productContainer.offsetLeft;
      scrollLeft = productContainer.scrollLeft;
    },
    { passive: true }
  ); // Use passive for better scroll performance

  productContainer.addEventListener("touchend", () => {
    isDown = false;
  });

  productContainer.addEventListener(
    "touchmove",
    (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - productContainer.offsetLeft;
      const walk = (x - startX) * 2;
      productContainer.scrollLeft = scrollLeft - walk;
    },
    { passive: true }
  );
}
