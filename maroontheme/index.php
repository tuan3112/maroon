<?php get_header(); ?>

<main>
    <div class="container">
        <?php
        if ( have_posts() ) :
            while ( have_posts() ) : the_post();
                the_content();
            endwhile;
        else :
            echo '<p>Sorry, no content found.</p>';
        endif;
        ?>
    </div>
</main>

<?php get_footer(); ?>