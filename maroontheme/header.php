<?php
/**
 * Header template
 * Theme: Maroon
 * @package maroon
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#main-content">
  <?php esc_html_e( 'Skip to content', 'maroon' ); ?>
</a>

<header class="site-header" role="banner">
  <div class="container header-top-container">

    <!-- 1) MOBILE MENU BUTTON (required by main.js + main.css) -->
    <button class="mobile-menu-toggle"
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded="false"
            aria-label="<?php esc_attr_e( 'Open menu', 'maroon' ); ?>">
      <span></span><span></span><span></span>
    </button>

    <!-- 2) LOGO -->
    <div class="logo">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
        <?php
        if ( has_custom_logo() ) {
          the_custom_logo();
        } else {
          bloginfo( 'name' );
        }
        ?>
      </a>
    </div>

    <!-- 3) HEADER ACTIONS (search toggle + cart optional) -->
    <div class="header-actions">
      <button class="search-toggle"
              type="button"
              aria-controls="site-search"
              aria-expanded="false"
              aria-label="<?php esc_attr_e( 'Open search', 'maroon' ); ?>">
        <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/icons/maroon-search.svg' ); ?>"
             alt="<?php esc_attr_e( 'Search', 'maroon' ); ?>">
      </button>

      <?php if ( class_exists( 'WooCommerce' ) ) : ?>
        <a class="cart-icon" href="<?php echo esc_url( wc_get_cart_url() ); ?>" aria-label="<?php esc_attr_e( 'View cart', 'maroon' ); ?>">
          <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/icons/maroon-cart.svg' ); ?>"
               alt="<?php esc_attr_e( 'Cart', 'maroon' ); ?>">
          <span class="cart-count"><?php echo WC()->cart ? absint( WC()->cart->get_cart_contents_count() ) : 0; ?></span>
        </a>
      <?php endif; ?>
    </div>
  </div>

  <!-- DESKTOP NAVIGATION (optional styling hook: .main-navigation-desktop) -->
  <div class="header-bottom">
    <nav class="main-navigation-desktop" role="navigation" aria-label="<?php esc_attr_e( 'Primary menu', 'maroon' ); ?>">
      <?php
      wp_nav_menu( [
        'theme_location' => 'primary',
        'container'      => false,
        'menu_class'     => '',
        'fallback_cb'    => '__return_empty_string', // keep markup clean if no menu set
        'depth'          => 2,
      ] );
      ?>
    </nav>
  </div>
</header>

<!-- 4) MOBILE NAVIGATION (required by main.js + main.css) -->
<!-- MOBILE NAVIGATION -->
<nav id="mobile-navigation" class="mobile-navigation" role="navigation" aria-label="<?php esc_attr_e('Mobile menu','maroon'); ?>" aria-hidden="true">

  <!-- Links -->
  <ul class="mobile-nav-links">
    <?php
    wp_nav_menu([
      'theme_location' => 'primary',
      'container'      => false,
      'items_wrap'     => '%3$s', // only <li> items
      'fallback_cb'    => '__return_empty_string',
      'depth'          => 2,
    ]);
    ?>
  </ul>

  <!-- Footer pinned to bottom -->
  <div class="mobile-nav-footer">
    <div class="mobile-brand">
      <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/icons/maroon-logo-footer.svg' ); ?>" alt="<?php esc_attr_e('Maroon','maroon'); ?>">
    </div>
    <div class="mobile-socials">
      <a href="#" aria-label="Instagram">
        <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/icons/instagram-icon.svg' ); ?>" alt="">
      </a>
      <a href="#" aria-label="Shopee">
        <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/icons/shopee-icon.svg' ); ?>" alt="">
      </a>
      <a href="#" aria-label="Facebook">
        <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/icons/facebook-icon.svg' ); ?>" alt="">
      </a>
    </div>
  </div>
</nav>

<!-- 5) PAGE OVERLAY (required for click-to-close and z-index stack) -->
<div class="page-overlay" aria-hidden="true"></div>

<!-- 6) SEARCH OVERLAY (matches your JS hooks/classes) -->
<div class="search-overlay" id="site-search" aria-hidden="true">
  <button class="close-search" type="button" aria-label="<?php esc_attr_e( 'Close search', 'maroon' ); ?>">
    <!-- Simple ×; replace with SVG if you prefer -->
    <span aria-hidden="true" style="font-size:32px;line-height:1">×</span>
  </button>

  <form class="search-overlay-form" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label class="screen-reader-text" for="s"><?php esc_html_e( 'Search for:', 'maroon' ); ?></label>
    <input id="s" type="search" name="s" placeholder="<?php esc_attr_e( 'Search…', 'maroon' ); ?>">
    <button type="submit"><?php esc_html_e( 'Search', 'maroon' ); ?></button>
  </form>
</div>

<!-- Main content landmark -->
<main id="main-content" class="site-main" role="main">
