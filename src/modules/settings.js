import { createDiv, createButton, clearText, hideElement, showElement, createSubHeading } from "./domUtils.js";
import { initNavigation } from "./navigation.js";

let settingsElement;
let subtitleOptionsContainer;
let audioOptionsContainer;

const Settings = {
    init: (element) => {
        settingsElement = createDiv({id: "settings"})
        element.appendChild(settingsElement);
        Settings.createContainers();
        hideElement(settingsElement);
    },

    createContainers: () => {
        const audioContainer = createDiv({ id: "audioTracks" });
        audioOptionsContainer = createDiv({ classes: "options" });
        audioContainer.appendChild(createSubHeading({ text: "Audio" })); 
        audioContainer.appendChild(audioOptionsContainer); 
        settingsElement.appendChild(audioContainer); 
        
        const subtitleContainer = createDiv({ id: "subtitles" });
        subtitleOptionsContainer = createDiv({ classes: "options" });
        subtitleContainer.appendChild(createSubHeading({ text: "Subtitles" })); 
        subtitleContainer.appendChild(subtitleOptionsContainer);
        settingsElement.appendChild(subtitleContainer);
    },

    refresh: (data) => {
        const { subtitleTracks, audioTracks } = data;
        if (subtitleTracks) {
            Settings.refreshItems(subtitleOptionsContainer, subtitleTracks);
        }
        
        if (audioTracks) {
            Settings.refreshItems(audioOptionsContainer, audioTracks);
        }
    },

    createSettingsListContainer: (id) => {
        return createDiv({id, classes: "options"})
    },

    createSettingsOption: (container, item) => {
        let text = item.name;
        if (item.active) {
            text = `<i class="fas fa-check-square"></i> ${text}`
        }
        const button = createButton({ text, onclick: () => { item.setCallback(item.id); } });
        container.appendChild(button);
    },

    refreshItems: (container, items = []) => {
        clearText(container);
        for (let index = 0; index < items.length; index++) {
            Settings.createSettingsOption(container, items[index]);            
        }
    },

    toggleSettings: e => {
        if (settingsElement.style.display === "none") {
            showElement(settingsElement);
        } else {
            hideElement(settingsElement);
        }
    }
};

export default Settings;