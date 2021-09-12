// Strict 모드 설정
'use strict';

(() => {
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem = graphicElems[0]; // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정

  // data-index 속성 초기화
  for (let i = 0; i < stepElems.length; i++) {
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  // 스크롤 시 이벤트 처리
  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    for (let i = 0; i < stepElems.length; i++) {
      step = stepElems[i];
      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        if (currentItem) {
          currentItem.classList.remove('visible');
        }
        currentItem = graphicElems[step.dataset.index];
        currentItem.classList.add('visible');
      }
    }
  });
})();
