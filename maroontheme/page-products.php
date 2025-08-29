<?php
/*
Template Name: Products Page
*/
get_header(); ?>

<main class="page-products">
    <div class="content-wrap">
        <div class="container">
            <nav class="breadcrumbs" aria-label="Breadcrumb">
                <?php woocommerce_breadcrumb(); ?>
            </nav>

            <h1 class="page-title"><?php the_title(); ?></h1>

            <div class="product-toolbar">
                <button class="filter-toggle-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                    <span>Bộ lọc</span>
                </button>
                <div class="results-count">
                    <?php woocommerce_result_count(); ?>
                </div>
                <div class="sort-by-container">
                    <?php woocommerce_catalog_ordering(); ?>
                </div>
            </div>

            <div id="product-grid-main" class="product-grid-main">
                <?php
                $args = array(
                    'post_type' => 'product',
                    'posts_per_page' => 12,
                );
                $loop = new WP_Query( $args );
                if ( $loop->have_posts() ) {
                    while ( $loop->have_posts() ) : $loop->the_post();
                        wc_get_template_part( 'content', 'product' );
                    endwhile;
                } else {
                    echo __( 'No products found' );
                }
                wp_reset_postdata();
                ?>
            </div>
             <nav class="pagination">
                <?php woocommerce_pagination(); ?>
            </nav>
        </div>
    </div>
</main>

<aside class="filter-sidebar" id="filter-sidebar">
    <div class="filter-header">
        <h2>Bộ Lọc</h2>
        <button class="close-filter-btn" aria-label="Đóng bộ lọc">&times;</button>
    </div>
    <div class="filter-content">
        <?php
        $shape_terms = get_terms( array('taxonomy' => 'pa_dang-kinh', 'hide_empty' => false) );
        if ( ! empty( $shape_terms ) && ! is_wp_error( $shape_terms ) ) {
            echo '<div class="filter-group"><h3>Dáng Kính</h3>';
            foreach ( $shape_terms as $term ) {
                echo '<label><input type="checkbox" name="shape" value="' . esc_attr( $term->slug ) . '"> ' . esc_html( $term->name ) . '</label>';
            }
            echo '</div>';
        }

        $material_terms = get_terms( array('taxonomy' => 'pa_chat-lieu', 'hide_empty' => false) );
        if ( ! empty( $material_terms ) && ! is_wp_error( $material_terms ) ) {
            echo '<div class="filter-group"><h3>Chất liệu</h3>';
            foreach ( $material_terms as $term ) {
                echo '<label><input type="checkbox" name="material" value="' . esc_attr( $term->slug ) . '"> ' . esc_html( $term->name ) . '</label>';
            }
            echo '</div>';
        }
        ?>
        <div class="filter-group">
            <h3>Giá</h3>
            <label><input type="checkbox" name="price" value="0-200000"> Dưới 200k</label>
            <label><input type="checkbox" name="price" value="200000-300000"> 200k - 300k</label>
            <label><input type="checkbox" name="price" value="300001-9999999"> Trên 300k</label>
        </div>
    </div>
    <div class="filter-footer">
        <button class="btn btn-primary" id="apply-filters">Áp dụng</button>
        <button class="btn btn-secondary" id="clear-filters">Xóa bộ lọc</button>
    </div>
</aside>
<div class="filter-overlay"></div>


<?php get_footer(); ?>