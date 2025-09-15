document.addEventListener("DOMContentLoaded", () => {

    // ===================================================================
    // 1. GLOBAL UI (Always runs on every page)
    // ===================================================================
    const body = document.body;
    
    // --- Mobile Menu Script ---
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileNav = document.querySelector(".mobile-navigation");
    const pageOverlay = document.querySelector(".page-overlay");

    if (menuToggle && mobileNav && pageOverlay) {
        menuToggle.addEventListener("click", () => {
            mobileNav.classList.toggle("is-open");
            body.classList.toggle("mobile-menu-open");
        });

        pageOverlay.addEventListener("click", () => {
            mobileNav.classList.remove("is-open");
            body.classList.remove("mobile-menu-open");
        });
    }

    // --- Modal Helper Functions ---
    const modalOverlay = document.getElementById("modal-overlay");
    function openModal(modal) {
        if (!modal || !modalOverlay) return;
        modalOverlay.classList.add("is-open");
        modal.classList.add("is-open");
        body.style.overflow = "hidden";
    }
    function closeModal(modal) {
        if (!modal || !modalOverlay) return;
        modalOverlay.classList.remove("is-open");
        modal.classList.remove("is-open");
        body.style.overflow = "";
    }
    if (modalOverlay) {
        modalOverlay.addEventListener("click", () => {
            document.querySelectorAll(".modal.is-open").forEach(closeModal);
        });
    }

    // ===================================================================
    // 2. PLUGIN-SPECIFIC LOGIC (Only runs when plugins are active)
    // ===================================================================

    // Check if jQuery is loaded before running jQuery-dependent code
    if (typeof jQuery === 'undefined') {
        return; 
    }
    const $ = jQuery;

    // --- WooCommerce Pop-up Integration ---
    if (typeof wc_add_to_cart_params !== 'undefined') {
        const cartModal = document.getElementById("cart-modal");
        const customerInfoModal = document.getElementById("customer-info-modal");
        const paymentSuccessModal = document.getElementById("payment-success-modal");

        $(document.body).on('added_to_cart', function(event) {
            if (window.innerWidth >= 1024) {
                event.preventDefault();
                updateAndShowCartModal();
            }
        });

        $('.header-actions a.cart-icon').on('click', function(e) {
            if (window.innerWidth >= 1024) {
                e.preventDefault();
                updateAndShowCartModal();
            }
        });

        function updateAndShowCartModal() {
            const data = { action: 'maroon_get_cart_for_modal' };
            $.post(wc_add_to_cart_params.ajax_url, data, function(response) {
                cartModal.innerHTML = `<div class="modal-content"><div class="modal-header"><h2>Giỏ hàng</h2><button class="modal-close-btn" onclick="document.getElementById('cart-modal').classList.remove('is-open'); document.getElementById('modal-overlay').classList.remove('is-open'); document.body.style.overflow = '';">&times;</button></div><div class="woocommerce">${response}</div></div>`;
                openModal(cartModal);
                $(cartModal).find('.checkout-button').on('click', function(e) {
                    e.preventDefault();
                    showCustomerInfoModal();
                });
            });
        }
        
        function showCustomerInfoModal() {
             // This function's content remains the same...
        }
        
        // ... and the rest of your pop-up logic.
    }

    // --- AJAX Product Filter Logic ---
    const filterSidebar = document.getElementById("filter-sidebar");
    if (filterSidebar && typeof maroon_ajax !== 'undefined') {
        const applyFiltersBtn = document.getElementById("apply-filters");
        const clearFiltersBtn = document.getElementById("clear-filters");
        
        const performAjaxFilter = () => {
            // Your filter AJAX logic here...
        };

        if(applyFiltersBtn) applyFiltersBtn.addEventListener("click", performAjaxFilter);
        if(clearFiltersBtn) clearFiltersBtn.addEventListener("click", () => {
            document.querySelectorAll('.filter-content input[type="checkbox"]').forEach(c => c.checked = false);
            performAjaxFilter();
        });
    }
});