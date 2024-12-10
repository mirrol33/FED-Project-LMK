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
        document.querySelector('.loading-area').classList.add('off'); // 로드화면 opacity        
    }, 2000); //// end setTimeout ////
}

// 리사이즈시 실행 함수
function resizeFn() {
    checkScrollPosition(); // 스크롤 메뉴바 실행
    lenis.start(); // lenis 스크롤 애니메이션 실행
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


// 동영상 자동재생 함수
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
} //// 동영상 자동재생 함수 ////

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
} //// 스크롤시 메뉴바 특정 위치에서 배경색 변경 함수 ////

window.addEventListener("scroll", checkScrollPosition); // 스크롤시 메뉴바 위치확인