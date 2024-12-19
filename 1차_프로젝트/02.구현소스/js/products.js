$(() => {
  // DOM 요소
  const $proList = $("#product-list");
  // 상품 리스트를 모두 불러온 후 실행!
  if (products.length > 0) {
    // 상품 리스트 출력
    products.forEach(product => {
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
    }); /// forEach ///

    let swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 40,
      loop: true,
      loopedSlides: 2,
      centeredSlides: true, //활성 슬라이드가 항상 왼쪽이 아닌 중앙에 배치
      centeredSlidesBounds: true, // 활성 슬라이드는 슬라이더의 시작과 끝에 틈을 추가하지 않고 중앙에 배치
      hashNavigation: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        // 반응형 화면 슬라이드 개수
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

    let swiperTarget = swiper.getTranslate(); // 현재 swiper영역 위치값 변수

    // 화면 리사이즈시 실행 함수
    $(window).resize(function () {
      swiperTarget = swiper.getTranslate();
      let isOpen = $(".swiper-slide-active").is(".open"); //.open 클래스가 있는지 체크
      if (isOpen) slideOpen();
      else slideBack();
    }); /// resize ///

    // swiper영역 위치 이동 함수
    function slideOpen() {
      let $slideOpen = $(".open");
      let positionX = swiperTarget - $slideOpen.offset().left / 4 + 40;
      $(".product-list").css(
        "transform",
        "translate3d(" + positionX + "px, 0px, 0px"
      );
    } /// slideMove ///
    function slideBack() {
      $(".product-list").css(
        "transform",
        "translate3d(" + swiperTarget + "px, 0px, 0px"
      );
      console.log("닫기위치:", swiperTarget);
    } /// slideBack ///

    // .btn-view 자세히보기 클릭시 이벤트
    $(document).on("click", ".btn-view", function (e) {
      e.stopPropagation(); // #링크 이동 막기
      swiper.disable(); // 슬라이드 정지
      $(this).hide(); // .btn-view 숨김

      let $closestSlide = $(this).closest(".product-box"); // 상위 부모요소
      $closestSlide.addClass("open"); // 클래스 추가
      $closestSlide.children(".close-btn").show(); // .close-btn 보이기

      slideOpen(); // swiper영역 위치 호출
    }); /// click ///

    // .close-btn 닫기 클릭시 이벤트
    $(document).on("click", ".close-btn", function (e) {
      e.stopPropagation(); // #링크 이동 막기
      swiper.enable(); // 슬라이드 재시작
      $(this).hide(); // .close-btn 숨김

      let $closestSlide = $(this).closest(".product-box"); // 상위 부모요소
      $closestSlide.removeClass("open"); // 클래스 삭제
      $closestSlide.children(".btn-view").show(); // .btn-view 보이기

      slideBack(); // swiper영역 위치 호출
    }); /// click ///
    function hashChange() {
      const hash = window.location.hash.replace('#', '');
      const slideIndex = parseInt(hash.replace('slide', ''), 10); // "slide1" → 1
      if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < products.length) {
        swiper.slideTo(slideIndex); // Uncaught ReferenceError: swiper is not defined
      }
    }
    window.addEventListener('load', hashChange);
  } /// if ///

});
