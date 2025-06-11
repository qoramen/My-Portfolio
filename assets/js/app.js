"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const carousel = document.getElementById('carousel');
const carouselWrapper = document.querySelector('.carousel-wrapper');
let index = 0;
function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}
function nextSlide() {
    index = (index + 1) % carousel.children.length;
    updateCarousel();
}
function prevSlide() {
    index = (index - 1 + carousel.children.length) % carousel.children.length;
    updateCarousel();
}
let autoSlide;
function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 4000);
}
function stopAutoSlide() {
    clearInterval(autoSlide);
}
carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
carouselWrapper.addEventListener('mouseleave', startAutoSlide);
function loadProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch('data.json');
            const projects = yield res.json();
            projects.forEach(project => {
                const box = document.createElement('div');
                box.className = 'box';
                box.innerHTML = `
                <div class="card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.url}" class="btn">View</a>
                </div>`;
                carousel.appendChild(box);
            });
            updateCarousel();
            startAutoSlide();
        }
        catch (error) {
            console.log('JSON yuklashda xatolik:', error);
        }
    });
}
document.addEventListener('DOMContentLoaded', loadProjects);
