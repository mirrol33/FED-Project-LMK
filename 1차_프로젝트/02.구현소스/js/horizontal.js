window.addEventListener('load', horiProListFn); // 로드시 상품리스트 출력 함수
window.addEventListener("load", initHorizontalScroll); // 로드시 가로스크롤 함수
window.addEventListener("resize", initHorizontalScroll); // 리사이즈시 가로스크롤 함수

// JSON 파일 로드
import products from "./products.json" with {type: "json"};

// 가로 스크롤 영역 상품 데이터 출력
function horiProListFn() {
  // JSON 데이터를 배열로 변환
  const proList = Object.keys(products);

  // DOM 요소 (변경 대상)
  const horiProList = document.querySelector('.product-info-area');
  
  // 상품 리스트를 생성
  proList.forEach((idx) => {
    const product = products[idx]; // JSON 데이터에서 해당 제품 정보 가져오기
    horiProList.innerHTML += `
      <li class="product-info">
        <span></span>
        <a href="./products.html#slide${product.id}">
          <h4>${product.name_en}</h4>
          <h5>${product.name}</h5>
          <p>${product.description}</p>
        </a>
      </li>
    `;
  }); //// forEach ////
}

// 모바일 기기 여부와 뷰포트 크기 확인
const shouldRunHorizontalScroll = () => !/iphone|ipad|ipod|android|blackberry|webos|windows phone/i.test(navigator.userAgent.toLowerCase()) && window.innerWidth > 1200;

// 가로스크롤 영역 함수
function horizontalScroll() {
  const horizontalBoxTop = document.querySelector(".section-03").offsetTop;
  const horizontalBoxHeight = document.querySelector(".horizontal-box").offsetHeight;
  const horizontalBoxLeft = document.querySelector(".product-title-box").offsetLeft;
  const horizontalSection = document.querySelector(".horizontal-section");

  const scrollMax = horizontalSection.offsetWidth - window.innerWidth; // 가로스크롤 최대값
  horizontalSection.style.transform = `translateX(${horizontalBoxLeft}px)`; // 가로스크롤 초기 위치값

  const scrollHandler = () => {
    const verticalScrollPos = window.scrollY; // 스크롤 위치
    const scrollProgress = (verticalScrollPos - horizontalBoxTop) / horizontalBoxHeight; // 0~2 가로스크롤 진행도
    const transformValue = -scrollProgress * scrollMax; // 가로스크롤 진행값

    if (scrollProgress > 0 && scrollProgress <= 2) {
      horizontalSection.style.transform = `translateX(${transformValue}px)`;
    } else if (scrollProgress > 2) {
      horizontalSection.style.transform = `translateX(${-2 * scrollMax}px)`;
    } else {
      horizontalSection.style.transform = `translateX(${horizontalBoxLeft}px)`;
    }
  };

  window.addEventListener("scroll", scrollHandler);

  // 초기화 함수 반환
  return () => {
    window.removeEventListener("scroll", scrollHandler); // 스크롤 이벤트 제거
    horizontalSection.style.transform = `translateX(0px)`; // 초기화
  };
} //// 가로스크롤 영역 함수 ////

// 가로스크롤 영역 초기화 및 리사이즈 관리
let cleanupHorizontalScroll = null;

function initHorizontalScroll() {
  if (cleanupHorizontalScroll) {
    cleanupHorizontalScroll(); // 기존 가로 스크롤 이벤트 제거 및 초기화
  }

  if (shouldRunHorizontalScroll()) {
    cleanupHorizontalScroll = horizontalScroll(); // 새 가로 스크롤 함수 실행
  } else {
    cleanupHorizontalScroll = null; // 필요 없을 경우 초기화
  }
} //// 가로스크롤 영역 초기화 및 리사이즈 관리 ////







