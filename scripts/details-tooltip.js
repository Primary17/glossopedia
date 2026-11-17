const details = document.getElementById("details");

const tooltip = document.createElement("p");
tooltip.className = "details-tooltip";
tooltip.textContent = "Ваша думка для нас важлива! Конкретизуйте мету звернення, будь ласка.";
document.body.appendChild(tooltip);

function placeTooltip() {
    const rect = details.getBoundingClientRect();
    tooltip.style.top = rect.top + "px";
    tooltip.style.left = rect.right + 16 + "px";
}

details.addEventListener("mouseenter", () => {
    details.classList.add("is-highlighted");
    placeTooltip();
    tooltip.classList.add("is-visible");
});

details.addEventListener("mouseleave", () => {
    details.classList.remove("is-highlighted");
    tooltip.classList.remove("is-visible");
});

window.addEventListener("resize", () => {
    if (tooltip.classList.contains("is-visible")) {
        placeTooltip();
    }
});
