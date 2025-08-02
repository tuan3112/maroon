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
        contactCloseButton.addEventListener("click", () => contactWidget.classList.remove("is-open"));
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
        productContainer.addEventListener("touchstart", startDragging, { passive: true });
        productContainer.addEventListener("touchend", stopDragging);
        productContainer.addEventListener("touchmove", whileDragging, { passive: false });
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
                this.slides.forEach(slide => {
                    slide.style.width = `${100 / this.slideCount}%`;
                    slide.style.flexShrink = '0'; // Ensure slides don't shrink
                });

                if (this.paginationContainer) {
                    this.paginationContainer.innerHTML = '';
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
                this.slidesContainer.removeAttribute('style');
                this.slides.forEach(slide => slide.removeAttribute('style'));
                if (this.paginationContainer) this.paginationContainer.innerHTML = '';
                // Remove event listeners if they were added in a more complex setup
            },

            showSlide(n) {
                this.slidesContainer.style.transition = "transform 0.5s ease-in-out";
                this.currentSlide = n;
                const offset = -this.currentSlide * this.slides[0].offsetWidth;
                this.slidesContainer.style.transform = `translateX(${offset}px)`;
                this.prevTranslate = offset;

                if (this.dots.length > 0) {
                    this.dots.forEach(dot => dot.classList.remove("active"));
                    if (this.dots[n]) this.dots[n].classList.add("active");
                }
            },

            startAutoplay() {
                if (!this.config.autoplay) return;
                this.slideInterval = setInterval(() => this.showSlide((this.currentSlide + 1) % this.slideCount), this.config.autoplayDelay);
            },
            
            stopAutoplay() { clearInterval(this.slideInterval); },

            resetAutoplay() {
                this.stopAutoplay();
                this.startAutoplay();
            },

            addEventListeners() {
                // Simplified for brevity, drag logic can be added back if needed
            }
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
        if (isMobile && !sliderInstances['.blog-section']) {
            initializeSlider('.blog-section', { slidesSelector: ".blog-post-card", autoplay: false });
        } else if (!isMobile && sliderInstances['.blog-section']) {
            sliderInstances['.blog-section'].destroy();
            delete sliderInstances['.blog-section'];
        }

        // --- Hero Slider (always active, but needs recalculation) ---
        if (sliderInstances['.hero-slider']) {
            sliderInstances['.hero-slider'].showSlide(sliderInstances['.hero-slider'].currentSlide);
        }
    }

    // Initial setup
    initializeSlider('.hero-slider');
    manageSlidersOnResize();

    // Add resize listener
    window.addEventListener('resize', manageSlidersOnResize);
});