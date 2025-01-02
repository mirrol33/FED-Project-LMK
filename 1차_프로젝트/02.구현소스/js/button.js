$(() => {
  // 더보기 버튼 마우스 오버시 함수
  $(".button_su_inner").mouseenter(function (e) {
    var parentOffset = $(this).offset();

    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".su_button_circle").css({left: relX, top: relY});
    $(this).prev(".su_button_circle").removeClass("desplode-circle");
    $(this).prev(".su_button_circle").addClass("explode-circle");
    $(this).css({color: "#fff"});
    $(this).children("svg").css({fill: "#fff"});
    $(".more-btn a").css({borderColor: "#fff"});
  });

  // 더보기 버튼 마우스 아웃시 함수
  $(".button_su_inner").mouseleave(function (e) {
    var parentOffset = $(this).offset();

    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".su_button_circle").css({left: relX, top: relY});
    $(this).prev(".su_button_circle").removeClass("explode-circle");
    $(this).prev(".su_button_circle").addClass("desplode-circle");
    $(this).css({color: "#777"});
    $(this).children("svg").css({fill: "#777"});
    $(".more-btn a").css({borderColor: "#777"});
  });

  // DOM요소 (검색버튼, 햄버거메뉴)
  const $searchBtn = $(".search-icon");
  const $searchBox = $(".search-area");
  const $burger = $(".menu-trigger");
  const $submenu = $(".sub-menu");

  // "on" 클래스 제거 함수
  function removeOnClasses(...elements) {
    elements.forEach((element) => element.removeClass("on"));
  }
  // burger와 submenu의 "on" 클릭 토글
  $searchBtn.click(() => {
    $searchBtn.toggleClass("on");
    $searchBox.toggleClass("on");
    removeOnClasses($burger, $submenu);
  });
  // searchBtn과 searchBox의 "on" 클릭 토글
  $burger.click(() => {
    $burger.toggleClass("on");
    $submenu.toggleClass("on");
    removeOnClasses($searchBtn, $searchBox);
  });

  // 퀵메뉴 상담하기 팝업창
  function quickBtn() {
    const $contactBg = $(".contact-bg");
    const $contactBox = $(".contact-area");

    // 공통 toggleClass 함수
    const toggleContact = () => {
      $contactBg.toggleClass("on");
      $contactBox.toggleClass("on");
    };

    // 상담하기 버튼 클릭함수
    $(".contact-menu, .quick-btn, .contact-close-btn, .contact-bg").click(function (e) {
      toggleContact();
      e.stopPropagation();
    });
  }

  quickBtn(); // 상담하기 퀵버튼 함수 호출!

// 상담하기 폼 슬라이드 영역
const $formBtns = $(".form-btns > span");
const $formSlideBox = $(".box-inner > ul");
const $formStep = $(".contact-process > ul > li");
const $firstBtn = $(".first");
const $requiredInputs = $formSlideBox.find("input[required]");
const $privacyCheckbox = $("#privacy");

const total = 4; // 총 슬라이드 개수
let Num = 0;
let goOk = false; // 광클금지 변수

// 초기화
$firstBtn.on("click", resetForm);
$formBtns.on("click", handleButtonClick);

// 버튼 클릭 핸들러
function handleButtonClick(e) {
  e.preventDefault();
  setTimeout(() => {
    goOk = true;
  },400);
  if(!goOk) return;
  if ($(this).hasClass("submit")) {
    submitCheck();
    goOk = false;
  } else {
    goSlide($(this).hasClass("next"));
    goOk = false;
  }
}

// 슬라이드 업데이트
function updateSlide() {
  $formStep.removeClass("active").eq(Num).addClass("active");
  $formSlideBox.css({
    transform: `translateX(-${Num * 100}%)`,
    transition: "transform 0.5s ease",
  });
  updateButtonState();
}

// 초기화 함수
function resetForm() {
  Num = 0;
  $formBtns.addClass("off");
  $formSlideBox.css({
    transform: "translateX(0%)",
    transition: "transform 0.5s ease",
  });
  $formStep.removeClass("active").eq(Num).addClass("active");
  $requiredInputs.val("").css("border", "0");
  updateButtonState();
}

// 필수 입력 확인
function submitCheck() {
  let allValid = true;

  $requiredInputs.each(function () {
    const isValid = $(this).val().trim() !== "";
    $(this).css("border", isValid ? "0" : "2px solid var(--color-bg-red)");
    allValid = allValid && isValid;
  });

  if (!$privacyCheckbox.is(":checked")) {
    alert("개인정보 처리방침에 동의해주세요!");
    return;
  }

  if (allValid) {
    Num++;
    updateSlide();
  } else {
    alert("필수 항목을 입력해주세요!");
    Num = 0; // 첫 번째 슬라이드로 이동
    updateSlide();
  }
}

// 슬라이드 이동
function goSlide(isNext) {
  if (isNext && Num < total) {
    Num++;
  } else if (!isNext && Num > 0) {
    Num--;
  }
  updateSlide();
}

// 버튼 상태 업데이트
function updateButtonState() {
  $formBtns.eq(0).toggle(Num > 0 && Num < 3); // 이전 버튼
  $formBtns.eq(1).toggle(Num >= 0 && Num < 2); // 다음 버튼
  $formBtns.eq(2).toggle(Num === 2); // 상담신청하기 버튼
}

// 초기 상태 설정
updateButtonState();


});
