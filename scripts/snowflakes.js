const backgroundContainer = document.getElementsByClassName("snow-background")[0];
const foregroundContainer = document.getElementsByClassName("snow-foreground")[0];
const header = document.getElementsByTagName("header")[0];
const title = header.getElementsByTagName("h1")[0];

function glyphHeight(text, font) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return (metrics.actualBoundingBoxAscent || 0) + (metrics.actualBoundingBoxDescent || 0);
}

const titleStyle = getComputedStyle(title);
const titleFont = `${titleStyle.fontStyle} ${titleStyle.fontWeight} ${titleStyle.fontSize} ${titleStyle.fontFamily}`;
const capitalHeight = glyphHeight(title.textContent.trim()[0], titleFont) || parseFloat(titleStyle.fontSize) * 0.7;
const minSnowflakeHeight = capitalHeight * 2;

function snowflakeSize() {
    const probeFont = (size) => `400 ${size}px ${titleStyle.fontFamily}, sans-serif`;
    let size = minSnowflakeHeight * 2;
    const measured = glyphHeight("❄", probeFont(size));

    size = size * (minSnowflakeHeight * 1.2) / measured;

    return size + Math.random() * capitalHeight;
}

function createSnowflake() {
    const snowflake = document.createElement("div");

    snowflake.classList.add("snowflake");
    snowflake.textContent = "❄";
    snowflake.style.top = Math.random() * 60 - 10 + "%";
    snowflake.style.fontSize = snowflakeSize() + "px";

    const duration = 5 + Math.random() * 5;
    snowflake.style.animationDuration = duration + "s";

    const container = Math.random() < 0.5 ? backgroundContainer : foregroundContainer;

    container.appendChild(snowflake);

    snowflake.addEventListener("animationend", () => {
        snowflake.remove();
    });
}

setInterval(createSnowflake, 1000);
createSnowflake();