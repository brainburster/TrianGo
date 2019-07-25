import {
  PieceState,
  TriangleChecker as TriChecker,
} from './triangleChecker';

const cos30 = 0.866;

class History {
  constructor(board) {
    this.data = [];
    this.current = -1;
    this.push(board);
  }

  push(board) {
    this.data.length = this.current + 1;
    this.data.push({
      black: board.black,
      white: board.white,
      ban: board.ban,
      ko: board.ko,
      cclr: board.currentColor,
    });
    this.current += 1;
  }

  undo(board) {
    this.current -= 1;
    if (this.current === -1) {
      this.current = 0;
      return false;
    }
    const backup = this.data[this.current];
    board.black = backup.black;
    board.white = backup.white;
    board.ko = backup.ko;
    board.ban = backup.ban;
    board.currentColor = backup.cclr;
    return true;
  }

  redo(board) {
    this.current += 1;
    if (this.current === this.data.length) {
      this.current = this.data.length - 1;
      return false;
    }
    const backup = this.data[this.current];
    board.black = backup.black;
    board.white = backup.white;
    board.ko = backup.ko;
    board.ban = backup.ban;
    board.currentColor = backup.cclr;
    return true;
  }

  contain(black, white, currentColor) {
    for (let i = 0; i <= this.current; i += 1) {
      const backup = this.data[i];
      if (backup.black === black && backup.white === white && backup.cclr === currentColor) {
        return true;
      }
    }
    return false;
    // return this.data.some((v, i) => i <= this.current
    // && v.black === black && v.white === white && v.cclr === currentColor);
  }

  clear() {
    this.data.length = 1;
    this.current = 0;
  }
}

class OpenList {
  constructor() {
    this.data = [];
  }

  static index2xy(index) {
    return {
      x: index & 0b111,
      y: index >>> 3,
    };
  }

