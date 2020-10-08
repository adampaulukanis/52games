'use strict';

export default class Matrix {
	constructor (width, height, element = (x, y) => undefined) {
		this.width = width;
		this.height = height;
		this.content = [];

		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				this.content[y * width + x] = element(x, y);
			}
		}
	}

	get (x, y) {
		if (!(x < this.width && x >= 0 && y < this.height && y >= 0)) {
			throw new RangeError('Get parameters must be within range <0 ... width | height>');
		}
		return this.content[y * this.width + x];
	}

	set (x, y, value) {
		if (!(x < this.width && x >= 0 && y < this.height && y >= 0)) {
			throw new RangeError('Get parameters must be within range <0 ... width | height>');
		}
		this.content[y * this.width + x] = value;

		return this;
	}

	toString () {
		let output = '';
		for (let y = 0; y < this.height; ++y) {
			for (let x = 0; x < this.width; ++x) {
				output += this.get(x, y);
				output += '\t';
			}
			output += '\n';
		}
		return output;
	}

	rotateRight () {
		let matrix = new Matrix(this.height, this.width);
		for (let x = 0; x < matrix.width; ++x) {
			for (let y = 0; y < matrix.height; ++y) {
				let value = this.get(y, x);
				matrix.set(matrix.width -1 -x, y, value);
			}
		}
		return matrix;
	}

	rotateLeft () {
		let matrix = new Matrix(this.height, this.width);
		for (let x = 0; x < matrix.width; ++x) {
			for (let y = 0; y < matrix.height; ++y) {
				let value = this.get(y, x);
				matrix.set(x, matrix.height -1 -y, value);
			}
		}
		return matrix;
	}

	isInside (x, y) {
		return (x < this.width && x >= 0 && y < this.height && y >= 0);
	}

	/**
	 * add new column at the provided position OR at the end
	 */
	addColumn (column = [], pos = this.width) {
		if (!Array.isArray(column))
			throw new Error(`Parameter *column* must be of type Array`);

		if (column.length !== this.height)
			throw new Error(`Invalid length of *column* parameter`);

		if (pos < 0 || pos > this.width)
			throw new Error(`Invalid *pos* parameter`);

		this.width++;
		column.map((el, i) => this.content.splice((pos + this.width * i), 0, el));

		return this;
	}

	addRow (column = [], pos = this.height) {
		if (!Array.isArray(column))
			throw new Error(`Parameter *column* must be of type Array`);

		if (column.length !== this.width)
			throw new Error(`Invalid length of *column* parameter`);

		if (pos < 0 || pos > this.height)
			throw new Error(`Invalid *pos* parameter`);

		this.height++;
		column = column.reverse();
		column.map(el => this.content.splice((pos * this.width), 0, el));

		return this;
	}

	deleteColumn (pos) {
		if (pos < 0 || pos > this.width || typeof pos !== 'number')
			throw new Error(`Invalid *pos* parameter`);

		for (let i = 0; i < this.height; ++i) {
			this.content.splice((pos + i * this.width) - i, 1);
		}
		this.width--;

		return this;
	}

	deleteRow (pos) {
		if (pos < 0 || pos > this.height || typeof pos !== 'number')
			throw new Error(`Invalid *pos* parameter`);

		this.content.splice(pos * this.width, this.width);
		this.height--;

		return this;
	}

	[Symbol.iterator] () {
		return new MatrixIterator(this);
	}
}

class MatrixIterator {
	constructor (matrix) {
		this.x = 0;
		this.y = 0;
		this.matrix = matrix;
	}

	next () {
		if (this.y == this.matrix.height) {
			return { done: true };
		}

		let value = {
			x: this.x,
			y: this.y,
			value: this.matrix.get(this.x, this.y)
		};

		this.x++;
		if (this.x == this.matrix.width) {
			this.x = 0;
			this.y++;
		}

		return { value, done: false };
	}
}
