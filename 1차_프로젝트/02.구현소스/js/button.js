$(()=>{
     quickBtn(); // 상담하기 퀵버튼 실행
})

// 더보기 버튼 마우스 오버시 함수
$( ".button_su_inner" ).mouseenter(function(e) {
    var parentOffset = $(this).offset();
   
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
    $(this).prev(".su_button_circle").removeClass("desplode-circle");
    $(this).prev(".su_button_circle").addClass("explode-circle");
    $(this).css({color:"#fff"});
    $(this).children("svg").css({fill:"#fff"});
    $(".more-btn a").css({borderColor:"#fff"});
 });

 // 더보기 버튼 마우스 아웃시 함수
 $( ".button_su_inner" ).mouseleave(function(e) { 
      var parentOffset = $(this).offset();
 
      var relX = e.pageX - parentOffset.left;
      var relY = e.pageY - parentOffset.top;
      $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
      $(this).prev(".su_button_circle").removeClass("explode-circle");
      $(this).prev(".su_button_circle").addClass("desplode-circle");
      $(this).css({color:"#777"});
      $(this).children('svg').css({fill:"#777"});
      $(".more-btn a").css({borderColor:"#777"});
 });

// 검색버튼, 햄버거메뉴 선택자 변수
var searchBtn = $(".search-icon");
var searchBox = $(".search-area");
var burger = $('.menu-trigger');
var submenu = $('.sub-menu');

// "on" 클래스 제거 함수
function removeOnClasses(...elements) {
    elements.forEach(element => element.removeClass('on'));
}

searchBtn.click(() => {
    searchBtn.toggleClass("on");
    searchBox.toggleClass("on");
    removeOnClasses(burger, submenu); // burger와 submenu의 "on" 제거
});

burger.click(() => {
    burger.toggleClass("on");
    submenu.toggleClass("on");
    removeOnClasses(searchBtn, searchBox); // searchBtn과 searchBox의 "on" 제거
});


 // 퀵메뉴 상담하기 팝업창
 function quickBtn(){
      var $qMenu = $('.quick-btn a');
      var $contactBg = $('.contact-bg');
      var $contactBox = $('.contact-area');
      var $closeBtn = $('.close-btn');

      $qMenu.click(()=>{
          $contactBg.toggleClass('on');
          $contactBox.toggleClass('on');
      });
      $closeBtn.click(()=>{
          $contactBg.toggleClass('on');
          $contactBox.toggleClass('on');
      });
      $contactBg.click(()=>{
          $contactBg.toggleClass('on');
          $contactBox.toggleClass('on');
      });
 }
