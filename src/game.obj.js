//2D GameObject
class GameObject {
  /** @param {CanvasRenderingContext2D} ctx */
  render(ctx) {
    throw 'abstract method';
  }
  update() {
    throw 'abstract method';
  }
}

class Transform {
  constructor(x, y, sx = 1, sy = 1, r = 0) {
    this.x = x;
    this.y = y;
    this.sx = sx;
    this.sy = sy;
    this.r = r;
  }
  move(x, y) {
    this.x += x;
    this.y += y;
  }
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
  scale(sx, sy) {
    this.sx *= sx;
    this.sy *= sy;
  }
  scaleTo(sx, sy) {
    this.sx = sx;
    this.sy = sy;
  }
  rotate(r) {
    this.r += r;
  }
  rotateTo(r) {
    this.r = r;
  }
}