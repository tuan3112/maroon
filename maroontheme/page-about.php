<?php
/*
Template Name: About Us Page
*/
get_header(); ?>

<main class="about-page">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Trang chủ</a><span>/</span>
          <span>Về Maroon</span>
        </nav>
      </div>

      <section class="about-hero">
        <div class="about-hero-image"></div>
        <div class="about-hero-content">
          <h1>Xin chào, chúng tôi là Maroon!</h1>
          <p>
            Chúng tôi tin rằng cá tính của bạn xứng đáng với những thiết kế tinh
            tế, bền vững và đầy cảm hứng. Không chạy theo những trào lưu nhất
            thời, Maroon tập trung vào việc tạo ra những chiếc kính có thể đồng
            hành cùng bạn qua nhiều năm tháng.
          </p>
        </div>
      </section>

      <section class="about-section your-look-section">
        <div class="container about-section-container">
          <div class="about-text-content">
            <h2>“Your look, your story”</h2>
            <p>
              Ngay từ lúc lên ý tưởng, chúng tôi luôn tự hỏi: “Làm thế nào để
              chiếc kính không chỉ đơn thuần là một phụ kiện mà còn là dấu ấn
              của cá nhân?”
            </p>
            <p>
              Chúng tôi nhận ra rằng ánh nhìn của mỗi người đều khác biệt. Nó
              không chỉ là một câu chuyện không cần phải kể bằng lời mà còn thể
              hiện cái cảm nhận, sự tự tin, từ cách họ tự tin đối diện với thế
              giới.
            </p>
          </div>
          <div class="about-image-content your-look-images">
            <img
              src="<?php echo get_template_directory_uri(); ?>/assets/images/banner-2.JPG"
              alt="A person trying on glasses"
              class="your-look-img-1"
            />
            <img
              src="<?php echo get_template_directory_uri(); ?>/assets/images/products/kinh-mat-maroon-1.jpg"
              alt="A pair of glasses"
              class="your-look-img-2"
            />
          </div>
        </div>
      </section>

      <section class="about-section our-story-section">
        <div class="container">
          <h2>Our story</h2>
          <p>
            Tết đến nơi, Hà Nội lạnh cắt da, chúng tôi - hai người đồng nghiệp
            cùng công ty, cách nhà nhau đúng mấy bước chân - hẹn nhau đi cà phê.
            Trốn việc nhà là chính, còn phụ là bị thuốc lào và cốc cà phê trứng.
          </p>
          <p>
            Vài ba câu chuyện về công việc, sếp và deadline, chúng tôi quay sang
            hỏi nhau: “Hay là bây giờ anh em mình đi bán kính?”. Tôi nói - “Kinh
            nghiệm mấy chục năm đeo kính xử lý khủng hoảng truyền thông tốt thế
            này, không đi kinh doanh thì làm gì?”
          </p>
          <p>
            Thế là ý tưởng về cửa hàng kính xuất hiện, từ những câu chuyện rất
            đỗi thường ngày.
          </p>
        </div>
      </section>

      <section class="about-section image-grid-section">
        <div class="container image-grid-container">
          <img
            src="<?php echo get_template_directory_uri(); ?>/assets/images/banner-1.JPG"
            alt="Behind the scenes at a photoshoot"
          />
          <img
            src="<?php echo get_template_directory_uri(); ?>/assets/images/banner-3.JPG"
            alt="A person trying on different glasses"
          />
        </div>
      </section>

      <section class="about-section maroon5-section">
        <div class="container">
          <h2>Đây không phải Maroon 5</h2>
          <p>
            Lần tiếp theo, khi mà chúng tôi đang lên ý tưởng. Đến đoạn đặt tên
            thì bắt đầu bí. Chúng tôi bắt đầu liệt kê, Look? - quá nhàm, Eyes? -
            thiếu các gì đó, quá phổ biến, Optic? - quá khó đọc.
          </p>
          <p>
            Lại một lần tình cờ, khi chúng tôi đang lướt trên Tumblr, ca khúc
            Payphone của Maroon 5 xuất hiện trong playlist. Thần giao cách cảm
            là có thật, tôi và anh quay sang nhìn nhau:
          </p>
          <p>“Hay là, tên chúng ta nó”, anh nói.</p>
          <p>“Thế anh em mình tên Payphone nhé?”</p>
          <p>“???? Maroon chứ ??????”</p>
          <p>Thế là Maroon ra đời, còn tôi thì bị ăn chửi vì loạn ngôn.</p>
        </div>
      </section>
    </main>

<?php get_footer(); ?>