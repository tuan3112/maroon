<?php
function maroontheme_enqueue_scripts() {
    // Enqueue Main Stylesheet
    wp_enqueue_style( 'maroon-main-style', get_stylesheet_uri() );

    // Enqueue Main JavaScript. The `true` at the end loads it in the footer.
    wp_enqueue_script( 'maroon-main-js', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'maroontheme_enqueue_scripts' );

// Add support for Menus
function register_my_menus() {
  register_nav_menus(
    array(
      'main-menu' => __( 'Main Menu' ),
      'footer-menu' => __( 'Footer Menu' )
    )
  );
}
add_action( 'init', 'register_my_menus' );
?>
/**
 * Ensure cart contents are available on all pages for pop-up modals.
 */
function maroon_header_add_to_cart_fragment( $fragments ) {
    ob_start();
    ?>
    <span class="cart-count"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
    <?php
    $fragments['span.cart-count'] = ob_get_clean();
    return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'maroon_header_add_to_cart_fragment' );

/**
 * AJAX handler to get cart contents for the modal.
 */
function maroon_get_cart_for_modal() {
    echo wc_get_template_part( 'cart/cart' );
    wp_die();
}
add_action( 'wp_ajax_maroon_get_cart_for_modal', 'maroon_get_cart_for_modal' );
add_action( 'wp_ajax_nopriv_maroon_get_cart_for_modal', 'maroon_get_cart_for_modal' );