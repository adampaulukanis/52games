'use strict';

let angle = 0;
let gDrawingContext;
let gCanvas;
let selected;
let keyboard = [];
let actors = [];
let kulka;

const setup = () => {
    gCanvas = document.querySelector('canvas');
    gCanvas.style.border = '1px solid red';
    gCanvas.style.backgroundColor = 'black';
    gCanvas.width = document.body.clientWidth -20;
    gCanvas.height = 400;
    gDrawingContext = gCanvas.getContext('2d');

    addPlayer(100, 50, 20, 'blue', 'Adam');
    addPlayer(200, 50, 19, 'green', 'Ewa');
    addPlayer('random', 'random', 17, 'red', 'Bolek');
    addPlayer('random', 'random', 17, 'red', 'miś');
    addPlayer('random', 'random', 7, 'yellow', 'jesiotry');
    addPlayer('random', 'random', 7, 'yellow', 'jesiotry');
    addPlayer('random', 'random', 7, 'yellow', 'jesiotry');
    addPlayer('random', 'random', 7, 'yellow', 'jesiotry');
    addPlayer('random', 'random', 7, 'yellow', 'jesiotry');
    addPlayer('random', 'random', 7, 'yellow', 'jesiotry');
    addPlayer('random', 'random', 7, 'yellow', 'jesiotry');

    window.requestAnimationFrame(draw);
};

function drawCircles() {
    reset();

    /* draw an arrow */
    gDrawingContext.beginPath();
    gDrawingContext.arc(0, 0, 50, 0, Math.PI * 2, false);
    gDrawingContext.lineWidth = 20;
    gDrawingContext.fillStyle = 'green';
    gDrawingContext.fill();
     gDrawingContext.beginPath();
    // gDrawingContext.moveTo(100, 100);
    // gDrawingContext.lineTo(200, 300);
    gDrawingContext.arc(300, 300, 50, 0, Math.PI * 2, false);
    // gDrawingContext.arc(300, 300, 5, 0, Math.PI * 2, false);
    gDrawingContext.fillStyle = 'red';
    gDrawingContext.lineWidth = 2;
    gDrawingContext.fill();
    gDrawingContext.translate(150, 150);
    gDrawingContext.beginPath();
    gDrawingContext.arc(300, 300, 50, 0, Math.PI * 2, false);
    gDrawingContext.fillStyle = 'yellow';
    gDrawingContext.fill();
    gDrawingContext.translate(0, 0);
    gDrawingContext.beginPath();
    gDrawingContext.arc(0, 0, 50, 0, Math.PI * 2, false);
    gDrawingContext.fillStyle = 'blue';
    gDrawingContext.lineWidth = 12;
    gDrawingContext.fill();

    window.requestAnimationFrame(drawCircles);
}

document.addEventListener('keydown', function(event){
    keyboard[event.code] = true;
});
document.addEventListener('keyup', function(event){
    keyboard[event.code] = false;
});

function drawSkewRect(){
    reset();
    const now = new Date();
    gDrawingContext.fillStyle = 'red';
    gDrawingContext.fillText(angle, 100, 100);
    gDrawingContext.translate(gCanvas.width / 2, gCanvas.height / 2);
    gDrawingContext.rotate(angle++ * Math.PI / 180);
    gDrawingContext.fillStyle = 'green';
    gDrawingContext.fillRect(0, 0, 100, 100);

    gDrawingContext.translate(0, 0);
    gDrawingContext.fillStyle = 'blue';
    gDrawingContext.fillText('adam', 100, 100);

    angle %= 360;

    gDrawingContext.resetTransform();
    gDrawingContext.fillStyle = 'black';
    gDrawingContext.fillRect(40, 40, 360, 5);
    gDrawingContext.fillStyle = 'red';
    gDrawingContext.fillRect(40, 40, angle, 5);

    /* narysuj zegar */
    gDrawingContext.rotate(-90 * Math.PI / 180);
    gDrawingContext.beginPath();
    gDrawingContext.arc(-100, 100, 50, -0 * Math.PI / 180, now.getSeconds() * 2 / 60 * Math.PI, false);
    gDrawingContext.lineWidth = 10;
    gDrawingContext.strokeStyle = 'blue';
    gDrawingContext.stroke();
    gDrawingContext.beginPath();
    gDrawingContext.arc(-100, 100, 40, -0 * Math.PI / 180, now.getMinutes() * 2 / 60 * Math.PI, false);
    gDrawingContext.lineWidth = 10;
    gDrawingContext.strokeStyle = 'green';
    gDrawingContext.stroke();
    gDrawingContext.beginPath();
    gDrawingContext.arc(-100, 100, 30, -0 * Math.PI / 180, now.getHours() * 2 / 24 * Math.PI, false);
    gDrawingContext.lineWidth = 10;
    gDrawingContext.strokeStyle = 'black';
    gDrawingContext.stroke();

    window.requestAnimationFrame(drawSkewRect);
};

function draw(){
    reset();
    /* ----------------------------------------- */
    actors.forEach(actor => actor.collision(actors));
    actors.forEach(actor => actor.update());
    actors.forEach(actor => actor.draw());
    /* ----------------------------------------- */
    document.querySelector('output').innerText = 'Players #: ' + actors.length;

    window.requestAnimationFrame(draw);
};

function drawArrow(){
    reset();
    angle += 0.09;
    gDrawingContext.translate(gCanvas.width / 2, gCanvas.height / 2);
    gDrawingContext.rotate(angle * Math.PI / 180);
    gDrawingContext.beginPath();
    gDrawingContext.moveTo(10, 20); // 1
    gDrawingContext.lineTo(60, 20); // 2
    gDrawingContext.lineTo(60, 10); // 3
    gDrawingContext.lineTo(100, 30); // 4
    gDrawingContext.lineTo(60, 50); // 5
    gDrawingContext.lineTo(60, 40); // 6
    gDrawingContext.lineTo(10, 40); // 7
    gDrawingContext.closePath();
    gDrawingContext.lineWidth = 5;
    gDrawingContext.strokeStyle = 'orange';
    gDrawingContext.stroke();
    gDrawingContext.translate(gCanvas.width / 2, gCanvas.height / 2);
    gDrawingContext.rotate(angle * Math.PI / 180);

    angle %= 360;

    gDrawingContext.resetTransform();
    gDrawingContext.fillStyle = 'black';
    gDrawingContext.fillRect(40, 40, 360, 5);
    gDrawingContext.fillStyle = 'red';
    gDrawingContext.fillRect(40, 40, angle, 5);

    window.requestAnimationFrame(drawArrow);
};

function reset(){
    gCanvas.width = gCanvas.width;
};

function addPlayer(x, y, r, color, name){
    if (x === 'random')
        x = Math.random() * gCanvas.width;
    if (y === 'random')
        y = Math.random() * gCanvas.height;

    const player = new Kulka(x, y, r, color, name);
    if(Math.random() > 0.5){ // you're lucky
        player.vel.x *= -1;
    }
    actors.push(player);
};

window.onload = setup;
