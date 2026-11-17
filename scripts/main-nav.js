const narrowWidth = 768;

function placeNav() {
    document.body.classList.toggle("nav-vertical", window.innerWidth <= narrowWidth);
}

placeNav();
window.addEventListener("resize", placeNav);
