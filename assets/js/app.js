"use strict";
const carousel = document.getElementById('carousel');
let index = 0;
const totalCards = carousel.children.length;
function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}
function nextSlide() {
    index = (index + 1) % totalCards;
    updateCarousel();
}
function prevSlide() {
    index = (index - 1 + totalCards) % totalCards;
    updateCarousel();
}
let autoSlide = setInterval(nextSlide, 4000);
const carouselWrapper = document.querySelector('.carousel-wrapper');
carouselWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});
carouselWrapper.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 4000);
});
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 104) {
            navbar.classList.add('sticky');
        }
        else {
            navbar.classList.remove('sticky');
        }
    }
});
