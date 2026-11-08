
const track = document.getElementById("testimonialTrack");
const cards = document.querySelectorAll(".testimonial-card");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const dotsContainer = document.getElementById("dots");
const carousel = document.querySelector(".carousel-container");

let currentIndex = 0;
let autoSlide;

function getVisibleCards() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}

function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCards());
}

// Create navigation dots
function createDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i <= getMaxIndex(); i++) {
        const dot = document.createElement("button");

        dot.classList.add("dot");
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

        dot.addEventListener("click", () => {
            currentIndex = i;
            updateCarousel();
            resetAutoSlide();
        });

        dotsContainer.appendChild(dot);
    }
}

// Update carousel position
function updateCarousel() {
    const gap = 20;
    const cardWidth = cards[0].getBoundingClientRect().width;

    track.style.transform =
        `translateX(-${currentIndex * (cardWidth + gap)}px)`;

    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === getMaxIndex();

    prevBtn.style.opacity = prevBtn.disabled ? "0.4" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.4" : "1";
}

// Next slide
function nextSlide() {
    if (currentIndex < getMaxIndex()) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }

    updateCarousel();
}

// Previous slide
function previousSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = getMaxIndex();
    }

    updateCarousel();
}

// Automatic sliding
function startAutoSlide() {
    stopAutoSlide();

    if (getMaxIndex() > 0) {
        autoSlide = setInterval(nextSlide, 4000);
    }
}

function stopAutoSlide() {
    clearInterval(autoSlide);
}

function resetAutoSlide() {
    startAutoSlide();
}

// Button events
nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
    previousSlide();
    resetAutoSlide();
});

// Pause when mouse enters
carousel.addEventListener("mouseenter", stopAutoSlide);

// Resume when mouse leaves
carousel.addEventListener("mouseleave", startAutoSlide);

// Responsive resizing
window.addEventListener("resize", () => {
    currentIndex = Math.min(currentIndex, getMaxIndex());

    createDots();
    updateCarousel();
    startAutoSlide();
});

// Initialize
createDots();
updateCarousel();
startAutoSlide();
