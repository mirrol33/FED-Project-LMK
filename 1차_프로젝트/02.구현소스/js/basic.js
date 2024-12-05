window.addEventListener('DOMContentLoaded', loadFn); // 로드시 실행
window.addEventListener('resize', resizeFn); // 리사이즈시 실행

// 로드완료후 실행 함수
function loadFn() {
    window.scrollTo(0, 0); // 스크롤 맨위로 이동
    document.body.style.overflow = "hidden"; // 로드시 스크롤바 숨김

    lenis.stop(); // lenis 스크롤 애니메이션 일시멈춤
    mainVideo(); // 동영상 자동재생 실행
    checkScrollPosition(); // 스크롤 메뉴바 실행

    // setTimeout start
    this.setTimeout(() => {
        lenis.start(); // lenis 스크롤 애니메이션 실행
        document.body.style.overflowY = "auto"; // 스크롤바 보이기
        initHorizontalScroll(); // 가로스크롤실행 여부 확인
        document.querySelector('.loading-area').classList.add('off'); // 로드화면 opacity        
    }, 2000); //// end setTimeout ////
}

// 리사이즈시 실행 함수
function resizeFn() {
    checkScrollPosition(); // 스크롤 메뉴바 실행
    lenis.start(); // lenis 스크롤 애니메이션 실행
    initHorizontalScroll(); // 가로스크롤실행 여부 확인
}

// Lenis 스크롤 애니메이션 초기화 start
const lenis = new Lenis({
    duration: 1.8, // 부드러운 스크롤 지속 시간
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 커스텀 이징 함수
}); //// Lenis ////

// Lenis 스크롤 애니메이션 루프 start
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf); // 재귀 호출
} //// Lenis raf ////
requestAnimationFrame(raf); // Lenis 루프 실행


// 동영상 자동재생 start
function mainVideo() {
    // 동영상 요소 선택
    const mainVideo = document.getElementById("main-video");

    if (mainVideo) {
        mainVideo.currentTime = 1; // 동영상 0초부터 시작
        mainVideo.play().catch((error) => {
            // play() 실패시 에러처리
            console.error("Video autoplay failed:", error);
        });
    }
} //// mainVideo ////

// 스크롤시 메뉴바 특정 위치에서 배경색 변경 함수
function checkScrollPosition() {
    // 메뉴바 요소 선택
    const headerWrap = document.querySelector(".header-wrap");
    // window 높이값 변수 할당
    const screenHeight = window.innerHeight;
    // 스크롤 위치값 변수 할당
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition >= screenHeight) {
        headerWrap.style.backgroundColor = "var(--color-bg-red)"; // 레드 색상
        // headerWrap.classList.add("scrolled"); // 클래스 추가
    } else {
        headerWrap.style.backgroundColor = "var(--color-bg-dark-ov)"; // 검은 색상
        // headerWrap.classList.remove("scrolled"); // 클래스 제거
    }
} //// checkScrollPosition ////

window.addEventListener("scroll", checkScrollPosition); // 스크롤시 메뉴바 위치확인

// 모바일 기기 여부와 뷰포트 크기 확인
const shouldRunHorizontalScroll = () => 
    !/iphone|ipad|ipod|android|blackberry|webos|windows phone/i.test(navigator.userAgent.toLowerCase()) && 
    window.innerWidth > 1200;

// 가로스크롤 영역 함수
function horizontalScroll() {    
    const horizontalBoxTop = document.querySelector(".section-03").offsetTop;
    const horizontalBoxHeight = document.querySelector(".horizontal-box").offsetHeight;
    const horizontalBoxLeft = document.querySelector(".product-title-box").offsetLeft;

    const horizontalSection = document.querySelector(".horizontal-section");
    const scrollMax = horizontalSection.offsetWidth - window.innerWidth;

    horizontalSection.style.transform = `translateX(${horizontalBoxLeft}px)`;

    const scrollHandler = () => {
        const verticalScrollPos = window.scrollY;
        const scrollProgress = (verticalScrollPos - horizontalBoxTop) / horizontalBoxHeight; // 0~2 가로스크롤 진행도
        const transformValue = -scrollProgress * scrollMax;

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
} //// horizontalScroll ////

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
} //// initHorizontalScroll ////
