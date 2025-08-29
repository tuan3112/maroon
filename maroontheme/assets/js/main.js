document.addEventListener("DOMContentLoaded", () => {
  // ===================================================================
  // 1. GLOBAL UI (Menu, Search, Contact Widget, Sliders)
  // This section remains the same as your original code.
  // ... (Your existing code for menu, search, contact, sliders, etc.) ...
  // ===================================================================

  const body = document.body;
  const modalOverlay = document.getElementById("modal-overlay");

  // Helper function to open a modal
  function openModal(modal) {
    if (!modal || !modalOverlay) return;
    modalOverlay.classList.add("is-open");
    modal.classList.add("is-open");
    body.style.overflow = "hidden";
  }

  // Helper function to close a modal
  function closeModal(modal) {
    if (!modal || !modalOverlay) return;
    modalOverlay.classList.remove("is-open");
    modal.classList.remove("is-open");
    body.style.overflow = "";
  }
  
  // Close modals when overlay is clicked
  if (modalOverlay) {
      modalOverlay.addEventListener("click", () => {
          document.querySelectorAll(".modal.is-open").forEach(closeModal);
      });
  }

  // ===================================================================
  // 2. WOOCOMMERCE POP-UP INTEGRATION
  // ===================================================================

  // Check if WooCommerce scripts are loaded on the page
  if (typeof jQuery === 'undefined' || typeof wc_add_to_cart_params === 'undefined') {
    return; // Don't run e-commerce JS if WooCommerce isn't active
  }

  const $ = jQuery; // Use jQuery for easier integration with WooCommerce events

  const cartModal = document.getElementById("cart-modal");
  const customerInfoModal = document.getElementById("customer-info-modal");
  const paymentSuccessModal = document.getElementById("payment-success-modal");

  // --- A. Cart Pop-up Logic ---

  // Listen for WooCommerce's "added_to_cart" event
  $(document.body).on('added_to_cart', function(event, fragments, cart_hash, $thisbutton) {
      if (window.innerWidth < 1024) {
          // On mobile, let it redirect to the cart page
          return;
      }

      // On desktop, prevent default behavior and show pop-up
      event.preventDefault();
      updateAndShowCartModal();
  });

  // Also handle clicks on the main header cart icon
  $('.header-actions a.cart-icon').on('click', function(e) {
      if (window.innerWidth < 1024) {
          // On mobile, allow the link to go to the cart page
          return;
      }
      e.preventDefault();
      updateAndShowCartModal();
  });

  // Function to fetch cart content and display the modal
  function updateAndShowCartModal() {
      const data = { action: 'maroon_get_cart_for_modal' };
      
      // Use AJAX to get the current cart HTML from the server
      $.post(wc_add_to_cart_params.ajax_url, data, function(response) {
          cartModal.innerHTML = `
              <div class="modal-content">
                  <div class="modal-header">
                      <h2>Giỏ hàng</h2>
                      <button class="modal-close-btn" onclick="document.getElementById('cart-modal').classList.remove('is-open'); document.getElementById('modal-overlay').classList.remove('is-open'); document.body.style.overflow = '';">&times;</button>
                  </div>
                  <div class="woocommerce">${response}</div>
              </div>`;
          openModal(cartModal);
          
          // Add event listener for the new checkout button inside the modal
          $(cartModal).find('.checkout-button').on('click', function(e) {
              e.preventDefault();
              showCustomerInfoModal();
          });
      });
  }

  // --- B. Customer Info / Checkout Pop-up Logic ---

  function showCustomerInfoModal() {
      // First, close the cart modal
      closeModal(cartModal);

      // Fetch the checkout form using AJAX
      $.ajax({
          url: wc_add_to_cart_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'update_order_review' ),
          type: 'POST',
          data: {
              security: wc_add_to_cart_params.update_order_review_nonce
          },
          success: function( response ) {
              // Now fetch the full checkout page content
              $.get('/checkout/', function(html) {
                  const checkoutFormHtml = $(html).find('#customer_details').prop('outerHTML');
                  const orderReviewHtml = $(html).find('#order_review').prop('outerHTML');

                  customerInfoModal.innerHTML = `
                      <div class="modal-content">
                          <div class="modal-header">
                              <img src="/wp-content/themes/maroontheme/assets/images/icons/icon-logo-maroon.svg" alt="Maroon Icon" style="height: 24px;">
                              <h2>Chốt đê!</h2>
                              <img src="/wp-content/themes/maroontheme/assets/images/icons/harry-face-icon.svg" alt="Harry Face Icon"/>
                              <button class="modal-close-btn" onclick="document.getElementById('customer-info-modal').classList.remove('is-open'); document.getElementById('modal-overlay').classList.remove('is-open'); document.body.style.overflow = '';">&times;</button>
                          </div>
                          <form name="checkout" class="woocommerce-checkout">
                              <div class="col2-set" id="customer_details">
                                  ${checkoutFormHtml}
                              </div>
                              <h3 id="order_review_heading">Đơn hàng của bạn</h3>
                              ${orderReviewHtml}
                          </form>
                      </div>`;
                  openModal(customerInfoModal);
                  $(document.body).trigger('country_to_state_changed');
              });
          }
      });
  }

  // --- C. Payment Success Modal ---
  $(document.body).on('checkout_error', function(){
      // You can add error handling here if needed
  }).on('checkout_place_order_success', function() {
      // This event isn't standard, we trigger it after successful submission
      closeModal(customerInfoModal);
      paymentSuccessModal.innerHTML = `
          <div class="modal-content page-centered-message">
               <button class="modal-close-btn" style="position:absolute; top:1rem; right:1rem;" onclick="location.href='/';">&times;</button>
               <div class="success-icon"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
              <h1>Cảm ơn bạn!</h1><p>Maroon sẽ liên hệ với bạn để xác nhận đơn hàng.</p>
              <a href="/" class="btn btn-primary">Quay Lại Trang Chủ</a>
          </div>`;
      openModal(paymentSuccessModal);
  });
});

