/* eslint-disable no-bitwise */
import TriangleChecker from './triangleChecker';

const cos30 = 0.866;

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

class TriangoBoard {
  constructor() {
    // 棋盘数据，棋盘大小8x2x8, 数据大小 16*8*4 bit
    this.black = new Uint16Array(8); // 黑棋
    this.white = new Uint16Array(8); // 白棋
    this.ban = new Uint16Array(8); // 禁入点
    this.ko = new Uint16Array(8); // 劫
    this.triangleCheckers = [];
    let up = true;
    const r = 25;
    const offsetX = 180;
    const offsetY = 120;
    for (let j = 0; j < 8; j += 1) {
      for (let i = 0; i < 16; i += 1) {
        this.triangleCheckers.push(new TriangleChecker(offsetX + i * r * cos30 - j * r * cos30, offsetY + j * r * 1.5, r, up, 'white'));
        up = !up;
      }
    }
  }

  /**
   * 通过棋盘坐标获得数据
   * @param {number} x △▽ 的 x坐标 0~7
   * @param {number} y △▽ 的 y坐标 0~7
   * @param {boolean} up ture:获得△的状态,false：获得▽的状态
   * @returns {number} 返回一个棋子状态的“枚举值”
   */
  getData(x, y, up) {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return PieceState.void;
    }
    const z = up ? 0 : 1;
    const flag = 1 << (x * 2 + z);
    if (this.black[y] & flag) {
      return PieceState.black;
    }
    if (this.white[y] & flag) {
      return PieceState.white;
    }
    if (this.ban[y] & flag) {
      return PieceState.ban;
    }
    if (this.ko[y] & flag) {
      return PieceState.ko;
    }
    return PieceState.blank;
  }

  /**
   * 通过棋盘坐标设置数据
   * @param {number} x △▽ 的 x坐标 0~7
   * @param {number} y △▽ 的 y坐标 0~7
   * @param {boolean} up ture:设置△的状态,false：设置▽的状态
   * @param {PieceState} data 棋子的状态 {PieceState}
   */
  setData(x, y, up, data) {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return;
    }
    const z = up ? 0 : 1;
    const flag = 1 << (x * 2 + z);

    this.black[y] &= ~flag;
    this.white[y] &= ~flag;
    this.ban[y] &= ~flag;
    this.ko[y] &= ~flag;

    switch (data) {
      case PieceState.black:
        this.black[y] |= flag;
        break;
      case PieceState.white:
        this.white[y] |= flag;
        break;
      case PieceState.ban:
        this.ban[y] |= flag;
        break;
      case PieceState.ko:
        this.ko[y] |= flag;
        break;
      default:
        break;
    }
  }

  update() {
    this.triangleCheckers.forEach((triangleChecer) => {
      triangleChecer.update();
    });
  }

  render() {
    this.triangleCheckers.forEach((triangleChecer) => {
      triangleChecer.render();
    });
  }

  handleInput() {
    this.triangleCheckers.forEach((triangleChecer) => {
      triangleChecer.handleInput();
    });
  }
}

export default TriangoBoard;
