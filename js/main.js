// Strict 모드 설정
'use strict';

(() => {
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
  let currentItem = graphicElems[0];
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = Number(entries[0].target.dataset.index);
  });

  // data-index 속성 초기화
  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  // 컨텐츠 활성화
  function activate() {
    currentItem.classList.add('visible');
  }

  // 컨텐츠 비활성화
  function inactivate() {
    currentItem.classList.remove('visible');
  }

  // 스크롤 시 이벤트 처리
  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    // for (let i = 0; i < stepElems.length; i++) {
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];

      if (!step) {
        continue;
      }

      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate();
        // 스크롤 위치에 따라 현재 컨텐츠 변경
        currentItem = graphicElems[step.dataset.index];
        activate();
      }
    }
  });

  // 첫 번째 컨텐츠 활성화
  activate();
})();
