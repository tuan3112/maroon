<footer class="site-footer">
      <div class="container footer-container">
        <div class="footer-about">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer-logo">
            <img
              src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/maroon-logo-footer.svg"
              alt="Maroon Logo"
              loading="lazy"
            />
          </a>
          <div class="footer-socials">
            <a href="#" aria-label="Instagram"
              ><img
                src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/instagram-icon.svg"
                alt="Instagram"
            /></a>
            <a href="#" aria-label="Shopee"
              ><img src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/shopee-icon.svg" alt="Shopee"
            /></a>
            <a href="#" aria-label="Facebook"
              ><img src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/facebook-icon.svg" alt="Facebook"
            /></a>
          </div>
        </div>
        <nav class="footer-nav" aria-label="Footer navigation">
          <?php
            wp_nav_menu( array(
              'theme_location' => 'footer-menu',
              'container' => false,
              'items_wrap' => '<ul>%3$s</ul>',
            ) );
          ?>
        </nav>
        <div class="footer-contact">
          <h4>THÔNG TIN LIÊN HỆ</h4>
          <ul>
            <li><a href="tel:0347125600">034 712 5600</a></li>
            <li>
              <a href="mailto:kinhmatmaroon@gmail.com"
                >kinhmatmaroon@gmail.com</a
              >
            </li>
          </ul>
        </div>
      </div>
    </footer>
    <div class="modal-overlay" id="modal-overlay"></div>
    <div class="modal" id="customer-info-modal"></div>
    <div class="modal" id="payment-success-modal"></div>
    <div class="modal" id="cart-modal"></div>
    <div id="toast-notification" class="toast-notification"></div>
    <?php wp_footer(); ?>
</body>
</html>