'use strict';

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const size = 50;
const numberOfBombs = 10; // no idea if this number is OK
const textFont = '40px serif';
const textFillStyle = 'white';

import Matrix from '../Matrix/index.js';
let matrix = new Matrix(10, 10, (x, y) => 0);
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
        context.fillStyle = 'green';
        context.fillRect(x * size, y * size, size, size);
        break;
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        context.font = textFont;
        context.fillStyle = textFillStyle;
        context.fillText(value, x * size + size / 3, y * size + size / 1.2);
        break;
    }
  }
}

function dontLeaveTrace () {
	canvas.width = canvas.width;
}

// {
function randomBomb () {
  let randomX = Math.floor(Math.random() * matrix.width);
  let randomY = Math.floor(Math.random() * matrix.height);
  if (matrix.isInside(randomX, randomY) && matrix.get(randomX, randomY) === 'b') // in case there is already a bomb
    randomBomb(); // try again and hope this time it will be an empty spot

  // console.log(`Set a bomb at ${randomX}x${randomY}!`);
  matrix.set(randomX, randomY, 'b');
}

for (let i = 0; i < numberOfBombs; ++i)
  randomBomb();

// It is time to put numbers indicating how many bombs the cell has in its neighbour
let counter = 0;
for (let { x, y, v } of matrix) {
  if (matrix.get(x, y) === 'b') {
    console.log(`${++counter}: a bomb has been found at ${x}x${y}!`);
    if (matrix.isInside(x, y -1)) { // North
      if (matrix.get(x, y -1) !== 'b') {
        let noBombs = Number(matrix.get(x, y -1));
        matrix.set(x, y -1, ++noBombs);
      }
    }
    if (matrix.isInside(x +1, y)) { // East
      if (matrix.get(x +1, y) !== 'b') {
        let noBombs = Number(matrix.get(x +1, y));
        matrix.set(x +1, y, ++noBombs);
      }
    }
    if (matrix.isInside(x, y +1)) { // South
      if (matrix.get(x, y +1) !== 'b') {
        let noBombs = Number(matrix.get(x, y +1));
        matrix.set(x, y +1, ++noBombs);
      }
    }
    if (matrix.isInside(x -1, y)) { // West
      if (matrix.get(x -1, y) !== 'b') {
        let noBombs = Number(matrix.get(x -1, y));
        matrix.set(x -1, y, ++noBombs);
      }
    }
    if (matrix.isInside(x +1, y -1)) { // NE
      if (matrix.get(x +1, y -1) !== 'b') {
        let noBombs = Number(matrix.get(x +1, y -1));
        matrix.set(x +1, y -1, ++noBombs);
      }
    }
    if (matrix.isInside(x +1, y +1)) { // SE
      if (matrix.get(x +1, y +1) !== 'b') {
        let noBombs = Number(matrix.get(x +1, y +1));
        matrix.set(x +1, y +1, ++noBombs);
      }
    }
    if (matrix.isInside(x -1, y +1)) { // SW
      if (matrix.get(x -1, y +1) !== 'b') {
        let noBombs = Number(matrix.get(x -1, y +1));
        matrix.set(x -1, y +1, ++noBombs);
      }
    }
    if (matrix.isInside(x -1, y -1)) { // NW
      if (matrix.get(x -1, y -1) !== 'b') {
        let noBombs = Number(matrix.get(x -1, y -1));
        matrix.set(x -1, y -1, ++noBombs);
      }
    }
  }
}
// }

// { TODO: delete this
if (counter !== numberOfBombs)
  throw new Error('nie rozumiem tego jeszcze, ale coś tu nie tak. Czasami (dość często) liczby nie wyświetlają się prawidłowo (są puste pola).'
                 +'Już zrozumiałem! Problem był taki, że gdy dwie bomby były blisko siebie (np. jedna nad drugą), to liczba bomb kaszaniła wszystko');
// }
