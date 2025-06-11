const carousel = document.getElementById('carousel') as HTMLElement;
let index: number = 0;
const totalCards: number = carousel.children.length;

function updateCarousel(): void {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide(): void {
    index = (index + 1) % totalCards;
    updateCarousel();
}

function prevSlide(): void {
    index = (index - 1 + totalCards) % totalCards;
    updateCarousel();
}

let autoSlide: ReturnType<typeof setInterval> = setInterval(nextSlide, 4000);

const carouselWrapper = document.querySelector('.carousel-wrapper') as HTMLElement;

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
        } else {
            navbar.classList.remove('sticky');
        }
    }
});
