"use strict";

const output = document.querySelector("output");

const debounce = (callback, wait) => {
    let timeoutId = null;

    return (...args) => {
        window.clearTimeout(timeoutId);

        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
};

const handleMouseMove = debounce((ev) => {
    output.innerText = JSON.stringify({ x: ev.clientX, y: ev.clientY });
}, 250);

window.addEventListener("mousemove", handleMouseMove);
