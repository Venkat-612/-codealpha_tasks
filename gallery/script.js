// Gallery Lightbox and Navigation
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;
let images = [];

function updateImages() {
    images = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"]) img'));
}

function showLightbox(index) {
    updateImages();
    if (images.length === 0) return;
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.classList.remove('hidden');
}

galleryItems.forEach((img, idx) => {
    img.addEventListener('click', () => {
        updateImages();
        const visibleImages = images;
        const visibleIndex = visibleImages.indexOf(img);
        showLightbox(visibleIndex);
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

prevBtn.addEventListener('click', () => {
    updateImages();
    if (images.length === 0) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
});

nextBtn.addEventListener('click', () => {
    updateImages();
    if (images.length === 0) return;
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
});

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape') closeBtn.click();
});

// Filter functionality
const filterNav = document.getElementById('filter-nav');
const filterButtons = filterNav.querySelectorAll('button');
const galleryItemDivs = document.querySelectorAll('.gallery-item');

filterNav.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.getAttribute('data-filter');
    galleryItemDivs.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
    updateImages();
});

// Smooth transitions for gallery items
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});
