import { createProgress } from "./domUtils.js";

const ProgressBar = {
    element: null,
    init: (targetElement, videoElement) => {
        ProgressBar.element = createProgress({ value: 0, max: 100 });
        targetElement.appendChild(ProgressBar.element);
        ProgressBar.addListeners(videoElement);
    },

    addListeners: (videoElement) => {
        const progressBar = ProgressBar.element;

        progressBar.addEventListener("click", e => {
            const x = e.pageX - progressBar.offsetLeft;
            const clickedValue = x * progressBar.max / progressBar.offsetWidth;
            videoElement.currentTime = videoElement.duration * (clickedValue / 100);
        });

        videoElement.addEventListener("progress", () => {
            progressBar.value = Math.round((videoElement.currentTime / videoElement.duration) * 100);
        });
    }
};

export default ProgressBar;
