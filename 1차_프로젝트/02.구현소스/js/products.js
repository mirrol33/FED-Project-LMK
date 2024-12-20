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

    window.addEventListener("resize", swiperPosFn); // 리사이즈시 위치 호출 함수 실행
    // swiper 위치 호출 함수
    function swiperPosFn() {
      let swiperTarget = swiper.getTranslate(); // swiper 슬라이드 위치 읽기
      let ww = window.innerWidth; // 윈도우 넓이 읽기
      console.log("슬라이드 위치값:", swiperTarget);
      console.log("윈도우 넓이값:", ww);
    }

    // 자세히 버튼 클릭시
    $(document).on("click", ".btn-view", function (e) {
      e.stopPropagation(); // 버블링 막기
      $(this).hide(); // 자세히보기 버튼 숨기기
      // 해당 슬라이드 열기
      const $closestSlide = $(this).closest(".product-box");
      $closestSlide.addClass("open").children(".close-btn").show();
      // 해당 슬라이드 사이즈 변경 애니메이션
      $closestSlide.animate({width: "1200px"}, 200);
    });

    // 이전 버튼 클릭시
    $(document).on("click", ".close-btn", function (e) {
      e.stopPropagation(); // 버블링 막기
      $(this).hide(); // 이전 버튼 숨기기
      // 해당 슬라이드 닫기
      const $closestSlide = $(this).closest(".product-box");
      $closestSlide.removeClass("open").children(".btn-view").show();
    });
  }); // getJSON
});
