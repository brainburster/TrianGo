/* eslint-disable no-bitwise */
import {
  PieceState,
  TriangleChecker as TriChecker,
} from './triangleChecker';
import global from './global';

const cos30 = 0.866;

class OpenList {
  constructor() {
    this.data = [];
  }

  static index2xy(index) {
    return {
      x: index & 0b1111,
      y: index >>> 4,
    };
  }

  static xy2index(xx, yy) {
    let index = yy << 4;
    index |= xx & 0b1111;
    return index;
  }

  push(x, y) {
    this.data.push(OpenList.xy2index(x, y));
  }

  indexof(x, y) {
    const index = OpenList.xy2index(x, y);
    return this.data.indexOf(index);
  }

  clear() {
    this.data.length = 0;
  }

  /**
   * @callback forEachCallBack
   * @param {number} x
   * @param {number} y
   */

  /**
   *
   * @param {forEachCallBack} callback
   */
  forEach(callback) {
    for (let i = 0; i < this.data.length; i += 1) {
      const index = this.data[i];
      const {
        x,
        y,
      } = OpenList.index2xy(index);
      callback(x, y);
    }
  }
}

/**
 * 得到相反颜色
 * @param {PieceState} color
 */
function getOppositeColor(color) {
  switch (color) {
    case PieceState.black:
      return PieceState.white;
    case PieceState.white:
      return PieceState.black;
    default:
      return PieceState.void;
  }
}

class TriangoBoard {
  constructor() {
    // 棋盘数据，棋盘大小8x2x8, 数据大小 16*8*4 bit
    this.black = new Uint16Array(8); // 黑棋
    this.white = new Uint16Array(8); // 白棋
    this.ban = new Uint16Array(8); // 禁入点
    this.ko = new Uint16Array(8); // 劫
    /** @type {TriChecker[]} */
    this.triCheckers = [];
    /** @type {{x:number,y:number}[][][]} */
    this.adjacencylist = [];
    for (let i = 0; i < 16; i += 1) {
      this.adjacencylist.push([]);
    }
    let up = true;
    const r = 20;
    const offsetX = 45;
    const offsetY = 420;
    const gapX = 1;
    const gapY = 1;
    for (let j = 0; j < 8; j += 1) {
      for (let i = 0; i < 16; i += 1) {
        // 添加checker
        const triChecker = new TriChecker(offsetX + i * (r * cos30 + gapX) + j * (r * cos30 + gapY),
          offsetY - (1 + j) * (r * 1.5 + gapY), r, up, {
            x: i,
            y: j,
          }, (checker) => {
            const color = global.getAllPieceState().playerColor;
            const {
              x,
              y,
            } = checker.coordinate;
            this.setData(x, y, color);
            return color;
          });
        this.triCheckers.push(triChecker);
        up = !up;
        this.adjacencylist[i][j] = [];
        const ii1 = i - 1;
        const ii2 = i + 1;
        const ii = (i & 1) ? i - 1 : i + 1;
        const jj = (i & 1) ? j + 1 : j - 1;
        if (ii1 > -1) {
          this.adjacencylist[i][j].push({
            x: ii1,
            y: j,
          });
        }
        if (ii2 < 16) {
          this.adjacencylist[i][j].push({
            x: ii2,
            y: j,
          });
        }
        if (ii < 16 && ii > -1 && jj < 8 && jj > -1) {
          this.adjacencylist[i][j].push({
            x: ii,
            y: jj,
          });
        }
      }
    }
    this.updateAllCheckers();
  }

  /**
   * 通过棋盘坐标获得数据
   * @param {number} x △ 的 x坐标 0~15
   * @param {number} y △ 的 y坐标 0~7
   * @returns {PieceState} 返回一个棋子状态的“枚举值”
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
    this.updateBoard(x, y);
    this.updateAllCheckers();
  }

  updateBoard(x, y) {
    const openlist = new OpenList();
    const adjacencys = this.adjacencylist[x][y];
    const deletlist = [];

    const test = (xx, yy, color) => {
      if (openlist.indexof(xx, yy) > -1) {
        return false;
      }
      const clr = this.getData(xx, yy);
      if (clr === PieceState.blank || clr === PieceState.ko || clr === PieceState.ban) {
        return true;
      }
      if (clr !== color) {
        return false;
      }
      openlist.push(xx, yy);
      const adjs = this.adjacencylist[xx][yy];
      return adjs.reduce((total, adj) => total || test(adj.x, adj.y, color), false);
      // return adjs.some(adj => test(adj.x, adj.y, color));
    };

    let hasLiberty;
    let flag = false;
    const color = this.getData(x, y);
    adjacencys.forEach((adjacency) => {
      if (openlist.indexof(adjacency.x, adjacency.y) !== -1) {
        return;
      }
      const xx = adjacency.x;
      const yy = adjacency.y;
      const clr = this.getData(xx, yy);
      if (clr !== getOppositeColor(color)) {
        if (clr === PieceState.blank) {
          flag = true;
        }
        return;
      }
      openlist.clear();
      hasLiberty = test(xx, yy, clr);
      if (!hasLiberty) {
        flag = true;
        openlist.forEach((xxx, yyy) => {
          deletlist.push({
            x: xxx,
            y: yyy,
          });
        });
      }
    });

    // 如果对方还有气
    if (!flag) {
      openlist.clear();
      hasLiberty = test(x, y, color);
      if (!hasLiberty) {
        openlist.forEach((xxx, yyy) => {
          deletlist.push({
            x: xxx,
            y: yyy,
          });
        });
      }
    }

    deletlist.forEach((point) => {
      this.setData(point.x, point.y, PieceState.blank);
    });
    openlist.clear();
    deletlist.length = 0;
  }

  updateAllCheckers() {
    this.triCheckers.forEach((triChecker) => {
      const data = this.getData(triChecker.coordinate.x, triChecker.coordinate.y);
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

  handleInput(onboardchange) {
    const olddata = {
      black: new Int32Array(this.black),
      white: new Int32Array(this.white),
    };
    this.triCheckers.forEach(triChecker => triChecker.handleInput());
    if (!onboardchange) {
      return;
    }
    let flag = false;
    flag = olddata.black.some((value, index) => value !== this.black[index]);
    flag = flag || olddata.white.some((value, index) => value !== this.white[index]);
    if (flag) {
      onboardchange();
    }
  }

  clear() {
    this.black = new Uint16Array(8); // 黑棋
    this.white = new Uint16Array(8); // 白棋
    this.ban = new Uint16Array(8); // 禁入点
    this.ko = new Uint16Array(8); // 劫
    this.updateAllCheckers();
  }
}

TriangoBoard.instance = new TriangoBoard();

export default TriangoBoard;
