/* eslint-disable no-bitwise */
import {
  PieceState,
  TriangleChecker as TriChecker,
} from './triangleChecker';

const cos30 = 0.866;

class TriangoBoard {
  constructor() {
    // 棋盘数据，棋盘大小8x2x8, 数据大小 16*8*4 bit
    this.black = new Uint16Array(8); // 黑棋
    this.white = new Uint16Array(8); // 白棋
    this.ban = new Uint16Array(8); // 禁入点
    this.ko = new Uint16Array(8); // 劫
    /** @type {TriChecker[]} */
    this.triCheckers = [];
    let up = true;
    const r = 20;
    const offsetX = 45;
    const offsetY = 420;
    for (let j = 0; j < 8; j += 1) {
      for (let i = 0; i < 16; i += 1) {
        const triChecker = new TriChecker(offsetX + i * r * cos30 + j * r * cos30,
          offsetY - (1 + j) * r * 1.5, r, up, {
            x: i,
            y: j,
          }, (checker) => {
            const color = PieceState.black;
            const {
              x,
              y,
            } = checker.coordinate;
            // console.log(x, y);
            this.setData(x, y, color);
            return color;
          });
        this.triCheckers.push(triChecker);
        up = !up;
      }
    }
  }

  /**
   * 通过棋盘坐标获得数据
   * @param {number} x △ 的 x坐标 0~15
   * @param {number} y △ 的 y坐标 0~7
   * @returns {number} 返回一个棋子状态的“枚举值”
   */
  getData(x, y) {
    if (x < 0 || x > 15 || y < 0 || y > 7) {
      return PieceState.void;
    }
    const flag = 1 << x;
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
   * @param {number} x △ 的 x坐标 0~15
   * @param {number} y △ 的 y坐标 0~7
   * @param {PieceState} data 棋子的状态 {PieceState}
   */
  setData(x, y, data) {
    if (x < 0 || x > 15 || y < 0 || y > 7) {
      return;
    }
    const flag = 1 << x;

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
    this.updateAllCheckers();
  }

  updateAllCheckers() {
    this.triCheckers.forEach((triChecker) => {
      const {
        x,
        y,
      } = triChecker.coordinate;
      const data = this.getData(x, y);
      triChecker.setData(data);
    });
  }

  update() {
    this.triCheckers.forEach((triChecker) => {
      triChecker.update();
    });
  }

  render() {
    this.triCheckers.forEach((triChecker) => {
      triChecker.render();
    });
  }

  handleInput() {
    this.triCheckers.forEach((triChecker) => {
      triChecker.handleInput();
    });
  }
}

export default TriangoBoard;
