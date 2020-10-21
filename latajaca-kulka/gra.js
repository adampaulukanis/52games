'use strict';

let gDrawingContext;
let gCanvas;
let selected;

let kulka;

const setup = () => {
  gCanvas = document.querySelector('canvas');
  gCanvas.width = 500;
  gCanvas.height = 500;
  gCanvas.style.backgroundColor = 'yellow';
  gDrawingContext = gCanvas.getContext('2d');

  kulka = { x: 50, y: 50 };

  window.requestAnimationFrame(draw);
};

function draw() {
  gCanvas.width = gCanvas.width;
  gDrawingContext.beginPath();
  gDrawingContext.arc(kulka.x, kulka.y, 25, 0, Math.PI * 2, false);
  gDrawingContext.closePath();
  gDrawingContext.strokeStyle = '#000';
  gDrawingContext.stroke();
  if (selected) {
    gDrawingContext.fillStyle = '#00f';
    gDrawingContext.fill();
  }

  window.requestAnimationFrame(draw);
}

document.addEventListener('keydown', update);

window.onload = setup;

function update(e){
  switch (e.code){
    case 'ArrowRight':
      kulka.x += 5;
      break;
    case 'ArrowLeft':
      kulka.x -= 5;
      break;
    case 'ArrowUp':
      kulka.y -= 5;
      break;
    case 'ArrowDown':
      kulka.y += 5;
      break;
    case 'KeyS':
      selected = !selected;
      break;
  }
  console.log(e.code);
}
