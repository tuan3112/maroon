<?php get_header(); ?>

<main>
      <section class="hero-slider" aria-label="Featured content">
    <?php 
    // Replace the shortcode below with the one you copied from MetaSlider
    echo do_shortcode('[metaslider id="209"]'); 
    ?>
    </section>

      <section class="about-us-summary">
        <div class="container about-us-container">
            <?php
            // Fetch the 'About Us' page content by its slug ('about').
            // Make sure the page slug in your WordPress dashboard matches.
            $about_page = get_page_by_path('about');
            if ($about_page) :
            ?>
                <div class="about-us-images">
                    <img
                        src="<?php echo get_template_directory_uri(); ?>/assets/images/about-maroon-your-look.JPG"
                        alt="Model wearing Maroon glasses"
                        class="about-us-img-1"
                        loading="lazy"
                    />
                    <img
                        src="<?php echo get_template_directory_uri(); ?>/assets/images/about-maroon-your-story.JPG"
                        alt="Maroon glasses, your story"
                        class="about-us-img-2"
                        loading="lazy"
                    />
                </div>
                <div class="about-us-content">
                    <h2><?php echo get_the_title($about_page); ?></h2>
                    <?php 
                        // Get the content from the "About Us" page and display it
                        $about_content = get_the_content(null, false, $about_page);
                        echo wpautop($about_content); // wpautop adds paragraph tags automatically
                    ?>
                    <a href="<?php echo get_permalink($about_page); ?>" class="btn btn-primary">Xem thêm</a>
                </div>
            <?php endif; ?>
        </div>
      </section>

      <section class="product-section">
        <div class="container">
          <div class="section-header">
            <h2>New Arrival</h2>
            <a href="<?php echo get_permalink( wc_get_page_id( 'shop' ) ); ?>" class="view-all-link">Xem tất cả</a>
          </div>
          <div class="product-container">
            <?php
            // WP_Query to get the 6 most recent WooCommerce products
            $args = array(
                'post_type' => 'product',
                'posts_per_page' => 6,
                'orderby' => 'date',
                'order' => 'DESC',
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
                echo __( 'No new products found' );
            }
            wp_reset_postdata();
            ?>
          </div>
        </div>
      </section>

      <section class="process-section">
        <div class="container process-container">
          <a href="#" class="process-item">
            <img
              src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/free-ship-toan-quoc.svg"
              alt="Free Shipping Toàn Quốc"
              class="icon-shipping"
              loading="lazy"
            />
            <p>Free ship toàn quốc</p>
          </a>
          <a href="#" class="process-item">
            <img
              src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/doi-tra-15-ngay.svg"
              alt="Đổi Trả 15 Ngày"
              class="icon-bag"
              loading="lazy"
            />
            <p>Đổi trả 15 ngày</p>
          </a>
          <a href="#" class="process-item">
            <img
              src="<?php echo get_template_directory_uri(); ?>/assets/images/icons/bao-hanh-3-thang.svg"
              alt="Bảo Hành 3 Tháng"
              class="icon-shield"
              loading="lazy"
            />
            <p>Bảo hành 3 tháng</p>
          </a>
        </div>
      </section>
</main>

<?php get_footer(); ?>