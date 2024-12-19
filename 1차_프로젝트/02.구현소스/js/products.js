$(() => {
  // DOM 요소
  const $proList = $("#product-list");

  // 상품 리스트 출력
  products.forEach((product, idx) => {
    $proList.append(`
          <div class="product-box swiper-slide" data-hash="slide${idx}">
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
  

  // 상품 리스트를 모두 불러온 후 swiper 실행!
  if ($proList.children(".product-box").length > 0) {
    let swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 60,
      loop: true,
      loopedSlides: 2,
      centeredSlides: true, //활성 슬라이드가 항상 왼쪽이 아닌 중앙에 배치
      centeredSlidesBounds: true, // 활성 슬라이드는 슬라이더의 시작과 끝에 틈을 추가하지 않고 중앙에 배치
      hashNavigation: {
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
        // 반응형 화면 슬라이드 개수
        10: {
          slidesPerView: 1,
          // spaceBetween: 10,
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });

    let swiperTarget; // swiper영역 위치 변수선언
    let targetX; // 활성 slide 넓이 변수선언

    // .btn-view 자세히보기 클릭시 이벤트
    $(document).on("click", ".btn-view", function (e) {
      e.stopPropagation(); // #링크 이동 막기
      swiper.disable(); // 슬라이드 정지
      $(this).hide(); // .btn-view 숨김

      let $targetSlide = $(this).closest(".product-box");
      $targetSlide.addClass("open"); // 클래스 추가
      $targetSlide.find(".close-btn").show(); // .close-btn 보이기
      $targetSlide.find(".detail").show(); // .detail 보이기

      // swiper영역 위치 수정
      swiperTarget = swiper.getTranslate();
      console.log(swiperTarget);
      targetX = $targetSlide.width() / 2;
      let translate = swiperTarget - targetX;
      $(".product-list").css("transform", "translate3d(" + translate + "px, 0px, 0px)");
    }); /// click ///

    // .close-btn 닫기 클릭시 이벤트
    $(document).on("click", ".close-btn", function (e) {
      e.stopPropagation(); // #링크 이동 막기
      swiper.enable(); // 슬라이드 재시작
      $(this).hide(); // .close-btn 숨김

      let $targetSlide = $(this).closest(".product-box");
      $targetSlide.removeClass("open"); // 클래스 삭제
      $targetSlide.find(".btn-view").show(); // .btn-view 보이기
      $targetSlide.find(".detail").hide(); // .detail 숨김

      // swiper영역 위치 원복
      targetX = $targetSlide.width() / 4;
      swiperTarget = swiper.getTranslate() + targetX;
      console.log(swiperTarget);
      $(".product-list").css("transform", "translate3d(" + swiperTarget + "px, 0px, 0px)");
    }); /// click ///
  } /// if ///
});
