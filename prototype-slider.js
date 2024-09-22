function Slider(container, config) { 
  this.container = container;
  this.slides = config.slides;
  this.interval = config.interval || 2000;
  this.currentSlide = 0;
  this.isPaused = false;

  this.init();
}

Slider.prototype.init = function () {
  this.renderSlides();
  this.createControls();
  this.startAutoplay();
  this.addHoverPause();
};

Slider.prototype.renderSlides = function () {
  const slidesWrapper = document.createElement('div');
  slidesWrapper.classList.add('slides');

  this.slides.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slide');
    if (index === this.currentSlide) slideDiv.classList.add('active');

    const img = document.createElement('img');
    img.src = slide;
    img.alt = `Slide ${index + 1}`;
    slideDiv.appendChild(img);

    slidesWrapper.appendChild(slideDiv);
  });

  this.container.appendChild(slidesWrapper);
};

Slider.prototype.createControls = function () {
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Prev';
  prevButton.classList.add('prev');
  prevButton.addEventListener('click', () => this.prevSlide());

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.classList.add('next');
  nextButton.addEventListener('click', () => this.nextSlide());

  const pauseButton = document.createElement('button');
  pauseButton.textContent = 'Pause';
  pauseButton.classList.add('pause');
  pauseButton.addEventListener('click', () => this.togglePause());

  const indicators = document.createElement('div');
  indicators.classList.add('indicators');

  this.slides.forEach((_, index) => {
    const indicator = document.createElement('span');
    indicator.classList.add('indicator');
    if (index === this.currentSlide) indicator.classList.add('active');
    indicator.addEventListener('click', () => this.goToSlide(index));
    indicators.appendChild(indicator);
  });

  this.container.appendChild(prevButton);
  this.container.appendChild(nextButton);
  this.container.appendChild(pauseButton);
  this.container.appendChild(indicators);
};

Slider.prototype.startAutoplay = function () {
  this.slideInterval = setInterval(() => this.nextSlide(), this.interval);
};

Slider.prototype.nextSlide = function () {
  this.goToSlide((this.currentSlide + 1) % this.slides.length);
};

Slider.prototype.prevSlide = function () {
  this.goToSlide((this.currentSlide - 1 + this.slides.length) % this.slides.length);
};

Slider.prototype.goToSlide = function (n) {
  const slides = this.container.querySelectorAll('.slide');
  const indicators = this.container.querySelectorAll('.indicator');

  slides[this.currentSlide].classList.remove('active');
  indicators[this.currentSlide].classList.remove('active');

  this.currentSlide = n;

  slides[this.currentSlide].classList.add('active');
  indicators[this.currentSlide].classList.add('active');
};

Slider.prototype.togglePause = function () {
  if (this.isPaused) {
    this.startAutoplay();
    this.container.querySelector('.pause').textContent = 'Pause';
  } else {
    clearInterval(this.slideInterval);
    this.container.querySelector('.pause').textContent = 'Play';
  }
  this.isPaused = !this.isPaused;
};

Slider.prototype.addHoverPause = function () {
  this.container.addEventListener('mouseenter', () => {
    clearInterval(this.slideInterval);
  });

  this.container.addEventListener('mouseleave', () => {
    if (!this.isPaused) {
      this.startAutoplay();
    }
  });
};

// Инициализация слайдера
const sliderContainer = document.getElementById('prototype-slider');
const config = {
  slides: ['img/photo1.jpg', 'img/photo2.jpg', 'img/photo3.jpg'],
  interval: 3000,
};
const mySlider = new Slider(sliderContainer, config);