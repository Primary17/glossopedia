const toggle = document.getElementsByClassName("topic-accordion-toggle")[0];
const list = document.getElementsByClassName("topic-list")[0];

function placeList() {
    list.style.top = toggle.getBoundingClientRect().bottom + "px";
    list.style.left = toggle.getBoundingClientRect().left + "px";
}

toggle.addEventListener("click", () => {
    const willOpen = list.hidden;
    list.hidden = !willOpen;
    toggle.setAttribute("data-expanded", String(willOpen));
    if (willOpen) {
        placeList();
    }
});

list.addEventListener("click", (event) => {
    if (!event.target.closest("a")) {
        return;
    }
    list.hidden = true;
    toggle.setAttribute("data-expanded", "false");
});

window.addEventListener("resize", () => {
    if (!list.hidden) {
        placeList();
    }
});
