<?php
/**
 * MaroonTheme – Theme bootstrap
 *
 * @package MaroonTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Resolve a cache-busting version from the active theme.
 */
function maroontheme_version(): string {
	$theme = wp_get_theme( get_template() );
	return $theme->get( 'Version' ) ?: '1.0.0';
}

/**
 * Theme setup.
 */
add_action( 'after_setup_theme', function () {

	// i18n
	load_theme_textdomain( 'maroontheme', get_template_directory() . '/languages' );

	// Core supports
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ] );
	add_theme_support( 'responsive-embeds' );

	// Block editor niceties (works fine for classic themes too)
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	// If you add an editor stylesheet later, enqueue via add_editor_style( 'assets/css/editor.css' );

	// WooCommerce
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	// Menus
	register_nav_menus( [
		'primary' => __( 'Primary Menu', 'maroontheme' ),
		'footer'  => __( 'Footer Menu', 'maroontheme' ),
	] );

	// Images – adjust/add as needed
	add_image_size( 'hero-xl', 1920, 1080, true );
	add_image_size( 'card-lg', 960, 640, true );
} );

/**
 * Frontend assets.
 */
add_action( 'wp_enqueue_scripts', function () {
	$ver = maroontheme_version();

	// style.css (required for WP; keep only the header in that file)
	wp_enqueue_style(
		'maroontheme-style',
		get_stylesheet_uri(),
		[],
		$ver
	);

	// Your real CSS (put all custom rules here)
	wp_enqueue_style(
		'maroontheme-main',
		get_template_directory_uri() . '/assets/css/main.css',
		[],
		$ver
	);

	// Your JS (optional; create the file if you don't have it)
	$script_path = get_template_directory() . '/assets/js/app.js';
	if ( file_exists( $script_path ) ) {
		wp_enqueue_script(
			'maroontheme-app',
			get_template_directory_uri() . '/assets/js/app.js',
			[], // add 'jquery' here only if you actually use it
			$ver,
			true
		);

		// Example data you might need in JS:
		wp_localize_script( 'maroontheme-app', 'MAROON', [
			'ajaxUrl' => admin_url( 'admin-ajax.php' ),
			'homeUrl' => home_url( '/' ),
		] );
	}
} );

/**
 * Small quality-of-life tweaks (safe).
 */
// Remove the front-end admin bar for non-admins (optional; comment out if unwanted).
// add_filter( 'show_admin_bar', function( $show ) { return current_user_can( 'manage_options' ) ? $show : false; } );

// Allow SVG if you actually need it (basic mime allow; still sanitize uploads in practice).
// add_filter( 'upload_mimes', function( $mimes ) {
// 	$mimes['svg'] = 'image/svg+xml';
// 	return $mimes;
// } );
