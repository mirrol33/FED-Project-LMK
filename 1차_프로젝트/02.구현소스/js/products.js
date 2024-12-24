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
          <a href="#" class="btn-view">MORE</a>
          <a href="#" class="close-btn"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.34686 24L0 22.6531L10.6531 12L0 1.34686L1.34686 0L12 10.6531L22.6531 0L24 1.34686L13.3469 12L24 22.6531L22.6531 24L12 13.3469L1.34686 24Z" fill="#fff"/>
          </svg></a>
          <figure><img src="${product.img}" alt="${product.name}"></figure>
        </div>
      `);
    });

    // Swiper 초기화 실행
    let swiper = new Swiper(".mySwiper", {
      slidesPerView: "auto",
      spaceBetween: 80,
      loop: true,
      loopedSlides: 2,
      centeredSlides: true,
      // centeredSlidesBounds: true,
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
      on: {
        // 초기화 실행함수
        init: function () {
          $(".close-btn").hide(); // 이전 버튼 숨김
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

    
    // 공통 함수: 슬라이드 열기/닫기
    function toggleSlide(el, isOpen) {
      const $closestSlide = el.closest(".product-box");
      const originSize = $closestSlide.width();

      if (isOpen) {
        // 슬라이드 열기
        el.fadeOut(); // 현재 버튼 숨기기
        $closestSlide.addClass("open").children(".close-btn").fadeIn(); // .open 추가 및 닫기 버튼 표시
        el.siblings(".detail").fadeIn("slow"); // 상세 내용 표시
      } else {
        // 슬라이드 닫기
        el.fadeOut(); // 현재 버튼 숨기기
        $closestSlide.removeClass("open").children(".btn-view").fadeIn(); // .open 제거 및 자세히 버튼 표시
        el.siblings(".detail").hide(); // 상세 내용 숨김
      }
    }

    // 자세히 버튼 클릭 시
    $(document).on("click", ".swiper-slide-active .btn-view", function (e) {
      e.stopPropagation(); // 버블링 방지
      toggleSlide($(this), true); // 슬라이드 열기
    });

    // 닫기 버튼 클릭 시
    $(document).on("click", ".swiper-slide-active .close-btn", function (e) {
      e.stopPropagation(); // 버블링 방지
      toggleSlide($(this), false); // 슬라이드 닫기
    });

    // 슬라이드 이동 시 초기화
    swiper.on("realIndexChange", function () {
      $(".swiper-slide-prev.open, .swiper-slide-next.open").removeClass("open");
      $(".close-btn").hide();
      $(".swiper-slide-active .btn-view").show();
      $(".detail").hide();
    });
  }); // getJSON
});
