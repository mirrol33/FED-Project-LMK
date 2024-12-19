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
  if ($proList.children(".product-box").length) {
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
      // history: {
      //   replaceState: true, // replaceState 대신 pushState를 사용해 브라우저 히스토리에 추가
      // },
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
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });

    let swiperTarget = swiper.getTranslate(); // swiper영역 위치값
    let ww = window.innerWidth; // 화면 넓이
    let slideWidth = $('.swiper-slide').outerWidth(); // 슬라이드 넓이값

    // 화면 리사이즈시 실행 함수
    $(window).resize(function () {
      ww = window.innerWidth;
      swiperTarget = swiper.getTranslate();
      swiperMove();
    }); /// resize ///

    // swiper영역 위치 이동 함수
    function swiperMove(){
      let position = swiperTarget;
      $(".product-list").css("transform", "translate3d(" + position + "px, 0px, 0px)");
      
      // .open 요소
      let $openSlide = $('.open');
      $openSlide.css({
        width: "100vw"
      })
      console.log($openSlide);
    }; /// swiperMove ///


    // .btn-view 자세히보기 클릭시 이벤트
    $(document).on("click", ".btn-view", function (e) {
      e.stopPropagation(); // #링크 이동 막기
      swiper.disable(); // 슬라이드 정지
      $(this).hide(); // .btn-view 숨김

      let $closestSlide = $(this).closest('.product-box'); // 상위 부모요소
      $closestSlide.addClass("open"); // 클래스 추가
      $closestSlide.children(".close-btn").show(); // .close-btn 보이기
      $closestSlide.children(".detail").show(); // .detail 보이기
      
      swiperMove(); // swiper영역 위치 호출
    }); /// click ///

    // .close-btn 닫기 클릭시 이벤트
    $(document).on("click", ".close-btn", function (e) {
      e.stopPropagation(); // #링크 이동 막기
      swiper.enable(); // 슬라이드 재시작
      $(this).hide(); // .close-btn 숨김
      
      let $closestSlide = $(this).closest('.product-box'); // 상위 부모요소
      $closestSlide.removeClass("open"); // 클래스 삭제
      $closestSlide.children(".btn-view").show(); // .btn-view 보이기
      $closestSlide.children(".detail").hide(); // .detail 숨김

      swiperMove(); // swiper영역 위치 호출
    }); /// click ///

  } /// if ///
});
