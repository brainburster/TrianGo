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

class GameObject {
  constructor(name, x, y, categary) {
    this.categary = categary || 'GameObject';
    this.name = name || 'null';
    this.transform = new Transform(x, y);
    this.children = [];
  }
  // ...
}

export {
  Transform,
  GameObject,
};
