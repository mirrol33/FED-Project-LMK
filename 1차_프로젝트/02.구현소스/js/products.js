$(() => {
  $.getJSON("./js/products.json")
    .done((products) => {
      const $proList = $("#product-list");
      products.forEach((product,idx) => {
        $proList.append(`
          <div class="product-box swiper-slide" data-hash="slide${idx}">
            <span>${product.name_en}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <figure><img src="${product.img}" alt="${product.name}"></figure>
          </div>
        `);
      });
      
      // Swiper 초기화 (append 완료 후 실행)
      if ($proList.children(".product-box").length > 0) {
        new Swiper(".mySwiper", {
          slidesPerView: 3,
          spaceBetween: 60,
          loop: true,
          loopedSlides: 2,
          centeredSlides: true,
          centeredSlidesBounds: true,
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
            10: {
              slidesPerView: 1,
              // spaceBetween: 10,
            },
            800: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          },
        });
      }
    })
    .fail((_, textStatus, error) => console.error("Error loading products:", textStatus, error));
});
