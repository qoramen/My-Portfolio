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

// Carousel Projects

interface Project {
    title: string;
    description: string;
    url: string;
}

const carousel = document.getElementById('carousel') as HTMLElement;
const carouselWrapper = document.querySelector('.carousel-wrapper') as HTMLElement;

let index: number = 0;

function updateCarousel(): void {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide(): void {
    index = (index + 1) % carousel.children.length;
    updateCarousel();
}

function prevSlide(): void {
    index = (index - 1 + carousel.children.length) % carousel.children.length;
    updateCarousel();
}

let autoSlide: ReturnType<typeof setInterval>;

function startAutoSlide(): void {
    autoSlide = setInterval(nextSlide, 4000);
}

function stopAutoSlide(): void {
    clearInterval(autoSlide);
}

carouselWrapper.addEventListener('mouseenter', stopAutoSlide)
carouselWrapper.addEventListener('mouseleave', startAutoSlide)

async function loadProjects(): Promise<void> {
    try {
        const res = await fetch('data.json')
        const projects: Project[] = await res.json()

        projects.forEach(project => {
            const box = document.createElement('div')
            box.className = 'box'
            box.innerHTML = `
                <div class="card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.url}" class="btn">View</a>
                </div>`
            carousel.appendChild(box)
        })

        updateCarousel()
        startAutoSlide()
    } catch (error) {
        console.log('JSON yuklashda xatolik:', error);        
    }
}

document.addEventListener('DOMContentLoaded', loadProjects)