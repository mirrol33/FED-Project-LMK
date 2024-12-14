// JSON 파일 불러오기
async function loadProducts() {
  const response = await fetch("./js/products.json"); // JSON 파일 경로
  if (!response.ok) {
    throw new Error(`Failed to fetch products.json: ${response.status}`);
  }
  return await response.json();
}

// 상품리스트 데이터 로드 및 출력
loadProducts()
  .then((products) => {
    // 상품 리스트 출력
    const proList = document.getElementById("product-list");
    products.forEach((product) => {
      const proBox = document.createElement("div");
      proBox.className = "product-box";
      proBox.innerHTML = `
              <span>${product.name_en}</span>
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <figure><img src="${product.img}" alt="${product.name}"></figure>
            `;
      proList.appendChild(proBox);
    });
  })
  .catch((error) => {
    console.error("Error loading products:", error);
  });
