$(() => {
  // JSON 파일 경로
  let jsonFile = "./js/products.json";

  // DOM 요소
  const $proList = $("#product-list");

  // JSON 데이터 로드
  $.getJSON(jsonFile, function (products) {
    console.log("JSON 완료!", products.length);

    // 상품 리스트 출력
    products.forEach(function (product) {
      $proList.append(`
        <div class="product-box swiper-slide" data-hash="slide${product.id}">
          <span>${product.name_en}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="detail">${product.detail}</p>
          <a href="#" class="btn-view">자세히보기</a>
          <a href="#" class="close-btn">이전</a>
          <figure><img src="${product.img}" alt="${product.name}"></figure>
        </div>
      `);
    });

    // Swiper 초기화
    let swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 40,
      loop: true,
      loopedSlides: 2,
      centeredSlides: true,
      centeredSlidesBounds: true,
      hashNavigation: {
        replaceState: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        10: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });

    let swiperTarget = swiper.getTranslate();

    // 화면 리사이즈 이벤트
    $(window).resize(function () {
      swiperTarget = swiper.getTranslate();
      let isOpen = $(".swiper-slide-active").is(".open");
      if (isOpen) slideOpen();
      else slideBack();
    });

    function slideOpen() {
      let $slideOpen = $(".open");
      let positionX = swiperTarget - $slideOpen.offset().left / 4 + 40;
      $(".product-list").css(
        "transform",
        "translate3d(" + positionX + "px, 0px, 0px"
      );
    }

    function slideBack() {
      $(".product-list").css(
        "transform",
        "translate3d(" + swiperTarget + "px, 0px, 0px"
      );
      console.log("닫기위치:", swiperTarget);
    }

    $(document).on("click", ".btn-view", function (e) {
      e.stopPropagation();
      swiper.disable();
      $(this).hide();

      const $closestSlide = $(this).closest(".product-box");
      $closestSlide.addClass("open").children(".close-btn").show();

      slideOpen();
    });

    $(document).on("click", ".close-btn", function (e) {
      e.stopPropagation();
      swiper.enable();
      $(this).hide();

      const $closestSlide = $(this).closest(".product-box");
      $closestSlide.removeClass("open").children(".btn-view").show();

      slideBack();
    });

    function hashChange() {
      const hash = window.location.hash.replace('#', '');
      const slideIndex = parseInt(hash.replace('slide', ''), 10);
      if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < products.length) {
        swiper.slideTo(slideIndex);
      }
    }
    window.addEventListener('load', hashChange);
  }); // getJSON
});
