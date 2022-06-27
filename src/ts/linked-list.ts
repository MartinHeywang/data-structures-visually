const CLICKABLE_ITEM_CLASS = "item-clickable";
const VISIBLE_POPUP_CLASS = "popup--visible";

const clickableItems = Array.from(document.querySelectorAll<HTMLDivElement>(`.${CLICKABLE_ITEM_CLASS}`));
const popups = clickableItems
    .map(item => item.querySelector(".popup"))
    .filter(el => el !== null) as HTMLParagraphElement[];

function closePopups() {
    popups.forEach(popup => popup.classList.remove(VISIBLE_POPUP_CLASS));
}

clickableItems.forEach(item => {
    item.addEventListener("click", () => {

        const popup = item.querySelector(".popup")!;
        const visible = popup.classList.contains(VISIBLE_POPUP_CLASS);

        if(visible) {
            popup.classList.remove(VISIBLE_POPUP_CLASS);
            return;
        }

        closePopups();
        popup.classList.add(VISIBLE_POPUP_CLASS);
    })
})

export {};