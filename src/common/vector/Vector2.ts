export class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector2) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    subtract(v: Vector2) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    multiply(scalar: number) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    dot(v: Vector2) {
        return this.x * v.x + this.y * v.y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const mag = this.magnitude();
        return new Vector2(this.x / mag, this.y / mag);
    }
}
