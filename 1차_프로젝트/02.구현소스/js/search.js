$().ready(()=>{
    // JSON 파일 경로
    const jsonFile = './js/products.json';

    // DOM 요소
    const $searchInput = $('#search-input');
    const $searchButton = $('#search-button');
    const $searchResults = $('#search-results');

    // 데이터 로드
    let products = [];
    $.getJSON(jsonFile, function (data) {
        products = data;
    });

    // 검색 기능
    function performSearch() {
        const query = $searchInput.val().toLowerCase();
        $searchResults.empty(); // 기존 결과 초기화

        if (query.length === 0) return;

        // 검색어로 필터링
        const filteredProducts = products.filter(product =>
            product.name.includes(query) ||
            product.name_en.toLowerCase().includes(query) ||
            product.description.includes(query) ||
            product.keyword.includes(query)
        );

        // 검색값 제외
        if (query === '고혼진' || query === '피부') {
            $searchResults.append('<p>검색어를 정확히 입력해주세요!</p>');
            return;
        }

        // 검색 결과 출력
        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const descriptionWithLineBreaks = product.description.replace(/\n/g, '<br>'); // 줄바꿈 태그 대체
                const resultHtml = `
                    <div class="product">
                        <span>${product.name_en}</span>
                        <h3>${product.name}</h3>
                        <p>${descriptionWithLineBreaks}</p>
                    </div>
                `;
                $searchResults.append(resultHtml);
            });
        } else {
            $searchResults.append('<p>검색 결과가 없습니다. 검색어를 다시 입력해주세요!</p>');
        }
    }

    // 입력창에서 Enter 키를 눌렀을 때 검색 실행
    $searchInput.on('keypress', function (e) {
        if (e.which === 13) { // Enter 키 코드
            performSearch();
        }
    });

    // 검색 버튼 클릭 시 검색 실행
    $searchButton.on('click', performSearch);
});
