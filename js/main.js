/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
// Исходные данные по слайдеру (const)
const sliderCard = document.querySelectorAll('.slider__card'),
  sliderLine = document.querySelector('.slider__line'),
  sliderDots = document.querySelectorAll('.slider__dot'),
  sliderBtnNext = document.querySelector('.slider__btn-next'),
  sliderBtnPrev = document.querySelector('.slider__btn-prev');

// Переменные
let sliderCount = 0,
  sliderWidth,
  isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID;

// Адаптивность слайдера
window.addEventListener('resize', showSlide);

// Кнопки управления слайдов вперед и назад
sliderBtnNext.addEventListener('click', nextSlide);
sliderBtnPrev.addEventListener('click', prevSlide);

// Функции ==================

// Начать демонстрацию
function demo() {
  document.querySelector('.demo').style.display = "none";
  showSlide();
}
;
document.getElementById('demo').addEventListener('click', () => {
  setTimeout(demo, 5000);
});

// Задает нужную ширину картинки и sliderLine
function showSlide() {
  sliderWidth = document.querySelector('.slider').offsetWidth;
  sliderLine.style.width = sliderWidth * sliderCard.length + 'px';
  sliderCard.forEach(item => item.style.width = sliderWidth + 'px');
  rollSlider();
}

// Перелистывает слайд вперед
function nextSlide() {
  sliderCount++;
  if (sliderCount >= sliderCard.length) sliderCount = 0;
  rollSlider();
  thisSlide(sliderCount);
}

// Перелистывает слайд назад
function prevSlide() {
  sliderCount--;
  if (sliderCount < 0) sliderCount = sliderCard.length - 1;
  rollSlider();
  thisSlide(sliderCount);
}

// Задает шаг перемещения слайдов
function rollSlider() {
  sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

// Указывает какой слайд по счету активен
function thisSlide(index) {
  sliderDots.forEach(item => item.classList.remove('active-dot'));
  sliderDots[index].classList.add('active-dot');
}

// Вешает клик на dot
sliderDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    sliderCount = index;
    thisSlide(sliderCount);
    setPositionByIndex();
  });
});

// touch
// вешаем слушатель-события на каждый слайд

sliderCard.forEach((slide, index) => {
  // touch events
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);

  // откл меню при удержании
  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
});
function getPositionX(event) {
  return event.touches[0].clientX;
}

// получаем индекс слайда, позицию клика
function touchStart(index) {
  return function (event) {
    sliderCount = index;
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
  };
}

// текущее перемещенее
function touchMove(event) {
  if (isDragging) {
    const currentPos = getPositionX(event);
    currentTranslate = prevTranslate + currentPos - startPos;
  }
}

// получаем дельту, определеяем направление смещения
function touchEnd() {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  // если перемещено достаточно негатива, то перейдите к следующему слайду, если он есть
  if (movedBy < -100 && sliderCount < sliderCard.length - 1) sliderCount += 1;

  // если перемещено достаточно позитивное, то перейдите к следующему слайду, если он есть
  if (movedBy > 100 && sliderCount > 0) sliderCount -= 1;
  setPositionByIndex();
  thisSlide(sliderCount);
}
function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

//  задаёт текущее перермещение
function setPositionByIndex() {
  currentTranslate = sliderCount * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}
function setSliderPosition() {
  sliderLine.style.transform = `translateX(${currentTranslate}px)`;
}
/******/ })()
;
//# sourceMappingURL=main.js.map