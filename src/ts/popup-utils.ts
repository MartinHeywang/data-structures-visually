import "../scss/popup.scss";

const graphicalRepresentationBox = document.querySelector<HTMLDivElement>(
    ".graphical-representation-box"
)!;
if (!graphicalRepresentationBox) {
    throw new Error("Can't use popup utils where there is no .graphical-representation-box :/");
}

const popups = Array.from(
    graphicalRepresentationBox.querySelectorAll<HTMLDivElement>("[class*='popup-']")
);

/*
    WARNING: order != index !
    the order is the value given by the markup, but this count may contain errors (missing numbers, doubles...)
    the index is the one we define here, and that is therefore reliable
*/

const orders = popups.map(popup => parseInt(popup.dataset.order!));
const indexToOrder = (idx: number) => orders[idx];

let currentIndex = 0;
const minIndex = 0;
const maxIndex = orders.length - 1;

const getVisiblePopup = () => popups[indexToOrder(currentIndex)];

const prevBtn = createBtn("Previous", "previous", prev);
const nextBtn = createBtn("Next", "next", next);
const buttons = document.createElement("div");
buttons.append(prevBtn, nextBtn);
buttons.classList.add("buttons");

function createBtn(text: string, className: string, onClick: (event: MouseEvent) => void) {
    const btn = document.createElement("button");
    btn.addEventListener("click", onClick);
    btn.textContent = text;
    btn.className = className;

    return btn;
}

function next() {
    // increment or set to -1 if unable to
    currentIndex = currentIndex >= maxIndex ? -1 : currentIndex + 1;

    refresh();
}

function prev() {
    // decrement or set to -1 if invalid
    currentIndex = currentIndex <= minIndex ? -1 : currentIndex - 1;

    refresh();
}

function refresh() {
    // hide all popups
    popups.forEach(popup => popup.classList.remove("popup--visible"));

    if (currentIndex === -1) return;

    // then show the right one
    const visiblePopup = getVisiblePopup();
    visiblePopup.classList.add("popup--visible");
    visiblePopup.appendChild(buttons);

    const { parentX } = updatePopupPos();

    // trying to scroll the box so the popup is fully visible
    // btw, can't use scrollIntoView() because the popup has a position of fixed

    // @ts-ignore
    const pageMargin = getComputedStyle(graphicalRepresentationBox).getPropertyValue("padding-left");
    const pageMarginPixels = parseFloat(pageMargin); // the 'px' unit at the end of the string is no problem for parseFloat()

    console.log("scrolling graphical-box");
    console.log(`Parent X: ${parentX}px`);
    console.log(`Margin: ${pageMarginPixels}px`)
    console.log(`diff: ${parentX - pageMarginPixels}px`)

    // the top value is kind of useless because in most cases it can't scroll vertically
    graphicalRepresentationBox.scrollTo({ behavior: "smooth", left: parentX - pageMarginPixels });

    nextBtn.textContent = currentIndex === maxIndex ? "Close" : "Next";
    prevBtn.textContent = currentIndex === minIndex ? "Close" : "Previous";
}

// quick refresh only changes the position of the popup
// but does not change the visible popup itself
function updatePopupPos() {
    const visiblePopup = getVisiblePopup();

    const rect = visiblePopup.parentElement!.getBoundingClientRect();
    console.log(rect);

    const x = rect.x + graphicalRepresentationBox!.scrollLeft;
    const y = rect.y + graphicalRepresentationBox!.scrollTop; // should equal rect.y in fact

    // here we're stilling giving to CSS the position of the popup relative to the viewport
    // CSS use fixed positioning, and thus need viewport-relative coordinates.
    visiblePopup.style.setProperty("--left-corner", `${rect.x}px`);
    visiblePopup.style.setProperty("--top-corner", `${rect.y}px`);

    // returned: relative to the graphicalRepresentationBox
    return { parentX: x, parentY: y };
}

window.addEventListener("resize", refresh);
graphicalRepresentationBox.addEventListener("scroll", updatePopupPos);
refresh();

export { refresh };
