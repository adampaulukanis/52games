'use strict';

const r = 30;
let gDrawingContext;
let gCanvas;
let selected;

let x = 0;
let y = 0;

let kulka;

const setup = () => {
	gCanvas = document.querySelector('canvas');
	gCanvas.width = innerWidth -2;
	gCanvas.height = 500;
	gCanvas.style.border = 'dotted 1px black';
	gDrawingContext = gCanvas.getContext('2d');

	kulka = {
		x: random(gCanvas.width),
		y: random(gCanvas.height),
		xdir: random(2) -3,
		ydir: random(2) -3
	};

	window.requestAnimationFrame(draw);
};

function draw() {
	gCanvas.width = gCanvas.width;
	drawGrid();

	/* kwadrat */
	drawRect(x, y, '#00ff00');

	for (let i = 0; i < 1; ++i) {
		gDrawingContext.beginPath();
		gDrawingContext.arc(kulka.x, kulka.y, r, 0, Math.PI * 2, false);
		gDrawingContext.closePath();
		gDrawingContext.strokeStyle = '#e0e70f';
		gDrawingContext.stroke();
		gDrawingContext.fillStyle = '#e01';
		if (selected) {
			gDrawingContext.fillStyle = '#0e09e5';
		}
		gDrawingContext.fill();

		/* draw line */
		gDrawingContext.beginPath();
		gDrawingContext.moveTo(kulka.x, kulka.y);
		gDrawingContext.lineTo(kulka.x + (kulka.xdir * 10), kulka.y + (kulka.ydir * 10));
		gDrawingContext.strokeStyle = '#8700d7';
		gDrawingContext.lineWidth = 10;
		gDrawingContext.stroke();
		gDrawingContext.closePath();

		/* draw green line */
		gDrawingContext.beginPath();
		gDrawingContext.moveTo(kulka.x, kulka.y);
		gDrawingContext.lineTo(x +25, y +25);
		gDrawingContext.strokeStyle = 'green';
		gDrawingContext.lineWidth = 10;
		gDrawingContext.stroke();
		gDrawingContext.closePath();

		/* where am I going now? */
		kulka.x += kulka.xdir;
		kulka.y += kulka.ydir;

		// wprowadź element szaleństwa
		if (Math.random() > 0.9) {
			kulka.xdir *= 1;
			kulka.ydir *= 1;
		}
		if (kulka.x <= r) kulka.xdir *= -1;
		if (kulka.x >= gCanvas.width - r) kulka.xdir *= -1;
		if (kulka.y <= r) kulka.ydir *= -1;
		if (kulka.y >= gCanvas.height - r) kulka.ydir *= -1;
	}

	/* display stats about the ball */
	document.querySelector('output').innerText = `${JSON.stringify(kulka)}`;

	window.requestAnimationFrame(draw);
}

document.addEventListener('keydown', update);

window.onload = setup;

function update(e){
	switch (e.code){
		case 'ArrowRight':
			kulka.x += 1;
			break;
		case 'ArrowLeft':
			kulka.x -= 1;
			break;
		case 'ArrowUp':
			kulka.y -= 1;
			break;
		case 'ArrowDown':
			kulka.y += 1;
			break;
		case 'KeyS':
			selected = !selected;
			break;
	}
	console.log(e.code);
}

function random(max){
	return Math.floor(Math.random() * max);
}

document.addEventListener('mousemove', drawLine);

function drawLine(event){
	x = event.offsetX;
	y = event.offsetY;
}

function drawGrid(){
	for (let i = 0; i <= gCanvas.width; i += 20){
		gDrawingContext.moveTo(i, 0);
		gDrawingContext.lineTo(i, gCanvas.height);
		gDrawingContext.stroke();
	}
	for (let i = 0; i <= gCanvas.height; i += 20){
		gDrawingContext.moveTo(0, i);
		gDrawingContext.lineTo(gCanvas.width, i);
		gDrawingContext.stroke();
	}
}

function drawRect(x, y, color){
	gDrawingContext.fillStyle = color;
	gDrawingContext.fillRect(x, y, 50, 50);
}
