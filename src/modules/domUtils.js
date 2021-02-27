const addClasses = (element, classes) => {

    if (typeof classes === "object") {
        for (let index = 0; index < classes.length; index++) {
            element.classList.add(classes[index]);
        }
    } else if (typeof classes === "string") {
        element.classList.add(classes);
    }
    
    return element;
};

const addAttributes = (element, data) => {
    if (data.id) {
        element.id = data.id;
    }

    if (data.onclick) {
        element.onclick = data.onclick;
    }

    addClasses(element, data.classes);
    
    element.innerHTML = data.text || "";
};

const clearText = (element) => {
    element.innerHTML = "";
};

const createDiv = (data) => {
    const element = document.createElement("div");
    addAttributes(element, data);
    return element;
}

const createSubHeading = (data) => {
    const element = document.createElement("h2");
    addAttributes(element, data);
    return element;
};

const createButton = (data = {}) => {
    const element = document.createElement("button");
    addAttributes(element, data);
    return element;
};

const createProgress = (data = {}) => {
    const element = document.createElement("progress");
    if (typeof data.max === "number") {
        element.max = data.max;
    }
    if (typeof data.value === "number") {
        element.value = data.value;
    }
    addAttributes(element, data);
    return element;
};

const hideElement = (element) => {
    element.style.display = "none";
};

const showElement = (element) => {
    element.style.display = "";
};

const elementIsVisible = (element) => {
    return element.offsetWidth > 0 && element.offsetHeight > 0;
}

export {
    createDiv,
    createButton,
    createProgress,
    createSubHeading,
    clearText,
    hideElement,
    showElement,
    elementIsVisible
};