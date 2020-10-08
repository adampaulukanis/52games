'use strict';

import Matrix from '../node_modules/matrix/index.js';

window.onload = function ()
{
  const canvas = document.getElementById("game");
  const context = canvas.getContext("2d");
  const size = 50;
  const numberOfBombs = 5; // no idea if this number is OK
  const textFont = `${size}px serif`;
  const textFillStyle = 'white';
  // not sure what would be a proper name for 2 variables below
  const kPieceHeight = 10;
  const kPieceWidth = 10;

  let matrix = new Matrix(kPieceWidth, kPieceHeight, (x, y) => 0);
  canvas.width = matrix.width * size;
  canvas.height = matrix.height * size;

  canvas.addEventListener('click', saperOnClick, false);

  function draw ()
  {
    // {
    /*
    canvas.width = canvas.width;
    Has it got the same effect as the very line below?
    */
    context.clearRect(0, 0, canvas.width, canvas.height);
    // }
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
        case 9:
        case 10:
        case 11:
          throw new Error('this should NOT happen!');
          break;
      }
    }
  }

  // {
  function randomBomb ()
  {
    let randomX = Math.floor(Math.random() * matrix.width);
    let randomY = Math.floor(Math.random() * matrix.height);
    if (matrix.isInside(randomX, randomY) && matrix.get(randomX, randomY) === 'b') // in case there is already a bomb
      randomBomb(); // try again and hope this time it will be an empty spot

    // console.log(`Set a bomb at ${randomX}x${randomY}!`);
    matrix.set(randomX, randomY, 'b');
  };

  for (let i = 0; i < numberOfBombs; ++i)
    randomBomb();

  // It is time to put numbers indicating how many bombs the cell has in its neighbour
  function numbers ()
  {
    for (let { x, y, v } of matrix)
    {
      if (matrix.get(x, y) === 'b') {
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
  };
  // }

  function saperOnClick (e)
  {
    let cell = getCursorPosition(e);
    console.log(cell);
    matrix.set(cell.x, cell.y, 'b');
    clearBoard();
    numbers();
    draw();
  };

  function getCursorPosition (e)
  {
    let x;
    let y;
    // x and y are coordinates relative to the document (entire HTML page)
    if (e.pageX != undefined && e.pageY != undefined) {
      x = e.pageX;
      y = e.pageY;
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    // We want coordinates relative to the canvas
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    // Now we can calculate which cell the user clicked
    return {
      x: Math.floor(x / size),
      y: Math.floor(y / size),
    };
  };

  function clearBoard () {
    for (let { x, y, value } of matrix) {
      if (matrix.get(x, y) !== 'b')
        matrix.set(x, y, 0);
    }
  }

  numbers();
  draw();
};
