$(() => {
  // JSON 파일 경로
  let jsonFile = "./js/products.json";

  // DOM 요소
  const $proList = $("#product-list");

  // JSON 데이터 로드
  $.getJSON(jsonFile, function (products) {
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

    // Swiper 초기화 실행
    let swiper = new Swiper(".mySwiper", {
      slidesPerView: 'auto',
      spaceBetween: 60,
      loop: true,
      loopedSlides: 2,
      centeredSlides: true,
      centeredSlidesBounds: true,
      hashNavigation: {
        replaceState: true,
        watchState: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: { // 초기화 실행함수
        init: function () {
          $('.close-btn').hide(); // 이전 버튼 숨김
          $(".detail").hide();
        },
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
          spaceBetween: 40,
        },
      },
    });

    // 자세히 버튼 클릭시
    $(document).on("click", ".swiper-slide-active .btn-view", function (e) {
      e.stopPropagation(); // 버블링 막기
      $(this).fadeOut(); // 자세히보기 버튼 숨기기
      // 해당 요소 열기
      const $closestSlide = $(this).closest(".product-box"); // 부모요소 대상
      $closestSlide.addClass("open").children(".close-btn").fadeIn(); // .open 추가, 이전 버튼 표시
      $(this).siblings(".detail").fadeIn('slow');
    });

    // 이전 버튼 클릭시
    $(document).on("click", ".swiper-slide-active .close-btn", function (e) {
      e.stopPropagation(); // 버블링 막기
      $(this).fadeOut(); // 이전 버튼 숨기기
      // 해당 요소 닫기
      const $closestSlide = $(this).closest(".product-box");
      $closestSlide.removeClass("open").children(".btn-view").fadeIn(); // .open 삭제, 자세히 버튼 표시
      $(this).siblings(".detail").hide();
    });

    // 이동시 실행함수
    swiper.on('realIndexChange', function () {
      $('.swiper-slide-prev.open').removeClass('open');
      $('.swiper-slide-next.open').removeClass('open');
      $('.close-btn').hide();
      $('.swiper-slide-active .btn-view').show();
      $('.detail').hide();
    });

  }); // getJSON
});
