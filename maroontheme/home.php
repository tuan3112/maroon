<?php get_header(); ?>

<main>
    <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Trang chủ</a><span>/</span>
            <span>Tin tức</span>
        </nav>
        <h1 class="page-title">Talk with Maroon</h1>
    </div>

    <section class="blog-list-section">
        <div class="container">
            <div class="blog-category-grid">
                <?php if ( have_posts() ) : ?>
                    <?php while ( have_posts() ) : the_post(); ?>
                        <article class="blog-post-card-category list-style-post">
                            <a href="<?php the_permalink(); ?>">
                                <div class="post-image-list">
                                    <?php if ( has_post_thumbnail() ) : ?>
                                        <img src="<?php the_post_thumbnail_url('large'); ?>" alt="<?php the_title_attribute(); ?>" loading="lazy"/>
                                    <?php endif; ?>
                                </div>
                                <div class="post-content-list">
                                    <h3><?php the_title(); ?></h3>
                                    <p class="post-meta"><?php echo get_the_date('d/m/Y'); ?> | <?php the_category(', '); ?></p>
                                    <p class="post-excerpt">
                                        <?php the_excerpt(); ?>
                                    </p>
                                    <span class="read-more-link">Xem thêm</span>
                                </div>
                            </a>
                        </article>
                    <?php endwhile; ?>
                <?php else : ?>
                    <p>No posts found.</p>
                <?php endif; ?>
            </div>

            <nav class="pagination" aria-label="Pagination">
                <?php the_posts_pagination( array(
                    'prev_text' => '&laquo;',
                    'next_text' => '&raquo;',
                ) ); ?>
            </nav>
        </div>
    </section>
</main>

<?php get_footer(); ?>