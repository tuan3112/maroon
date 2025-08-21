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