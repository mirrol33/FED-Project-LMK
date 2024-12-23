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

  $searchBtn.click(() => {
    $searchBtn.toggleClass("on");
    $searchBox.toggleClass("on");
    removeOnClasses($burger, $submenu); // burger와 submenu의 "on" 제거
  });

  $burger.click(() => {
    $burger.toggleClass("on");
    $submenu.toggleClass("on");
    removeOnClasses($searchBtn, $searchBox); // searchBtn과 searchBox의 "on" 제거
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

    // 상담하기 버튼 클릭시
    $(".contact-menu, .quick-btn a, .contact-close-btn a, .contact-bg").click((e) => {
      toggleContact();
      e.stopPropagation();
      console.log("클릭됨!!");
    });
  }

  quickBtn(); // 상담하기 퀵버튼 실행
});
