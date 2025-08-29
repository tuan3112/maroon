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

/**
 * AJAX Filter Products Handler
 */
function maroon_filter_products_handler() {
    $args = array(
        'post_type' => 'product',
        'posts_per_page' => 12,
        'tax_query' => array('relation' => 'AND'), // Ensure all conditions are met
        'meta_query' => array() // For price filtering
    );

    // Shape Filtering
    if ( isset($_POST['shape']) && !empty($_POST['shape']) ) {
        $args['tax_query'][] = array(
            'taxonomy' => 'pa_dang-kinh',
            'field'    => 'slug',
            'terms'    => $_POST['shape'],
            'operator' => 'IN',
        );
    }

    // Material Filtering
    if ( isset($_POST['material']) && !empty($_POST['material']) ) {
        $args['tax_query'][] = array(
            'taxonomy' => 'pa_chat-lieu',
            'field'    => 'slug',
            'terms'    => $_POST['material'],
            'operator' => 'IN',
        );
    }

    // Price Filtering
    if ( isset($_POST['price']) && !empty($_POST['price']) ) {
        $price_ranges = $_POST['price'];
        $price_meta_query = array('relation' => 'OR'); // A product can be in one of the selected ranges

        foreach($price_ranges as $range) {
            $range_values = explode('-', $range);
            $price_meta_query[] = array(
                'key' => '_price',
                'value' => array( (int)$range_values[0], (int)$range_values[1] ),
                'compare' => 'BETWEEN',
                'type' => 'NUMERIC'
            );
        }
        $args['meta_query'][] = $price_meta_query;
    }

    $loop = new WP_Query( $args );

    if ( $loop->have_posts() ) {
        while ( $loop->have_posts() ) : $loop->the_post();
            wc_get_template_part( 'content', 'product' );
        endwhile;
    } else {
        echo '<p class="woocommerce-info">Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.</p>';
    }

    wp_die(); // This is required to terminate immediately and return a proper response
}
add_action('wp_ajax_maroon_filter_products', 'maroon_filter_products_handler');
add_action('wp_ajax_nopriv_maroon_filter_products', 'maroon_filter_products_handler');

/**
 * Localize script to pass AJAX URL to main.js
 */
function maroon_localize_scripts() {
    wp_localize_script('maroon-main-js', 'maroon_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php')
    ));
}
add_action('wp_enqueue_scripts', 'maroon_localize_scripts');