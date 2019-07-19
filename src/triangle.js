const radical3 = 1.732;
const tan60 = radical3;
const cos30 = radical3 / 2;

class Triangle {
  constructor(x, y, r, up = true, color = 'white') {
    this.x = x;
    this.y = y;
    this.r = r;
    this.up = up;
    this.color = color;
    this.creatShape();
  }

  creatShape() {
    this.x1 = this.x;
    this.y1 = this.y;
    this.x2 = this.x + this.r * radical3;
    this.y2 = this.y;
    this.x3 = this.x + this.r * cos30;
    this.y3 = this.y + 1.5 * this.r;
    if (this.up) {
      this.y3 = this.y;
      this.y2 = this.y + 1.5 * this.r;
      this.y1 = this.y + 1.5 * this.r;
    }
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineTo(this.x3, this.y3);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  mouseCheck(x, y) {
    if (x < this.x1 || x > this.x2) {
      return false;
    }
    if (!this.up) {
      if (y > this.y3 || y < this.y1) {
        return false;
      }
    } else if (y < this.y3 || y > this.y1) {
      return false;
    }
    if (this.up) {
      if (x < this.x3) {
        if (y < (x - this.x3) * -tan60 + this.y3) {
          return false;
        }
      } else if (y < (x - this.x3) * tan60 + this.y3) {
        return false;
      }
    } else if (x < this.x3) {
      if (y > (x - this.x1) * tan60 + this.y1) {
        return false;
      }
    } else if (y > (x - this.x3) * -tan60 + this.y3) {
      return false;
    }
    return true;
  }
}

export default Triangle;
