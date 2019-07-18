import Triangle from './triangle';
import global from './global';

const ctx = global.getCtx();
const input = global.getInput();

const CheckerState = {
  normal: {
    onStart: (tribtn) => {
      tribtn.setColor('black');
    },
    handleInput: (tribtn) => {
      const x = input.mouseX;
      const y = input.mouseY;
      if (!tribtn.triangle.mouseCheck(x, y)) {
        return;
      }
      if (input.lBtnDown) {
        tribtn.changeState(CheckerState.active);
      } else {
        tribtn.changeState(CheckerState.hover);
      }
    },
  },
  hover: {
    onStart: (tribtn) => {
      tribtn.setColor('yellow');
    },
    handleInput: (tribtn) => {
      const x = input.mouseX;
      const y = input.mouseY;
      if (input.lBtnDown) {
        tribtn.changeState(CheckerState.active);
      } else if (!tribtn.triangle.mouseCheck(x, y)) {
        tribtn.changeState(CheckerState.normal);
      }
    },
  },
  active: {
    onStart: (tribtn) => {
      tribtn.setColor('red');
    },
    handleInput: (tribtn) => {
      const x = input.mouseX;
      const y = input.mouseY;
      if (!tribtn.triangle.mouseCheck(x, y)) {
        tribtn.changeState(CheckerState.normal);
        return;
      }
      if (!input.lBtnDown) {
        tribtn.changeState(CheckerState.hover);
      }
    },
  },
};

class TriangleChecker {
  constructor(x, y, r, up, color) {
    this.triangle = new Triangle(x, y, r, up, color);
    this.state = CheckerState.normal;
  }

  setColor(color) {
    this.triangle.color = color;
  }

  changeState(state) {
    this.state = state;
    this.state.onStart(this);
  }

  render() {
    this.triangle.draw(ctx);
    // return this.state && this.state.draw && this.state.draw(this);
  }

  handleInput() {
    return this.state && this.state.handleInput && this.state.handleInput(this);
  }

  update() {
    return this.state && this.state.update && this.state.update(this);
  }
}

export default TriangleChecker;
