'use strict';

export default class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
}
