const form = document.getElementsByClassName("article-search")[0];
const field = document.getElementById("article-search");
const article = document.getElementsByTagName("main")[0];

function clearMarks() {
    article.querySelectorAll("mark.search-hit").forEach((mark) => {
        mark.replaceWith(document.createTextNode(mark.textContent));
    });
    article.normalize();
}

function highlight(query) {
    clearMarks();
    const term = query.trim();
    if (!term) {
        return;
    }

    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(escaped, "gi");
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    const nodes = [];

    while (walker.nextNode()) {
        nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
        const text = node.nodeValue;
        if (!text || !pattern.test(text)) {
            return;
        }
        pattern.lastIndex = 0;

        const fragment = document.createDocumentFragment();
        let last = 0;
        let match = pattern.exec(text);

        while (match) {
            fragment.append(text.slice(last, match.index));
            const mark = document.createElement("mark");
            mark.className = "search-hit";
            mark.textContent = match[0];
            fragment.append(mark);
            last = match.index + match[0].length;
            match = pattern.exec(text);
        }

        fragment.append(text.slice(last));
        node.parentNode.replaceChild(fragment, node);
    });
}

field.addEventListener("input", () => {
    highlight(field.value);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    highlight(field.value);
    const first = article.querySelector("mark.search-hit");
    if (first) {
        first.scrollIntoView({ behavior: "smooth", block: "center" });
    }
});