document.addEventListener("DOMContentLoaded", () => {
    // --- Your existing code for menu, sliders, pop-ups, etc. goes here ---
    // ...
    
    // ===================================================================
    //  AJAX PRODUCT FILTER LOGIC (Add this entire section)
    // ===================================================================
    const filterSidebar = document.getElementById("filter-sidebar");
    
    // Only run this filter code on pages that actually have the filter sidebar
    if (filterSidebar) { 
        const filterToggleBtn = document.querySelector(".filter-toggle-btn");
        const closeFilterBtn = document.querySelector(".close-filter-btn");
        const filterOverlay = document.querySelector(".filter-overlay");
        const applyFiltersBtn = document.getElementById("apply-filters");
        const clearFiltersBtn = document.getElementById("clear-filters");
        const productGrid = document.getElementById("product-grid-main");

        // Function to open/close the filter panel
        const toggleFilterPanel = () => {
            const isMobile = window.innerWidth < 1024;
            document.body.classList.toggle(isMobile ? "filter-open-mobile" : "filter-open-desktop");
        };
        
        filterToggleBtn.addEventListener("click", toggleFilterPanel);
        closeFilterBtn.addEventListener("click", toggleFilterPanel);
        filterOverlay.addEventListener("click", toggleFilterPanel);

        // Main function to perform the AJAX request
        const performAjaxFilter = () => {
            // Get all checked values
            const selectedShapes = Array.from(document.querySelectorAll('input[name="shape"]:checked')).map(el => el.value);
            const selectedMaterials = Array.from(document.querySelectorAll('input[name="material"]:checked')).map(el => el.value);
            const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(el => el.value);
            
            // Show a loading animation by reducing opacity
            if(productGrid) {
                productGrid.style.opacity = '0.5';
            }

            // Use jQuery to send the AJAX request to WordPress
            jQuery.ajax({
                url: maroon_ajax.ajax_url, // This URL is provided by functions.php
                type: 'post',
                data: {
                    action: 'maroon_filter_products', // This matches the action in functions.php
                    shape: selectedShapes,
                    material: selectedMaterials,
                    price: selectedPrices
                },
                success: function(response) {
                    // Replace the product grid with the new HTML from the server
                    if(productGrid) {
                        productGrid.innerHTML = response;
                        productGrid.style.opacity = '1';
                    }
                    // Close the filter panel after applying
                    if (document.body.classList.contains('filter-open-mobile') || document.body.classList.contains('filter-open-desktop')) {
                        toggleFilterPanel();
                    }
                },
                error: function() {
                    if(productGrid) {
                        productGrid.innerHTML = '<p>Something went wrong. Please try again.</p>';
                        productGrid.style.opacity = '1';
                    }
                }
            });
        };

        applyFiltersBtn.addEventListener("click", performAjaxFilter);

        clearFiltersBtn.addEventListener("click", () => {
            // Uncheck all boxes and run the filter again to show all products
            document.querySelectorAll('.filter-content input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
            performAjaxFilter();
        });
    }

    // --- End of the file or the DOMContentLoaded listener ---
});