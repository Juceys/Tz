// Исходные данные по слайдеру (const)

const
  sliderCard = document.querySelectorAll('.slider__card'),
  sliderLine = document.querySelector('.slider__line'),
  sliderDots = document.querySelectorAll('.slider__dot'),
  sliderBtnNext = document.querySelector('.slider__btn-next'),
  sliderBtnPrev = document.querySelector('.slider__btn-prev');

// Переменные
let sliderCount = 0,
  sliderWidth;

// Адаптивность слайдера
window.addEventListener('resize', showSlide);

// Кнопки управления слайдов вперед и назад
sliderBtnNext.addEventListener('click', nextSlide);
sliderBtnPrev.addEventListener('click', prevSlide);


// Функции ==================

// Начать демонстрацию
function demonstration() {
  document.querySelector('.demonstration').style.display = "none";
  showSlide();
};

document.getElementById('demo').addEventListener('click', () => {
  setTimeout(demonstration, 5000);
})

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
    rollSlider();
    thisSlide(sliderCount);
  })
})
