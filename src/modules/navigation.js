import { elementIsVisible } from "./domUtils.js";

let focused = 0;
let buttons = [];

const resetNavigation = () => {
    focused = 0;
    buttons[focused].focus();
};

const onKeydown = e => {
    switch (e.key) {
        case "ArrowRight":
            if (focused < (buttons.length - 1)) {
                focused++;
            }
            break;
        case "ArrowLeft":
            if (focused > 0) {
                focused--;
            }
            break;
    
        default:
            break;
    }

    if (buttons[focused]) {
        buttons[focused].focus();
    }
}

const onClick = e => {
    if (!e.target.closest('.player-controls')) {
        resetNavigation();
        return;
    } else {
        const indexFound = Array.from(buttons).findIndex(button => button === e.target);
        if (indexFound > -1) {
            focused = indexFound;
            e.target.focus();
        } else {
            buttons[focused].focus();
        }
    }
};

const addNavigationListeners = () => {
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("click", onClick);
}

const initNavigation = (targetElement) => {
    const allButtons = targetElement.querySelectorAll("button");
    buttons = [];
    for (let index = 0; index < allButtons.length; index++) {
        if (elementIsVisible(allButtons[index])) {
            buttons.push(allButtons[index]);
        }
    }
    resetNavigation();
    addNavigationListeners();
}

export { initNavigation };
