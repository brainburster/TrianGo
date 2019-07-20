/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */

class CanvasButton {
  constructor(x, y, w, h, r, text, onclick, onmousedown, onmouseup, onmouseleave, onnormal) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.text = text;
    this.onclick = onclick;
    this.onmousedown = onmousedown;
    this.onmouseup = onmouseup;
    this.onmouseleave = onmouseleave;
    this.onnormal = onnormal;
    this.state = 0;
    this.states = {
      normal: 0,
      pressed: 1,
      hover: 2,
    };
    this.hidden = false;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    if (this.hidden) {
      return;
    }

    const w = this.w + this.r / 2;
    const h = this.h + this.r / 2;
    const x = this.x - w / 2;
    const y = this.y - h / 2;
    const {
      r,
    } = this;
    const pi = Math.PI;

    ctx.beginPath();

    // ctx.rect(x, y, this.w, this.h);
    ctx.lineTo(x, y + h - r);
    ctx.arc(x + r, y + r, r, pi, pi * 1.5);
    ctx.lineTo(x + w - r, y);
    ctx.arc(x + w - r, y + r, r, pi * 1.5, pi * 2);
    ctx.lineTo(w + x, y + h - r);
    ctx.arc(x + w - r, y + h - r, r, 0, pi * 0.5);
    ctx.lineTo(x + r, h + y);
    ctx.arc(x + r, y + h - r, r, pi * 0.5, pi);

    switch (this.state) {
      case this.states.normal:
        ctx.fillStyle = 'white';
        break;
      case this.states.pressed:
        ctx.fillStyle = 'gray';
        break;
      case this.states.hover:
        ctx.fillStyle = 'yellow';
        break;
      default:
        break;
    }
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    ctx.font = '20px Georgia';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(this.text, this.x, this.y, this.w - this.r / 2);
  }

  /**
   *
   * @param {number} mx
   * @param {number} my
   * @param {boolen} lbtndown
   */
  handleInput(mx, my, lbtndown) {
    if (this.hidden) {
      return;
    }
    const x1 = this.x - this.w / 2;
    const y1 = this.y - this.h / 2;
    const x2 = this.x + this.w / 2;
    const y2 = this.y + this.h / 2;

    if (mx > x1 && my > y1 && mx < x2 && my < y2) {
      if (lbtndown) {
        if (this.state === this.states.hover || this.state === this.states.normal) {
          this.onclick && this.onclick();
        } else {
          this.onmousedown && this.onmousedown();
        }
        this.state = this.states.pressed;
      } else {
        if (this.state === this.states.pressed) {
          this.onmouseup && this.onmouseup();
        }
        this.state = this.states.hover;
      }
    } else {
      if (this.state === this.states.pressed) {
        this.onmouseleave && this.onmouseleave();
      } else {
        this.onnormal && this.onnormal();
      }
      this.state = this.states.normal;
    }
  }
}

export default CanvasButton;
