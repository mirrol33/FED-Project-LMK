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
    let horizontalBox = document.querySelector(".horizontal-box"); // 가로스크롤 영역
    let horizontalBoxTop = document.querySelector(".section-03").offsetTop; // .section-03 높이값
    let horizontalBoxTitle = document.querySelector(".product-title-box").offsetLeft; // 타이틀 영역 왼쪽 위치

    let horizontalSection = document.querySelector(".horizontal-section"); // 가로스크롤 가능영역
    let scrollMax = (horizontalSection.offsetWidth - window.innerWidth); // 가로스크롤 가능 MAX넓이

    horizontalSection.style.transform = `translateX(${horizontalBoxTitle}px)`; // 가로위치 초기화

    window.addEventListener("scroll", function () {
        let verticalScrollPos = window.scrollY; // 세로 스크롤 위치
        let scrollProgress = (verticalScrollPos - horizontalBoxTop) / horizontalBox.offsetHeight; // 가로 스크롤 진행수치 (0~2)
        
        // console.log("세로 스크롤 위치:", verticalScrollPos);
        // console.log("가로 스크롤 진행수치:", scrollProgress);

        // 가로 스크롤 transform 진행
        let transformValue = -scrollProgress * scrollMax;
        if (scrollProgress > 0 && scrollProgress <= 2) {
            console.log("translateX:", transformValue);
            horizontalSection.style.transform = `translateX(${transformValue}px)`;
        } else {
            horizontalSection.style.transform = `translateX(${horizontalBoxTitle}px)`; // 가로위치 초기화
        }

        // 가로 스크롤 transform 정지
        if (scrollProgress > 2) {
          horizontalSection.style.transform = `translateX(${-2 * scrollMax}px)`;
        }
        
    }); /// end 가로스크롤 영역 ///
}, 3000); //// 3초후 실행 ////

// 햄버거 메뉴 start
var burger = document.querySelector('.menu-trigger');
var submenu = document.querySelector('.sub-menu');
burger.addEventListener('click', ()=>{
    burger.classList.toggle('on');
    submenu.classList.toggle('on');
}) //// 햄버거 메뉴 end ////

// 퀵메뉴 상담하기 팝업창 start
var qMenu = document.querySelector('.quick-btn');
var contactBg = document.querySelector('.contact-bg');
var contactBox = document.querySelector('.contact-area');
var closeBtn = document.querySelector('.close-btn');

qMenu.addEventListener('click', ()=>{
    contactBg.style.display = 'block';
    contactBg.classList.add('on');
    setTimeout(()=>{
        contactBox.style.top = 'calc(50% - 80vh / 2)';
    }, 100);
});
closeBtn.addEventListener('click', ()=>{
    contactBg.classList.remove('on');
    setTimeout(()=>{
        contactBox.style.top = '100vh';
        contactBg.style.display = 'none';
    }, 100);
});

// .contact-area 바깥쪽 .contact-bg 부모요소만 클릭했을 때 이벤트 발생
contactBg.addEventListener('click', (e)=>{
    if(e.target === contactBg){
        contactBg.classList.remove('on');
        setTimeout(()=>{
            contactBox.style.top = '100vh';
            contactBg.style.display = 'none';
        }, 100);
    }
}); //// 퀵메뉴 상담하기 팝업창 end ////
