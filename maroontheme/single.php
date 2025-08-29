<?php get_header(); ?>

<main>
    <div class="container">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <nav class="breadcrumbs" aria-label="Breadcrumb">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Trang chủ</a><span>/</span>
                <a href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>">Tin tức</a><span>/</span>
                <span><?php the_title(); ?></span>
            </nav>

            <article class="blog-post-container">
                <header class="blog-post-header">
                    <h1><?php the_title(); ?></h1>
                    <p class="post-meta"><?php echo get_the_date('d/m/Y'); ?> | <?php the_category(', '); ?></p>
                </header>

                <div class="blog-post-body">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; endif; ?>
    </div>
</main>

<?php get_footer(); ?>