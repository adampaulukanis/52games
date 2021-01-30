'use strict';

let scale = 1;
let el;

function zoom (event){
    event.preventDefault();

    scale += event.deltaY * -0.01;

    // Restrict scale
    scale = Math.min(Math.max(.125, scale), 4);

    // Apply scale transform
    el.style.transform = `scale(${scale})`;
}

el = document.querySelector('div');
el.onwheel = zoom;
