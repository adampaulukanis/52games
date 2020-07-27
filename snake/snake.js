'use strict'

export default class Snake {
	constructor () {
		this.history = [];
		this.dir = { x: 0, y: 0 };
		this.body = [{ x: 0, y: 0 }];
		this.grow = function () {
			/*
			 * Problem jest w update z aktualizacją? Jak to sprawdzić?
			 */
			// Już wiem, że coś się dzieje dziwnego!
			// Początkowo te dwie wartości różnią się, ale z jakiegoś powodu zmienione zostają aby być takie same! Czemu?

			if (this.history.length > 0) {
				this.body.push({
					x: this.history[this.history.length -1].x,
					y: this.history[this.history.length -1].y
				});
        window.framesPerSecond++;
			}
		};
	}
}
