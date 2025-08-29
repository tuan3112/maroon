<?php
/*
Template Name: Products Page
*/
get_header(); ?>

<main class="page-products">
    <div class="content-wrap">
        <div class="container">
            <nav class="breadcrumbs" aria-label="Breadcrumb">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Trang chủ</a>
                <span>/</span>
                <span>Sản phẩm</span>
            </nav>

            <h1 class="page-title"><?php the_title(); ?></h1>

            <div class="product-toolbar">
                <button class="filter-toggle-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                    <span>Bộ lọc</span>
                </button>
                <p class="results-count">Hiển thị <?php echo $wp_query->found_posts; ?> kết quả</p>
                <div class="sort-by-container">
                    <?php woocommerce_catalog_ordering(); ?>
                </div>
            </div>

            <div id="product-grid-main" class="product-grid-main">
                <?php
                $args = array(
                    'post_type' => 'product',
                    'posts_per_page' => 12, // Show 12 products per page
                );
                $loop = new WP_Query( $args );
                if ( $loop->have_posts() ) {
                    while ( $loop->have_posts() ) : $loop->the_post();
                        global $product;
                ?>
                    <article class="product-card">
                        <a href="<?php echo get_permalink(); ?>" class="product-card-link" aria-label="View details for <?php the_title(); ?>">
                            <div class="product-image-container">
                                <?php if (has_post_thumbnail()) {
                                    the_post_thumbnail('full', array('alt' => get_the_title(), 'loading' => 'lazy'));
                                } else {
                                    // Placeholder image if no product image is set
                                    echo '<img src="' . wc_placeholder_img_src() . '" alt="Awaiting product image">';
                                } ?>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name"><?php the_title(); ?></h3>
                                <div class="product-meta">
                                    <span class="product-price"><?php echo $product->get_price_html(); ?></span>
                                    <span class="product-detail-link">Chi tiết</span>
                                </div>
                            </div>
                        </a>
                    </article>
                <?php
                    endwhile;
                } else {
                    echo __( 'No products found' );
                }
                wp_reset_postdata();
                ?>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>