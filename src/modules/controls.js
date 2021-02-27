import ProgressBar from "./progressBar.js";
import { initNavigation } from "./navigation.js";
import Settings from "./settings.js";
import { createButton, createDiv, hideElement, showElement } from "./domUtils.js";

let controlsElement;
let basicButtons = {};

const playerControlClass = {
    wrapper: "player-controls",
    playButton: "play",
    pauseButton: "pause",
    stopButton: "stop",
    settingsButton: "settings",
    basicControls: "base-controls"
};

const buttons = {
    play: {
        text: `<i class="fas fa-play"></i>`,
        class: playerControlClass.playButton,
        onClick: function() { this.play() }
    },
    pause: {
        text: `<i class="fas fa-pause"></i>`,
        class: playerControlClass.pauseButton,
        onClick: function(){ this.pause() }
    },
    stop: {
        text: `<i class="fas fa-stop"></i>`,
        class: playerControlClass.stopButton,
        onClick: function(){
            this.pause();
            this.currentTime = 0;
        }
    },
    settings: {
        text: `<i class="fas fa-cog"></i>`,
        class: playerControlClass.settingsButton,
        onClick: () => {
            Settings.toggleSettings();
            initNavigation(controlsElement);
        }
    }
};

const createBasicButtons = (videoElement) => {
    const basicControlsEl = createDiv({ classes: playerControlClass.basicControls });
    for (const key in buttons) {
        if (Object.hasOwnProperty.call(buttons, key)) {
            const button = buttons[key];
            const buttonElement = createButton({
                text: button.text,
                classes: button.class,
                onclick: button.onClick.bind(videoElement)
            });
            basicButtons[key] = buttonElement;
            basicControlsEl.appendChild(buttonElement);
        }
    }

    hideElement(basicButtons.pause);

    videoElement.addEventListener("pause", () => {
        showElement(basicButtons.play);
        hideElement(basicButtons.pause);
        initNavigation(controlsElement);
    });

    videoElement.addEventListener("playing", () => {
        hideElement(basicButtons.play);
        showElement(basicButtons.pause);
        initNavigation(controlsElement);
    });

    controlsElement.appendChild(basicControlsEl);
};

const createControlsWrapper = () => {
    controlsElement = createDiv({ classes: playerControlClass.wrapper });
}

const Controls = {
    init: (videoElement, opts = {}) => {
        createControlsWrapper();

        if (opts.progressBar) {
            ProgressBar.init(controlsElement, videoElement);
        }

        createBasicButtons(videoElement);
        Settings.init(controlsElement, videoElement);
        videoElement.after(controlsElement);
        initNavigation(controlsElement);
    },
    refresh: (data) => {
      Settings.refresh(data);
    },
};

export default Controls;