  static xy2index(xx, yy) {
    let index = yy << 3;
    index |= xx & 0b111;
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
    // 棋盘数据，棋盘大小4x2x4, 数据大小 32*4 bit
    this.black = 0; // 黑棋
    this.white = 0; // 白棋
    this.ban = 0; // 禁入点
    this.ko = 0; // 劫
    this.currentColor = PieceState.black;
    /** @type {TriChecker[]} */
    this.triCheckers = [];
    /** @type {{x:number,y:number}[][][]} */
    this.adjacencylist = [];
    for (let i = 0; i < 8; i += 1) {
      this.adjacencylist.push([]);
    }
    let up = true;
    const r = 60;
    const offsetX = 90;
    const offsetY = 520;
    const gapX = 1 / cos30;
    const gapY = 1;
    for (let j = 0; j < 4; j += 1) {
      for (let i = 0; i < 8; i += 1) {
        // 添加checker
        const triChecker = new TriChecker(offsetX + i * (r * cos30 + gapX) + j * (r * cos30 + gapY),
          offsetY - (1 + j) * (r * 1.5 + gapY), r, up, {
            x: i,
            y: j,
          }, (checker) => {
            const {
              x,
              y,
            } = checker.coordinate;
            this.placePiece(x, y, this.currentColor);
            return this.currentColor;
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
        if (ii2 < 8) {
          this.adjacencylist[i][j].push({
            x: ii2,
            y: j,
          });
        }
        if (ii < 8 && ii > -1 && jj < 4 && jj > -1) {
          this.adjacencylist[i][j].push({
            x: ii,
            y: jj,
          });
        }
      }
    }
    this.updateAllCheckers();
    this.history = new History(this);
  }

  setCurrentColor(color) {
    this.currentColor = color;
  }

  undo() {
    if (this.history.undo(this)) {
      this.updateBanAndKo();
      this.updateAllCheckers();
      return true;
    }
    return false;
  }

  redo() {
    if (this.history.redo(this)) {
      this.updateBanAndKo();
      this.updateAllCheckers();
      return true;
    }
    return false;
  }

  getScore() {
    let black = 0;
    let white = 0;

    let temp = this.black;
    while (temp) {
      temp &= temp - 1;
      black += 1;
    }
    temp = this.white;
    while (temp) {
      temp &= temp - 1;
      white += 1;
    }

    return {
      black,
      white,
    };
  }

  /**
   * 通过棋盘坐标获得数据
   * @param {number} x △ 的 x坐标 0~7
   * @param {number} y △ 的 y坐标 0~3
   * @returns {PieceState} 返回一个棋子状态的“枚举值”
   */
  getData(x, y) {
    if (x < 0 || x > 7 || y < 0 || y > 3) {
      return PieceState.void;
    }
    const flag = 1 << (x | (y << 3));
    if (this.black & flag) {
      return PieceState.black;
    }
    if (this.white & flag) {
      return PieceState.white;
    }
    if (this.ban & flag) {
      return PieceState.ban;
    }
    if (this.ko & flag) {
      return PieceState.ko;
    }
    return PieceState.blank;
  }

  /**
   * 通过棋盘坐标设置数据
   * @param {number} x △ 的 x坐标 0~7
   * @param {number} y △ 的 y坐标 0~3
   * @param {PieceState} data 棋子的状态 {PieceState}
   */
  setData(x, y, data) {
    if (x < 0 || x > 7 || y < 0 || y > 3) {
      return;
    }
    const flag = 1 << (x | (y << 3));

    this.black &= ~flag;
    this.white &= ~flag;
    this.ban &= ~flag;
    this.ko &= ~flag;

    switch (data) {
      case PieceState.black:
        this.black |= flag;
        break;
      case PieceState.white:
        this.white |= flag;
        break;
      case PieceState.ban:
        this.ban |= flag;
        break;
      case PieceState.ko:
        this.ko |= flag;
        break;
      default:
        break;
    }
  }

  placePiece(x, y, color) {
    this.setData(x, y, color);
    this.updateBlackAndWhite(x, y);
  }

  isGameEnd() {
    return (this.black | this.white | this.ban | this.ko) === -1;
  }

  updateBanAndKo(clr) {
    this.ban = 0;
    this.ko = 0;
    const scanPoints = [];
    for (let j = 0; j < 4; j += 1) {
      for (let i = 0; i < 8; i += 1) {
        if (this.getData(i, j) === PieceState.blank) {
          const adjacencys = this.adjacencylist[i][j];
          const sum = adjacencys.reduce((previous, current) => {
            const color = this.getData(current.x, current.y);
            return previous + ((color === PieceState.blank) ? 0 : 1);
          }, 0);

          if (sum === adjacencys.length) {
            scanPoints.push({
              x: i,
              y: j,
            });
          }
        }
      }
    }

    // update ban and ko
    const backupBlack = this.black;
    const backupWhite = this.white;
    scanPoints.forEach((point) => {
      const {
        x,
        y,
      } = point;
      this.setData(x, y, clr);
      this.updateBlackAndWhite(x, y);
      if (this.getData(x, y) === PieceState.blank) {
        this.setData(x, y, PieceState.ban);
      } else if (this.history.contain(this.black, this.white, clr)) {
        this.setData(x, y, PieceState.ko);
      }
      this.black = backupBlack;
      this.white = backupWhite;
    });
  }

  updateBlackAndWhite(x, y) {
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

  render(ctx) {
    this.triCheckers.forEach((triChecker) => {
      triChecker.render(ctx);
    });
  }

  handleInput(x, y, lBtnDown, onBoardChange, onGameEnd) {
    const oldData = {
      black: this.black,
      white: this.white,
    };
    this.triCheckers.forEach(triChecker => triChecker.handleInput(x, y, lBtnDown));

    if (oldData.black !== this.black || oldData.white !== this.white) {
      onBoardChange && onBoardChange();
      this.updateBanAndKo(this.currentColor);
      this.updateAllCheckers();
      this.history.push(this);
      if (this.isGameEnd()) {
        onGameEnd && onGameEnd();
      }
      return true;
    }
    return false;
  }

  clear() {
    this.black = 0; // 黑棋
    this.white = 0; // 白棋
    this.ban = 0; // 禁入点
    this.ko = 0; // 劫
    this.currentColor = PieceState.black;
    this.history.clear();
    this.updateAllCheckers();
  }
}

TriangoBoard.instance = new TriangoBoard();

export default TriangoBoard;
