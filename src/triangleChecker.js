import Triangle from './triangle';
import global from './global';

const ctx = global.getCtx();
const input = global.getInput();

/**
 * Enum for piece state
 * @readonly
 * @enum {number}
 */
const PieceState = {
  void: -1,
  blank: 0,
  black: 1,
  white: 2,
  ban: 3,
  ko: 4,
};

/**
 * All checker state object
 * @readonly
 */
const CheckerState = {
  normal: {
    /**
     * @fanction
     * @param {TriangleChecker} checker
     */
    onStart: (checker) => {
      let szColor = 'gray';
      switch (checker.data) {
        case PieceState.black:
          szColor = 'black';
          break;
        case PieceState.white:
          szColor = 'white';
          break;
        case PieceState.blank:
          szColor = 'gray';
          break;
        case PieceState.ban:
          szColor = 'green';
          break;
        case PieceState.ko:
          szColor = 'purple';
          break;
        default:
          szColor = 'blue';
          break;
      }
      checker.setColor(szColor);
    },
    handleInput: (checker) => {
      const x = input.mouseX;
      const y = input.mouseY;
      if (checker.data !== PieceState.blank) {
        return;
      }
      if (!checker.triangle.mouseCheck(x, y)) {
        return;
      }
      if (input.lBtnDown) {
        checker.changeState(CheckerState.active);
      } else {
        checker.changeState(CheckerState.hover);
      }
    },
  },
  hover: {
    /**
     * @fanction
     * @param {TriangleChecker} checker
     */
    onStart: (checker) => {
      checker.setColor('yellow');
    },
    handleInput: (checker) => {
      const x = input.mouseX;
      const y = input.mouseY;
      if (input.lBtnDown) {
        checker.changeState(CheckerState.active);
      } else if (!checker.triangle.mouseCheck(x, y)) {
        checker.changeState(CheckerState.normal);
      }
    },
  },
  active: {
    onStart: (checker) => {
      checker.setColor('red');
      const data = checker.onactive(checker);
      checker.setData(data);
    },
    handleInput: (checker) => {
      const x = input.mouseX;
      const y = input.mouseY;
      if (!checker.triangle.mouseCheck(x, y)) {
        checker.changeState(CheckerState.normal);
        return;
      }
      if (!input.lBtnDown) {
        // checker.changeState(CheckerState.hover);
        checker.changeState(CheckerState.normal);
      }
    },
  },
};

/**
 * 点击后发生的行为
 * @callback OnActive
 * @param {TriangleChecker} checker
 * @returns {pieceState}
 */

class TriangleChecker {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} r
   * @param {boolean} up
   * @param {{x:number,y:number}} coordinate
   * @param {OnActive} onactive
   */
  constructor(x, y, r, up, coordinate, onactive) {
    this.triangle = new Triangle(x, y, r, up);
    this.coordinate = coordinate;
    this.data = PieceState.blank;
    this.state = CheckerState.normal;
    this.state.onStart(this);
    this.onactive = onactive;
  }

  /**
   * 设置该棋盘格上的棋子数据
   * set piece state of this checker
   * @param {PieceState} pieceState
   * @example setData(PieceState.blank|PieceState.white|PieceState.black)
   */
  setData(pieceState) {
    this.data = pieceState;
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
  }

  handleInput() {
    this.state.handleInput(this);
  }

  update() {
    // eslint-disable-next-line no-unused-expressions
    this.state.update && this.state.update(this);
  }
}

export {
  PieceState,
  TriangleChecker,
};
