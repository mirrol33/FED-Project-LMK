window.addEventListener("DOMContentLoaded", loadFn); // 로드후 실행
window.addEventListener("resize", loadFn); // 리사이즈시 실행

function loadFn() {
    window.scrollTo(0, 0); // 스크롤 맨위로 이동
    document.body.style.overflow = "hidden"; // 로드시 스크롤바 숨김

    lenis.stop(); // lenis 스크롤 애니메이션 일시멈춤
    mainVideo(); // 동영상 자동재생 실행
    checkScrollPosition(); // 스크롤 메뉴바 실행
    burgerBtn(); // 햄버거 버튼 실행
    quickBtn(); // 상담하기 퀵버튼 실행
      

    // setTimeout start
    this.setTimeout(() => {
        lenis.start(); // lenis 스크롤 애니메이션 실행
        document.body.style.overflowY = "auto"; // 스크롤바 보이기
        initHorizontalScroll(); // 가로스크롤실행 여부 확인

        document.querySelector('.loading-area').classList.add('off'); // 로드화면 종료
    }, 2000); //// end setTimeout ////
}

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

// 모바일 기기 여부와 뷰포트 크기 확인 함수
const shouldRunHorizontalScroll = () => 
    !/iphone|ipad|ipod|android|blackberry|webos|windows phone/i.test(navigator.userAgent.toLowerCase()) && 
    window.innerWidth > 1200;

// 가로스크롤 영역 함수
function horizontalScroll() {    
    const horizontalBox = document.querySelector(".horizontal-box");
    const horizontalBoxTop = document.querySelector(".section-03").offsetTop;
    const horizontalBoxTitle = document.querySelector(".product-title-box").offsetLeft;

    const horizontalSection = document.querySelector(".horizontal-section");
    const scrollMax = horizontalSection.offsetWidth - window.innerWidth;

    horizontalSection.style.transform = `translateX(${horizontalBoxTitle}px)`;

    window.addEventListener("scroll", () => {
        const verticalScrollPos = window.scrollY;
        const scrollProgress = (verticalScrollPos - horizontalBoxTop) / horizontalBox.offsetHeight;
        const transformValue = -scrollProgress * scrollMax;

        if (scrollProgress > 0 && scrollProgress <= 2) {
            horizontalSection.style.transform = `translateX(${transformValue}px)`;
        } else if (scrollProgress > 2) {
            horizontalSection.style.transform = `translateX(${-2 * scrollMax}px)`;
        } else {
            horizontalSection.style.transform = `translateX(${horizontalBoxTitle}px)`;
        }
    }); 
}

// 가로스크롤 실행 조건에 따라 함수 실행
// 모바일기기 여부 확인
if (shouldRunHorizontalScroll()) {
    horizontalScroll();
}
// 가로스크롤 실행여부 확인 함수
function initHorizontalScroll() {
    if (shouldRunHorizontalScroll()) {
        horizontalScroll();
    }
}


function burgerBtn(){
    // 햄버거 메뉴 start
    var burger = document.querySelector('.menu-trigger');
    var submenu = document.querySelector('.sub-menu');
    burger.addEventListener('click', ()=>{
        burger.classList.toggle('on');
        submenu.classList.toggle('on');
    }) /// 햄버거 메뉴 end ///
}

function quickBtn(){
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
        contactBox.style.top = '100vh';
        setTimeout(()=>{
            contactBg.style.display = 'none';
        }, 1000);
    });
    
    // .contact-area 요소 바깥쪽 .contact-bg 부모요소만 클릭했을 때 이벤트 발생
    contactBg.addEventListener('click', (e)=>{
        if(e.target === contactBg){
            contactBg.classList.remove('on');
            contactBox.style.top = '100vh';
            setTimeout(()=>{
                contactBg.style.display = 'none';
            }, 1000);
        }
    }); //// 퀵메뉴 상담하기 팝업창 end ////
}