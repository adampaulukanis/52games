'use strict';

import Matrix from '../src/Matrix.js';

window.onload = function () {
  const canvas = document.getElementById("game");
  const gDrawingContext = canvas.getContext("2d");
  const output = document.querySelector('output');
  const size = 50; // in px
  const numberOfBombs = 99; // no idea if this number is OK
  const textFont = (function () { return `${size}px sans-serif`; })();
  const textFillStyle = 'white';
  // not sure what would be a proper name for 2 variables below
  const kPieceHeight = 10; // k means canvas
  const kPieceWidth = 10;

  let isOver = false;

  class Cell {
    constructor () {
      this.data = 0;
      this.seen = false;
    };

    toString () {
      return this.data;
    };
  }; // end of Cell class

  let matrix = new Matrix(kPieceWidth, kPieceHeight, (x, y) => new Cell());
  canvas.width = matrix.width * size;
  canvas.height = matrix.height * size;

  canvas.addEventListener('click', saperOnClick, false);

  function draw () {
    canvas.width = canvas.width;

    if (isOver) {
      return gameOver();
      alert('nie powinienes tego widziec');
    }

    // { drawing lines
    gDrawingContext.beginPath();

    /* vertical lines */
    for (let x = 0; x <= canvas.width; x += size) {
      gDrawingContext.moveTo(0 + x, 0);
      gDrawingContext.lineTo(0 + x, canvas.height);
    }

    /* horizontal lines */
    for (let y = 0; y <= canvas.height; y += size) {
      gDrawingContext.moveTo(0, 0 + y);
      gDrawingContext.lineTo(canvas.width, 0 + y);
    }

    /* draw it! */
    gDrawingContext.strokeStyle = '#ccc';
    gDrawingContext.stroke();
    // }

    for (let { x, y, value } of matrix) {
      if (!value.seen)
        continue;

      switch (value.data) {
        case 'b':
          gDrawingContext.font = `${size -15}px serif`;
          gDrawingContext.fillStyle = textFillStyle;
          gDrawingContext.textAlign = 'center';
          gDrawingContext.fillText('💣', x * size + size / 2, y * size + size / 1.2);
          gameOver();
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
          gDrawingContext.font = textFont;
          gDrawingContext.fillStyle = textFillStyle;
          gDrawingContext.textAlign = 'center';
          gDrawingContext.fillText(value, x * size + size / 2, y * size + size / 1.2);
          break;
        case 9:
        case 10:
        case 11:
          throw new Error('this should NOT happen!');
          break;
      }
    }
  }; // end of draw()

  // { put bombs
  for (let i = 0; i < numberOfBombs; ++i) {
    (function randomBomb () {
      let randomX = Math.floor(Math.random() * matrix.width);
      let randomY = Math.floor(Math.random() * matrix.height);
      if (matrix.isInside(randomX, randomY) && matrix.get(randomX, randomY).data === 'b') // in case there is already a bomb
        randomBomb(); // try again and hope this time it will be an empty spot

      // console.log(`Set a bomb at ${randomX}x${randomY}!`);
      let cell = matrix.get(randomX, randomY);
      cell.data = 'b';
      matrix.set(randomX, randomY, cell);
    })();
  };
  // }

  function numbers () {
    // It is time to put numbers indicating how many bombs the cell has in its neighbour
    for (let { x, y, v } of matrix)
    {
      if (matrix.get(x, y).data === 'b') {
        if (matrix.isInside(x, y -1)) { // North
          if (matrix.get(x, y -1).data !== 'b') {
            let noBombs = Number(matrix.get(x, y -1).data);
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
  }; // end of numbers()

  function saperOnClick (e) {
    const XY = getCursorPosition(e);
    let cell = matrix.get(XY.x, XY.y);
    cell.seen = true;
    console.log(cell);
    draw();
    return;
    let temp = matrix.get(cell.x, cell.y);
    temp.seen = true;
    temp.data = '⚐';
    console.log(temp);
    matrix.set(cell.x, cell.y, temp);
    clearBoard();
    // numbers();
    draw();
  }; // end of saperOnClick()

  function getCursorPosition (e) {
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
  }; // end of getCursorPosition()

  function clearBoard () {
    for (let { x, y, value } of matrix) {
      if (matrix.get(x, y) !== 'b')
        matrix.set(x, y, 0);
    }
  }; // end of clearBoard()

  function gameOver () {
    isOver = true;
    gDrawingContext.font = 'bold 80px sans-serif';
    gDrawingContext.fillStyle = 'red';
    gDrawingContext.fillText("Game over!", canvas.width / 2, canvas.height / 2);
    gDrawingContext.fillStyle = 'red';
    gDrawingContext.fillText("Game over!", canvas.width / 2 + 1, canvas.height / 2 + 1);
  };

  // numbers();
  draw();
}; // end of onload()
