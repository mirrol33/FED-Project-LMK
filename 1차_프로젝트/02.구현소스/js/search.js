$(() => {
  // JSON 파일 경로
  let jsonFile = "./js/products.json";

  // JSON 데이터를 자바스크립트 배열로 할당
  let products = [];
  $.getJSON(jsonFile, function (data) {
    products = data;
  }); //// getJSON ////

  // DOM 요소
  const $searchInput = $("#search-input");
  const $searchButton = $("#search-button");
  const $searchResults = $("#search-results");

  // 검색어 제외 조건
  const excludedKeywords = ["고혼진", "고혼", "혼진"];

  // 검색 기능
  function performSearch() {
    const query = $searchInput.val().toLowerCase().trim();
    $searchResults.empty(); // 기존 결과 초기화

    // 검색어 제외 조건: 빈 검색어, 제외된 키워드, 한 글자 검색어
    if (!query || excludedKeywords.includes(query) || query.length === 1) {
      $searchResults.append("<p>검색어를 정확히 입력해주세요!</p>");
      return;
    }

    // 검색 결과 필터링
    const filteredProducts = products.filter((product) => {
      const { id, name, name_en, description, img, keyword } = product;

      // img 속성에 검색어 포함 여부 확인 및 제외
      if (img.toLowerCase().includes(query)) return false;

      // 검색어 포함 여부 확인
      return (
        id.includes(query) ||
        name.includes(query) ||
        name_en.toLowerCase().includes(query) ||
        description.includes(query) ||
        keyword.some((key) => key.includes(query))
      );
    });

    // 결과 출력
    if (filteredProducts.length) {
      // filteredProducts.length 값이 true 일때 출력
      filteredProducts.forEach((product, idx) => {
        // const descriptionWithBreaks = product.description.replace(/\n/g, '<br>');
        const resultHtml = `
            <div class="product">
                <div class="txt">
                  <a href="./products.html#slide${product.id}">
                    <span>${product.name_en}</span>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                  </a>
                </div>
                <figure><img src="${product.img}" alt="${product.name}"></figure>
            </div>
        `;
        idx > 3 ? "" : $searchResults.append(resultHtml);
      }); /// forEach ///

      // 3개 이상의 결과일 때 출력
      if (filteredProducts.length > 3) {
        $searchResults.append(
          `<span class="search-more-btn">
        <a href="products.html" title="더보기">
        <svg viewBox="0 0 13 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1.7016" cy="1.29904" r="0.909119" fill="white"/>
        <circle cx="6.70184" cy="1.29907" r="0.909119" fill="white"/>
        <circle cx="11.7018" cy="1.29907" r="0.909119" fill="white"/>
        </svg>
        </a>
        </span>`
        );
      } /// if ///

      // filteredProducts.length 값이 false 일때 출력
    } else {
      $searchResults.append(
        "<p>검색된 결과가 없습니다. 검색어를 다시 입력해주세요!</p>"
      );
    }
  }

  // 이벤트 바인딩
  $searchInput.on("keypress", (e) => {
    if (e.which === 13) performSearch(); // Enter 키로 검색
  });

  $searchButton.on("click", performSearch); // 버튼 클릭으로 검색
});
