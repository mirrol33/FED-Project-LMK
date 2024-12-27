window.addEventListener("load", function () {
  // 스크롤 등장 액션 실행
  window.addEventListener("scroll", scrollActFn);
  window.addEventListener("resize", () => {
    winH = window.innerHeight;
  });

  // 스크롤 대상 요소
  const scrollAct = document.querySelectorAll(".scroll-act");
  let winH = window.innerHeight; // 현재 윈도우 높이값

  function scrollActFn() {
    scrollAct.forEach((el) => {
      // 요소의 화면 상단으로부터의 위치
      let scrollActTop = el.getBoundingClientRect().top;

      // 스크롤 액션 실행
      if (scrollActTop < winH * 0.8) {
        el.classList.add("on");
      } else {
        el.classList.remove("on");
      }
    });
  }
});
