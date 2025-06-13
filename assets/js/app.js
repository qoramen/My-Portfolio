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
/* ==================================================
   Sticky Navigation
================================================== */
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
/**
 * Load projects dynamically from a JSON file
 */
function loadProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch('projects.json');
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
            console.error('Error loading projects JSON:', error);
        }
    });
}
/* ==================================================
   Comment Section
================================================== */
const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');
const commentCount = document.getElementById('comment-count');
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('commentName');
    const messageInput = document.getElementById('commentMessage');
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (name.length < 3 || message.length === 0)
        return;
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
        <div class="comment-header">
            <div class="avatar-wrap">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="comment-info">
                <strong>${name}</strong>
                <div class="comment-time">${formatTimeAgo(new Date())}</div>
            </div>
        </div>
        <div class="comment-body">${message}</div>
    `;
    commentList.prepend(commentDiv);
    commentCount.textContent = String(commentList.children.length);
    nameInput.value = '';
    messageInput.value = '';
});
/**
 * Format time in "x minutes/hours/days ago" style
 */
function formatTimeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60)
        return `${diff}s ago`;
    if (diff < 3600)
        return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)
        return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}
function loadSkills() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch('skills.json');
            const skills = yield res.json();
            const container = document.getElementById('skillsContainer');
            skills.forEach(skill => {
                const skillDiv = document.createElement('div');
                skillDiv.className = 'skill';
                skillDiv.innerHTML = `
              <div class="skill-info">
                <span>${skill.name}</span>
                <span>${skill.level}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" data-width="${skill.level}%"></div>
              </div>
            `;
                container.appendChild(skillDiv);
            });
            animateProgressBars();
        }
        catch (err) {
            console.error('Error loading skills.json:', err);
        }
    });
}
/**
 * Animate progress bars when they come into view
 */
function animateProgressBars() {
    const bars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const width = el.getAttribute('data-width');
                if (width)
                    el.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    bars.forEach(bar => observer.observe(bar));
}
function loadAboutInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch('about.json');
            const data = yield res.json();
            const aboutContainer = document.getElementById('aboutInfo');
            if (!aboutContainer)
                return;
            aboutContainer.innerHTML = `
            <h2 class="section-title">About Me</h2>
            <ul class="about-list">
                <li><strong>Full Name:</strong> ${data.name}</li>
                <li><strong>Birthday:</strong> ${data.birthday}</li>
                <li><strong>Age:</strong> ${data.age}</li>
                <li><strong>Email:</strong> ${data.email}</li>
                <li><strong>Phone:</strong> ${data.phone}</li>
                <li><strong>Location:</strong> ${data.location}</li>
                <li><strong>Freelance:</strong> ${data.freelance}</li>
                <li><strong>Experience:</strong> ${data.experience}</li>
            </ul>
        `;
        }
        catch (error) {
            console.error('Error loading about.json:', error);
        }
    });
}
/* ==================================================
   Initialize Everything on Page Load
================================================== */
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadSkills();
    loadAboutInfo();
});
