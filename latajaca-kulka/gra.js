'use strict';

const r = 50;
let gDrawingContext;
let gCanvas;
let selected;

let kulka;

const setup = () => {
	gCanvas = document.querySelector('canvas');
	gCanvas.width = 500;
	gCanvas.height = 500;
	gCanvas.style.border = 'dotted 1px black';
	gDrawingContext = gCanvas.getContext('2d');

	kulka = { x: 50, y: 50, xdir: 1, ydir: 1 };

	window.requestAnimationFrame(draw);
};

function draw() {
	for (let i = 0; i < 1; ++i) {
		gCanvas.width = gCanvas.width;
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
		const kulkaSiza = 70;
		gDrawingContext.moveTo(gCanvas.width/2, gCanvas.height/2);
		gDrawingContext.lineTo(kulka.x, kulka.y);
		gDrawingContext.strokeStyle = '#abc';
		gDrawingContext.lineWidth = 2;
		gDrawingContext.stroke();
		/* where am I going now? */
		kulka.x += kulka.xdir;
		kulka.y += kulka.ydir;
		if (kulka.x <= r) kulka.xdir *= -0.99;
		if (kulka.x >= gCanvas.width - r) kulka.xdir *= -0.99;
		if (kulka.y <= r) kulka.ydir *= -0.99;
		if (kulka.y >= gCanvas.height - r) kulka.ydir *= -0.99;
	}

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
