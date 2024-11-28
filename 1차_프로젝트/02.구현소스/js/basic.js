// Lenis 초기화 start
const lenis = new Lenis({
    duration: 1.8, // 부드러운 스크롤 지속 시간
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 커스텀 이징 함수
}); //// end Lenis 초기화 ////

// Lenis 루프 start
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf); // 재귀 호출
} //// end Lenis 루프 ////
requestAnimationFrame(raf); // Lenis 루프 실행

document.body.style.overflow = "hidden"; // 로드시 스크롤바 숨김
lenis.stop(); // 로드시 lenis 스크롤 애니메이션 멈춤

window.addEventListener("load", scrollTop); // 새로고침시 스크롤 위치를 맨 위로 이동

function scrollTop() {
    window.scrollTo(0, 0);
}

// 2초후 실행 start
this.setTimeout(() => {
    mainVideo(); // mainVideo 함수 실행
    document.body.style.overflowY = "auto"; // 스크롤바 보이기
    lenis.start(); // lenis 스크롤 애니메이션 실행
}, 2000); //// 2초후 실행 ////

checkScrollPosition(); // 스크롤시 메뉴바 배경색변경 함수 실행

// 동영상 자동재생 start
function mainVideo() {
    // 동영상 요소 선택
    const mainVideo = document.getElementById("main-video");

    if (mainVideo) {
        mainVideo.currentTime = 0; // 동영상 0초부터 시작
        mainVideo.play().catch((error) => {
            // play() 실패시 에러처리
            console.error("Video autoplay failed:", error);
        });
    }
} //// end 동영상 자동재생 ////

// 스크롤시 메뉴바 특정 위치에서 배경색변경 start
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
} //// end 스크롤시 메뉴바 특정 위치에서 배경색변경 ////

window.addEventListener("scroll", checkScrollPosition); // 스크롤시 메뉴바 위치확인
window.addEventListener("resize", checkScrollPosition); // 리사이징시 메뉴바 위치확인

// 3초후 실행 start
this.setTimeout(() => {
    // 가로스크롤 영역 start
    const vBox2 = document.querySelector(".section-02");
    const horizontalBox = document.querySelector(".horizontal-box");
    const horizontalBoxTop = window.innerHeight + vBox2.offsetHeight; //horizontalBox.offsetTop 대체 (가로스크롤영역 위치)

    let horizontalSection = document.querySelector(".horizontal-section");
    let scrollMax = (horizontalSection.scrollWidth - window.innerWidth) * 0.8; // 가로스크롤 가능넓이
    console.log("가로스크롤 가능넓이:", scrollMax);

    const horizontalBoxTitle = document.querySelector(".product-title-box");
    console.log(
        "가로스크롤영역 타이틀 왼쪽위치",
        horizontalBoxTitle.offsetLeft
    );

    horizontalSection.style.transform = `translateX(${horizontalBoxTitle.offsetLeft}px)`; // 초기화

    window.addEventListener("scroll", function () {
        let verticalScrollPos = window.scrollY; // 세로 스크롤 위치
        console.log("세로 스크롤 위치:", verticalScrollPos);

        let scrollProgress =
            (verticalScrollPos - horizontalBoxTop) / horizontalBox.offsetHeight;
        console.log("가로스크롤 Progress:", scrollProgress);

        // 가로 스크롤 진행
        if (scrollProgress >= 0 && scrollProgress <= 1.5) {
            let transformValue = -scrollProgress * scrollMax;
            console.log("가로스크롤 진행값:", transformValue);
            horizontalSection.style.transform = `translateX(${transformValue}px)`;
        } else {
            horizontalSection.style.transform = `translateX(${horizontalBoxTitle.offsetLeft}px)`; // 초기화
        }

        // scrollProgress가 1.5를 초과하면 transform 유지
        if (scrollProgress > 1.5) {
          horizontalSection.style.transform = `translateX(${-1.5 * scrollMax}px)`;
        }

        
    }); /// end 가로스크롤 영역 ///
}, 3000); //// 3초후 실행 ////

// 햄버거 메뉴 start
var burger = document.querySelector('.menu-trigger');
var submenu = document.querySelector('.sub-menu')
burger.addEventListener('click', ()=>{
    burger.classList.toggle('on');
    submenu.classList.toggle('on');
}) //// 햄버거 메뉴 end ////
