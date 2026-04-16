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

menu.addEventListener("click", () => {
    menu.classList.add("click-effect");

    setTimeout(() => {
        menu.classList.remove("click-effect");
    }, 600);
}); 

mobileNavbar.init();

const icon = document.getElementById("icon");

icon.addEventListener("click", () => {
  icon.classList.toggle("fi-rr-menu-burger");
  icon.classList.toggle("fi-rr-cross-small");
});

let currentSlide = 1;
const totalSlides = document.querySelectorAll('input[name="radio-btn"]').length;

if (totalSlides > 0) {
    setInterval(() => {
        currentSlide += 1;

        if (currentSlide > totalSlides) {
            currentSlide = 1;
        }

        const activeRadio = document.getElementById(`radio${currentSlide}`);
        if (activeRadio) {
            activeRadio.checked = true;
        }
    }, 8000);
}
