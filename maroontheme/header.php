<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title( '|', true, 'right' ); ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <header class="site-header">
      <div class="header-top">
        <div class="container header-top-container">
          <button
            class="mobile-menu-toggle"
            aria-label="Mở menu"
            aria-expanded="false"
            aria-controls="main-navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/maroon-logo.svg" alt="Maroon Logo" />
          </a>

          <div class="header-actions">
            <a href="/cart" class="cart-icon" aria-label="Giỏ hàng">
              <img src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/maroon-cart.svg" alt="Cart Icon" />
              <span class="cart-count">0</span>
            </a>
            <button
              class="search-toggle"
              aria-label="Mở tìm kiếm"
              aria-controls="search-overlay"
            >
              <img
                src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/maroon-search.svg"
                alt="Search Icon"
              />
            </button>
          </div>
        </div>
      </div>

      <div class="header-bottom">
        <nav class="main-navigation-desktop" aria-label="Main navigation">
          <?php
            wp_nav_menu( array(
              'theme_location' => 'main-menu',
              'container' => false,
              'items_wrap' => '<ul>%3$s</ul>',
            ) );
          ?>
        </nav>
      </div>
    </header>

    <nav
      class="mobile-navigation"
      id="main-navigation"
      aria-label="Mobile navigation"
    >
        <div class="mobile-nav-header">
            <a href="/cart" class="cart-icon" aria-label="Giỏ hàng">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/maroon-cart.svg" alt="Cart Icon" />
                <span class="cart-count">0</span>
            </a>
            <button class="search-toggle" aria-label="Mở tìm kiếm" aria-controls="search-overlay">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/maroon-search.svg" alt="Search Icon" />
            </button>
        </div>

        <?php
            wp_nav_menu( array(
                'theme_location' => 'main-menu',
                'container' => false,
                'menu_class' => 'mobile-nav-links',
            ) );
        ?>

        <div class="mobile-nav-footer">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="mobile-nav-logo">
            <img
                src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/maroon-logo-footer.svg"
                alt="Maroon Logo"
            />
            </a>
            <div class="mobile-nav-socials">
            <a href="#" aria-label="Instagram"
                ><img src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/instagram-icon.svg" alt="Instagram"
            /></a>
            <a href="#" aria-label="Shopee"
                ><img src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/shopee-icon.svg" alt="Shopee"
            /></a>
            <a href="#" aria-label="Facebook"
                ><img src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/facebook-icon.svg" alt="Facebook"
            /></a>
            </div>
        </div>
    </nav>