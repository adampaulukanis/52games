'use strict';

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const size = 10;

import Matrix from '../Matrix/index.js';
let matrix = new Matrix(40, 40, (x, y) => 0);
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
  let randomCell = { x: Math.floor(Math.random() * matrix.width), y: Math.floor(Math.random() * matrix.height) };
  if (matrix.get(randomCell.x, randomCell.y) === 0)
    matrix.set(randomCell.x, randomCell.y, 1)
  else
    matrix.set(randomCell.x, randomCell.y, 2)

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

document.querySelector('#next').addEventListener('click', () => someNumber++);
document.querySelector('#prev').addEventListener('click', () => someNumber--);

function draw () {
  for (let { x, y, value } of matrix) {
    if (value === 0)
      context.fillStyle = 'black';
    else if (value === 2)
      context.fillStyle = 'white';
    else
      context.fillStyle = 'orange';

    context.fillRect(x * size, y * size, size, size);
  }
}

function dontLeaveTrace () {
	canvas.width = canvas.width;
}
