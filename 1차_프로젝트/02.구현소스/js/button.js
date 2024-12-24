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

  // 상담하기폼 가로 슬라이드
  // DOM 요소 대상 선정
  const $formBtns = $(".form-btns>span");
  const $formSlideBox = $(".box-inner>ul");
  const $formStep = $(".contact-process>ul>li");
  const $submitBtn = $("#submit")
  const total = 4; // 총 슬라이드 개수
  let Num = 0;

  updateButtonState();

  // 각 버튼에 이벤트 리스너 추가
  $formBtns.on("click", function (e) {
    e.preventDefault(); // 기본 이벤트 방지
    if($(this).hasClass("submit")) {
      submitCheck();
    } else {
      goSlide($(this).hasClass("next"));
    }
  });
  
  function submitCheck() {    
    let inputVal = $formSlideBox.find("input[required]");
    console.log(inputVal.val());
    if(inputVal.val()) {
      Num++;
      $formStep.removeClass("active").eq(Num).addClass("active");
      $formSlideBox.css({
        transform: `translateX(-${Num * 100}%)`,
        transition: "transform 0.5s ease",
      });
      updateButtonState();
    } else {
      alert("필수 항목을 입력해주세요!");
    }
  }

  // 슬라이드 함수
  function goSlide(isNext) {
    if (isNext && Num < total) {
      Num++;
      $formStep.removeClass("active").eq(Num).addClass("active");
    } else if (!isNext && Num > 0) {
      Num--;
      $formStep.removeClass("active").eq(Num).addClass("active");
    }
    $formSlideBox.css({
      transform: `translateX(-${Num * 100}%)`,
      transition: "transform 0.5s ease",
    });
    updateButtonState();
  }

  // 이전,다음 노출 함수
  function updateButtonState() {
    $formBtns.eq(0).css("display", Num == 0 || Num == 3 ? "none" : "inline-block"); // 이전 버튼
    $formBtns.eq(1).css("display", Num >= 0 && Num < 2 ? "inline-block" : "none"); // 다음 버튼
    $formBtns.eq(2).css("display", Num == 2 ? "inline-block" : "none"); // 상담신청하기 버튼
  }
});
