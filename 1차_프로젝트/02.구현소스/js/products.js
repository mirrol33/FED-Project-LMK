$(() => {
  // 상품리스트 데이터 로드 및 출력
  $.getJSON("./js/products.json", function (products) {
    const $proList = $("#product-list");
    products.forEach((product) => {
      $proList.append(`
              <div class="product-box swiper-slide">
                  <span>${product.name_en}</span>
                  <h3>${product.name}</h3>
                  <p>${product.description}</p>
                  <figure><img src="${product.img}" alt="${product.name}"></figure>
              </div>
          `);
    });
  }).fail((jqxhr, textStatus, error) => console.error("Error loading products:", textStatus, error));

  // 상품 슬라이드 swiper JS
  let swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 40,
    loop: true,
    loopedSlides: 2,
    // centerInsufficientSlides: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
