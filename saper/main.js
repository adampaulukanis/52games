//WHY 99?
'use strict';

import Grid from '../node_modules/grid/index.js';
import Vector from './Vector.js';

const BOMB = -1;

window.onload = function onloadWindow() {
    const canvas = document.getElementById('game');
    const gDrawingContext = canvas.getContext('2d');
    const output = document.querySelector('output');
    const gSize = 50; // in px
    const textFillStyle = 'white';
    // not sure what would be a proper name for 2 variables below
    const magic = 10;
    const kPieceHeight = magic; // k means canvas
    const kPieceWidth = magic;
    const numberOfBombs = Math.floor((kPieceHeight * kPieceWidth) / (kPieceHeight + kPieceWidth)) + 20; // no idea if this number is OK

    let isOver = false;
    let grid = new Grid(kPieceHeight, kPieceWidth);

    canvas.width = grid.width * gSize;
    canvas.height = grid.height * gSize;

    canvas.addEventListener('click', saperOnClick, false);

    function textFont(size) {
        size = gSize || gSize;
        return `${size}px sans-serif`;
    }

    // { set cells
    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            let v = x + grid.width * y;
            grid.set(new Vector(x, y), v);
            let cell = grid.get(new Vector(x, y));
            //console.log({ x, y, cell, v });
        }
    }
    // }

    // { check cells
    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            let cell = grid.get(new Vector(x, y));
            //console.log({ x, y, cell });
        }
    }
    // }

    function draw() {
        canvas.width = canvas.width;

        if (isOver) {
            return gameOver();
        }

        // { drawing lines
        gDrawingContext.beginPath();

        /* vertical lines */
        for (let x = 0; x <= canvas.width; x += gSize) {
            gDrawingContext.moveTo(0 + x, 0);
            gDrawingContext.lineTo(0 + x, canvas.height);
        }

        /* horizontal lines */
        for (let y = 0; y <= canvas.height; y += gSize) {
            gDrawingContext.moveTo(0, 0 + y);
            gDrawingContext.lineTo(canvas.width, 0 + y);
        }

        /* draw it! */
        gDrawingContext.strokeStyle = '#ccc';
        gDrawingContext.stroke();
        // }

        // what I want
        for (let y = 1; y < 3; y++) {
            for (let x = 0; x < grid.width; x++) {
                gDrawingContext.font = textFont();
                gDrawingContext.fillStyle = textFillStyle;
                let cell = grid.get(new Vector(x, y));
                console.log({ x, y, cell });
                gDrawingContext.fillText(cell, x * gSize, y * gSize);
            }
        }

        /*
        {
            gDrawingContext.font = textFont();
            gDrawingContext.fillStyle = 'red';
            let cell = grid.get(new Vector(1, 1));
            gDrawingContext.fillText(cell, 1 * gSize, 1 * gSize);
        }
        */

        return;

        for (let { x, y, value } of matrix) {
            if (!value.seen) {
                //continue;
            }

            switch (value.data) {
                case -1:
                    gDrawingContext.font = `${gSize -15}px serif`;
                    gDrawingContext.fillStyle = textFillStyle;
                    gDrawingContext.textAlign = 'center';
                    gDrawingContext.fillText('💣', x * size + size / 2, y * size + size / 1.2);
                    //gameOver();
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
                    gDrawingContext.fillText(value.data, x * size + size / 2, y * size + size / 1.2);
                    break;
                case 9:
                case 10:
                case 11:
                    throw new Error('this should NOT happen!');
                    break;
            }
        }
    }; // end of draw()

    function placeBombs() {
        for (let i = 0; i < numberOfBombs; ++i) {
            (function randomBomb() {
                let randomX = Math.floor(Math.random() * matrix.width);
                let randomY = Math.floor(Math.random() * matrix.height);
                if (matrix.isInside(randomX, randomY) && matrix.get(randomX, randomY).data === -1) // in case there is already a bomb
                    randomBomb(); // try again and hope this time it will be an empty spot

                // console.log(`Set a bomb at ${randomX}x${randomY}!`);
                let cell = matrix.get(randomX, randomY);
                cell.data = -1;
                matrix.set(randomX, randomY, cell);
            })();
        };
    }

    const DIRECTIONS = [
       /*  N  */ { x: +0, y: -1 },
       /*  NE */ { x: +1, y: -1 },
       /*  E  */ { x: +1, y: -1 },
    ];

    function countBombs() {
        let bombsNumber = 0;
        return bombsNumber;

        // It is time to put numbers indicating how many bombs the cell has in its neighbour

    };

    function saperOnClick (e) {
        const  { x, y } = getCursorPosition(e);
        let cell = grid.get(new Vector(x, y));
        output.innerHTML = JSON.stringify({ x, y, cell });
        draw();
    }; // end of saperOnClick()

    function getCursorPosition(e) {
        let x, y;
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
            x: Math.floor(x / gSize),
            y: Math.floor(y / gSize),
        };
    }; // end of getCursorPosition()

    function gameOver() {
        isOver = true;
        gDrawingContext.font = 'bold 80px sans-serif';
        gDrawingContext.fillStyle = 'red';
        gDrawingContext.fillText('Game over!', canvas.width / 2, canvas.height / 2);
        gDrawingContext.fillStyle = 'red';
        gDrawingContext.fillText('Game over!', canvas.width / 2 + 1, canvas.height / 2 + 1);
    };

    draw();
}; // end of onload()
