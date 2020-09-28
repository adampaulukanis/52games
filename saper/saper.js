'use strict';

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const size = 40;

import Matrix from '../Matrix/index.js';
let matrix = new Matrix(10, 10, (x, y) => 0);
matrix.set(7, 5, 1);
canvas.width = matrix.width * size;
canvas.height = matrix.height * size;

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame        ||
    window.webkitRequestAnimationFrame       ||
    window.mozRequestAnimationFrame          ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

(function animLoop () {
  dontLeaveTrace();
  draw();

  requestAnimFrame(animLoop);
})();

function goFullscreen (element) {
  if (element.requestFullscreen)
    element.requestFullscreen();
  else if (element.webkitRequestFullscreen)
    element.webkitRequestFullscreen();
  else if (element.mozRequestFullScreen)
    element.mozRequestFullScreen();
  else if (element.msRequestFullscreen)
    element.msRequestFullscreen();
  else
    console.error('fullscreen does not work.');
}

document.querySelector('main').addEventListener('click', () => {
  goFullscreen(document.querySelector('main'));
});

function draw () {
  for (let { x, y, value } of matrix) {
    switch (value) {
      case 'b':
        context.fillStyle = 'black';
        break;
      default:
        context.fillStyle = 'orange';
        break;
    }
    context.fillRect(x * size, y * size, size, size);
  }
}

function dontLeaveTrace () {
	canvas.width = canvas.width;
}

// {
function randomBomb () {
  let randomX = Math.floor(Math.random() * matrix.width);
  let randomY = Math.floor(Math.random() * matrix.height);
  if (matrix.get(randomX, randomY) === 'b') // in case there is already a bomb
    randomBomb(); // try again and hope this time it will be an empty spot
  matrix.set(randomX, randomY, 'b');
}

const numberOfBombs = 10; // no idea if this number is OK
for (let i = 0; i < numberOfBombs; ++i)
  randomBomb();
// }
