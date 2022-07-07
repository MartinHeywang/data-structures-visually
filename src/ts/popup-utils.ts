import "../scss/popup.scss";

const popups = Array.from(document.querySelectorAll<HTMLDivElement>("[class*='popup-']"));

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

    // here we're scrolling to view the parent element of the popup
    // we can't call that method on the popup itself because it has a position of fixed
    visiblePopup.parentElement!.scrollIntoView({ behavior: "smooth", inline: "start" });

    updatePopupPos();

    nextBtn.textContent = currentIndex === maxIndex ? "Close" : "Next";
    prevBtn.textContent = currentIndex === minIndex ? "Close" : "Previous";
}

// quick refresh only changes the position of the popup
// but does not change the visible popup itself
function updatePopupPos() {
    const visiblePopup = getVisiblePopup();

    const rect = visiblePopup.parentElement!.getBoundingClientRect();
    visiblePopup.style.setProperty("--left-corner", `${rect.x}px`);
    visiblePopup.style.setProperty("--top-corner", `${rect.y}px`);
}

window.addEventListener("resize", updatePopupPos);
document.querySelector(".graphical-representation-box")?.addEventListener("scroll", updatePopupPos);
refresh();

export { refresh };
