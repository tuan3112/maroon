<?php get_header(); ?>

<main>
    <div class="container">
        <?php
        // Start the WordPress loop to get product data
        while ( have_posts() ) : the_post();
        ?>

        <nav class="breadcrumbs" aria-label="Breadcrumb">
            <?php woocommerce_breadcrumb(); ?>
        </nav>

        <section class="product-detail-layout">

            <div class="product-gallery">
                <?php
                /**
                 * Hook: woocommerce_before_single_product_summary.
                 *
                 * @hooked woocommerce_show_product_sale_flash - 10
                 * @hooked woocommerce_show_product_images - 20 (This is the gallery!)
                 */
                do_action( 'woocommerce_before_single_product_summary' );
                ?>
            </div>

            <div class="product-info-details">
                <?php
                /**
                 * Hook: woocommerce_single_product_summary.
                 *
                 * @hooked woocommerce_template_single_title - 5
                 * @hooked woocommerce_template_single_rating - 10
                 * @hooked woocommerce_template_single_price - 10
                 * @hooked woocommerce_template_single_excerpt - 20
                 * @hooked woocommerce_template_single_add_to_cart - 30 (This adds the quantity and button)
                 * @hooked woocommerce_template_single_meta - 40
                 * @hooked woocommerce_template_single_sharing - 50
                 */
                
                // We will call the hooks individually to better match your design
                woocommerce_template_single_title();
                woocommerce_template_single_price();
                woocommerce_template_single_excerpt();
                
                // This function adds both the quantity selector and the "Add to Cart" button
                woocommerce_template_single_add_to_cart(); 
                ?>

                <div class="product-package">
                    <strong>Sản phẩm bao gồm:</strong>
                    <ul>
                        <li>1 x Kính</li>
                        <li>1 x Hộp kính</li>
                        <li>1 x Khăn lau</li>
                        <li>1 x Thẻ bảo hành</li>
                    </ul>
                </div>
                 <div class="action-buttons">
                    <a href="/checkout" class="btn btn-primary btn-buy-now">Mua Ngay</a>
                    <button class="btn btn-tertiary">
                        Đặc quyền mua sản phẩm tại Maroon
                    </button>
                </div>

            </div>
        </section>

        <section class="related-products-section">
            <?php
            /**
             * Hook: woocommerce_after_single_product_summary.
             *
             * @hooked woocommerce_output_product_data_tabs - 10
             * @hooked woocommerce_upsell_display - 15
             * @hooked woocommerce_output_related_products - 20
             */
            woocommerce_output_related_products();
            ?>
        </section>
        
        <?php endwhile; // End of the loop. ?>
    </div>
</main>

<?php get_footer(); ?>