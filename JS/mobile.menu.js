class MobileNavbar{
    constructor(mobileMenu, navlist, navLinks){
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navlist);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log(this)
        this.mobileMenu.classList.toggle(this.activeClass);
        this.navList.classList.toggle(this.activeClass);
    }

    addClickEvent(){
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init(){
        if (this.mobileMenu){
            this.addClickEvent();
        }
        return this;
    }
}
    const mobileNavbar = new MobileNavbar(
        ".menuham",
        ".nav-list",
        ".nav-list li",
)

const menu = document.querySelector(".menuham");

if (menu) {
    menu.addEventListener("click", () => {
        menu.classList.add("click-effect");

        setTimeout(() => {
            menu.classList.remove("click-effect");
        }, 600);
    });
}

mobileNavbar.init();

const icon = document.getElementById("icon");

if (icon) {
    icon.addEventListener("click", () => {
        icon.classList.toggle("fi-rr-menu-burger");
        icon.classList.toggle("fi-rr-cross-small");
    });
}

let currentSlide = 1;
const radioButtons = Array.from(document.querySelectorAll('input[name="radio-btn"]'));
const totalSlides = radioButtons.length;
let autoplayIntervalId = null;
let autoplayResumeTimeoutId = null;
let isAutoplayPaused = false;
const AUTOPLAY_INTERVAL_MS = 8000;
const AUTOPLAY_RESUME_DELAY_MS = 10000;

function showSlide(slideNumber) {
    if (totalSlides === 0) {
        return;
    }

    currentSlide = slideNumber;

    if (currentSlide > totalSlides) {
        currentSlide = 1;
    }

    if (currentSlide < 1) {
        currentSlide = totalSlides;
    }

    const activeRadio = document.getElementById(`radio${currentSlide}`);
    if (activeRadio) {
        activeRadio.checked = true;
    }
}

function pauseAutoplay() {
    isAutoplayPaused = true;
    if (autoplayIntervalId) {
        clearInterval(autoplayIntervalId);
        autoplayIntervalId = null;
    }
}

function scheduleAutoplayResume() {
    if (autoplayResumeTimeoutId) {
        clearTimeout(autoplayResumeTimeoutId);
    }

    autoplayResumeTimeoutId = setTimeout(() => {
        isAutoplayPaused = false;
        startAutoplay();
    }, AUTOPLAY_RESUME_DELAY_MS);
}

function registerManualInteraction() {
    pauseAutoplay();
    scheduleAutoplayResume();
}

function startAutoplay() {
    if (totalSlides === 0 || isAutoplayPaused) {
        return;
    }

    if (autoplayIntervalId) {
        return;
    }

    autoplayIntervalId = setInterval(() => {
        goToNextSlide();
    }, AUTOPLAY_INTERVAL_MS);
}

if (totalSlides > 0) {
    const checkedSlide = radioButtons.findIndex((radio) => radio.checked);
    if (checkedSlide >= 0) {
        currentSlide = checkedSlide + 1;
    }

    startAutoplay();

    radioButtons.forEach((radio, index) => {
        radio.addEventListener("change", () => {
            currentSlide = index + 1;
            registerManualInteraction();
        });
    });
}

let touchStartX = 0;
let touchEndX = 0;

const imagens = document.querySelector('.imagens');

if (imagens) {
    imagens.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    imagens.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        registerManualInteraction();

        if (diff > 0) {
            goToNextSlide();
        } else {
            goToPreviousSlide();
        }
    }
}

function goToNextSlide() {
    showSlide(currentSlide + 1);
}

function goToPreviousSlide() {
    showSlide(currentSlide - 1);
}