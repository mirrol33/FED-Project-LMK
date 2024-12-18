$(() => {
  $.getJSON("./js/products.json") // json 파일 경로
    // .done() 메소드는 Deferred 객체의 일부. AJAX 요청이 성공적으로 완료된 후에 실행되는 콜백을 추가.
    .done((products) => {
      const $proList = $("#product-list");
      products.forEach((product, idx) => {
        $proList.append(`
          <div class="product-box swiper-slide" data-hash="slide${idx}">
            <span>${product.name_en}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <a href="#" class="btn-view">자세히보기</a>
            <figure><img src="${product.img}" alt="${product.name}"></figure>
          </div>
        `);
      }); /// forEach ///

      // 상품 리스트를 모두 불러온 후 swiper 실행!
      if ($proList.children(".product-box").length > 0) {
        const swiper = new Swiper(".mySwiper", {
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

        // .btn-view 자세히보기 클릭시 이벤트 추가
        $(document).on("click", ".btn-view", function (e) {
          let $targetSlide = $(this).closest(".product-box");
          e.stopPropagation();
          swiper.disable(); // 슬라이드 중지
          $(this).hide(); // .btn-view 숨김
          $targetSlide.prepend(`<a href="#" class="close-btn">닫기</a>`); // .close-btn 요소 추가
          $targetSlide.addClass("open"); // .view 추가
        }); /// click ///
        // .close-btn 닫기 클릭시 이벤트 추가
        $(document).on("click", ".close-btn", function (e) {
          let $targetSlide = $(this).closest(".product-box");
          e.stopPropagation();
          swiper.enable(); // 슬라이드 재시작
          $targetSlide.find(".btn-view").show(); // .btn-view 보이기
          $(this).remove(); // 닫기 버튼 삭제
          $targetSlide.removeClass("open"); // .view 삭제
        }); /// click ///
      } /// if ///
    })
    // 상품 로드 실패시
    .fail((_, textStatus, error) => console.error("Error loading products:", textStatus, error));
});
