/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/AI/AI.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AI/AI.impl.js":
/*!***************************!*\
  !*** ./src/AI/AI.impl.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pieceState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pieceState */ "./src/pieceState.js");


function run(data) {
  let x;
  let y;
  do {
    x = Math.random() * 8 >>> 0;
    y = Math.random() * 4 >>> 0;
  } while (data.getData(x, y) !== _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].blank);
  return {
    x,
    y,
  };
}

/* harmony default export */ __webpack_exports__["default"] = (run);


/***/ }),

/***/ "./src/AI/AI.worker.js":
/*!*****************************!*\
  !*** ./src/AI/AI.worker.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AI_impl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AI.impl */ "./src/AI/AI.impl.js");
/* harmony import */ var _triangoBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../triangoBoard */ "./src/triangoBoard.js");



onmessage = (e) => {
  const board = new _triangoBoard__WEBPACK_IMPORTED_MODULE_1__["TriBoardData"]();
  board.black = e.data.black;
  board.white = e.data.white;
  board.ko = e.data.ko;
  board.ban = e.data.ban;
  postMessage(Object(_AI_impl__WEBPACK_IMPORTED_MODULE_0__["default"])(board));
};


/***/ }),

/***/ "./src/pieceState.js":
/*!***************************!*\
  !*** ./src/pieceState.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 棋子状态的枚举
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

/* harmony default export */ __webpack_exports__["default"] = (PieceState);


/***/ }),

/***/ "./src/triangle.js":
/*!*************************!*\
  !*** ./src/triangle.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Triangle);


/***/ }),

/***/ "./src/triangleChecker.js":
/*!********************************!*\
  !*** ./src/triangleChecker.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _triangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triangle */ "./src/triangle.js");
/* harmony import */ var _pieceState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pieceState */ "./src/pieceState.js");


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
        case _pieceState__WEBPACK_IMPORTED_MODULE_1__["default"].black:
          szColor = 'black';
          break;
        case _pieceState__WEBPACK_IMPORTED_MODULE_1__["default"].white:
          szColor = 'white';
          break;
        case _pieceState__WEBPACK_IMPORTED_MODULE_1__["default"].blank:
          szColor = 'gray';
          break;
        case _pieceState__WEBPACK_IMPORTED_MODULE_1__["default"].ban:
          szColor = 'pink';
          break;
        case _pieceState__WEBPACK_IMPORTED_MODULE_1__["default"].ko:
          szColor = 'green';
          break;
        default:
          szColor = 'blue';
          break;
      }
      checker.setColor(szColor);
    },
    update: (checker) => {
      CheckerState.normal.onStart(checker);
    },
    handleInput: (x, y, lBtnDown, checker) => {
      if (checker.data !== _pieceState__WEBPACK_IMPORTED_MODULE_1__["default"].blank) {
        return;
      }
      if (!checker.triangle.mouseCheck(x, y)) {
        return;
      }
      if (lBtnDown) {
        checker.changeState(CheckerState.keydown);
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
    handleInput: (x, y, lBtnDown, checker) => {
      if (lBtnDown) {
        checker.changeState(CheckerState.keydown);
      } else if (!checker.triangle.mouseCheck(x, y)) {
        checker.changeState(CheckerState.normal);
      }
    },
  },
  keydown: {
    onStart: (checker) => {
      checker.setColor('red');
    },
    handleInput: (x, y, lBtnDown, checker) => {
      if (!checker.triangle.mouseCheck(x, y)) {
        checker.changeState(CheckerState.normal);
      }
      if (!lBtnDown) {
        checker.onactive(checker);
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
    this.triangle = new _triangle__WEBPACK_IMPORTED_MODULE_0__["default"](x, y, r, up);
    this.coordinate = coordinate;
    this.data = _pieceState__WEBPACK_IMPORTED_MODULE_1__["default"].blank;
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

  render(ctx) {
    return this.triangle.draw && this.triangle.draw(ctx);
  }

  handleInput(x, y, lBtnDown) {
    return this.state.handleInput && this.state.handleInput(x, y, lBtnDown, this);
  }

  update() {
    return this.state.update && this.state.update(this);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TriangleChecker);


/***/ }),

/***/ "./src/triangoBoard.js":
/*!*****************************!*\
  !*** ./src/triangoBoard.js ***!
  \*****************************/
/*! exports provided: TriBoardData, TriangoBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriBoardData", function() { return TriBoardData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriangoBoard", function() { return TriangoBoard; });
/* harmony import */ var _pieceState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pieceState */ "./src/pieceState.js");
/* harmony import */ var _triangleChecker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./triangleChecker */ "./src/triangleChecker.js");



const cos30 = 0.866;

class History {
  constructor(data) {
    this.data = [];
    this.current = -1;
    this.push(data);
  }

  push(data) {
    this.data.length = this.current + 1;
    this.data.push({
      black: data.black,
      white: data.white,
      ban: data.ban,
      ko: data.ko,
      cclr: data.currentColor,
    });
    this.current += 1;
  }

  undo(data) {
    this.current -= 1;
    if (this.current === -1) {
      this.current = 0;
      return false;
    }
    const backup = this.data[this.current];
    data.black = backup.black;
    data.white = backup.white;
    data.ko = backup.ko;
    data.ban = backup.ban;
    data.currentColor = backup.cclr;
    return true;
  }

  redo(data) {
    this.current += 1;
    if (this.current === this.data.length) {
      this.current = this.data.length - 1;
      return false;
    }
    const backup = this.data[this.current];
    data.black = backup.black;
    data.white = backup.white;
    data.ko = backup.ko;
    data.ban = backup.ban;
    data.currentColor = backup.cclr;
    return true;
  }

  contain(black, white, currentColor) {
    for (let i = this.current; i > -1; i -= 1) {
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
    case _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].black:
      return _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].white;
    case _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].white:
      return _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].black;
    default:
      return _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].void;
  }
}

class TriBoardData {
  constructor() {
    // 棋盘数据，棋盘大小4x2x4, 数据大小 32*4 bit
    this.black = 0; // 黑棋
    this.white = 0; // 白棋
    this.ban = 0; // 禁入点
    this.ko = 0; // 劫
    this.currentColor = _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].black;
    this.history = new History(this);
    /** @type {{x:number,y:number}[][][]} */
    this.adjacencylist = [];
    for (let i = 0; i < 8; i += 1) {
      this.adjacencylist.push([]);
    }
    for (let j = 0; j < 4; j += 1) {
      for (let i = 0; i < 8; i += 1) {
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
  }

  save() {
    this.history.push(this);
  }

  undo() {
    return this.history.undo(this);
  }

  redo() {
    return this.history.redo(this);
  }

  setCurrentColor(color) {
    this.currentColor = color;
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

  getData(x, y) {
    if (x < 0 || x > 7 || y < 0 || y > 3) {
      return _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].void;
    }
    const flag = 1 << (x | (y << 3));
    if (this.black & flag) {
      return _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].black;
    }
    if (this.white & flag) {
      return _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].white;
    }
    if (this.ban & flag) {
      return _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].ban;
    }
    if (this.ko & flag) {
      return _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].ko;
    }
    return _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].blank;
  }

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
      case _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].black:
        this.black |= flag;
        break;
      case _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].white:
        this.white |= flag;
        break;
      case _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].ban:
        this.ban |= flag;
        break;
      case _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].ko:
        this.ko |= flag;
        break;
      default:
        break;
    }
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
        if (this.getData(i, j) === _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].blank) {
          const adjacencys = this.adjacencylist[i][j];
          const sum = adjacencys.reduce((previous, current) => {
            const color = this.getData(current.x, current.y);
            return previous + ((color === _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].blank) ? 0 : 1);
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
      if (this.getData(x, y) === _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].blank) {
        this.setData(x, y, _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].ban);
      } else if (this.history.contain(this.black, this.white, clr)) {
        this.setData(x, y, _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].ko);
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
      if (clr === _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].blank || clr === _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].ko || clr === _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].ban) {
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
        if (clr === _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].blank) {
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
      this.setData(point.x, point.y, _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].blank);
    });
    openlist.clear();
  }

  clear() {
    this.black = 0; // 黑棋
    this.white = 0; // 白棋
    this.ban = 0; // 禁入点
    this.ko = 0; // 劫
    this.currentColor = _pieceState__WEBPACK_IMPORTED_MODULE_0__["default"].black;
    this.history.clear();
  }
}

class TriBoardView {
  constructor(onactive) {
    /** @type {TriChecker[]} */
    this.triCheckers = [];
    let up = true;
    const r = 60;
    const offsetX = 90;
    const offsetY = 520;
    const gapX = 1 / cos30;
    const gapY = 1;
    for (let j = 0; j < 4; j += 1) {
      for (let i = 0; i < 8; i += 1) {
        // 添加checker
        const triChecker = new _triangleChecker__WEBPACK_IMPORTED_MODULE_1__["default"](offsetX + i * (r * cos30 + gapX) + j * (r * cos30 + gapY),
          offsetY - (1 + j) * (r * 1.5 + gapY), r, up, {
            x: i,
            y: j,
          }, onactive);
        this.triCheckers.push(triChecker);
        up = !up;
      }
    }
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
}

class TriangoBoard {
  constructor() {
    this.data = new TriBoardData();
    this.view = new TriBoardView((checker) => {
      const {
        x,
        y,
      } = checker.coordinate;
      this.placePiece(x, y, this.getCurrentColor());
      return this.getCurrentColor();
    });
    this.updateAllCheckers();
  }

  save() {
    this.data.save();
  }

  setCurrentColor(color) {
    this.data.setCurrentColor(color);
  }

  undo() {
    if (this.data.undo()) {
      this.updateBanAndKo(this.getCurrentColor());
      this.updateAllCheckers();
      return true;
    }
    return false;
  }

  redo() {
    if (this.data.redo()) {
      this.updateBanAndKo(this.getCurrentColor());
      this.updateAllCheckers();
      return true;
    }
    return false;
  }

  getScore() {
    return this.data.getScore();
  }

  getData(x, y) {
    return this.data.getData(x, y);
  }

  setData(x, y, data) {
    this.data.setData(x, y, data);
  }

  placePiece(x, y, color) {
    this.setData(x, y, color);
    this.updateBlackAndWhite(x, y);
  }

  isGameEnd() {
    return this.data.isGameEnd();
  }

  updateBanAndKo(color) {
    this.data.updateBanAndKo(color);
  }

  updateBlackAndWhite(x, y) {
    this.data.updateBlackAndWhite(x, y);
  }

  updateAllCheckers() {
    this.view.triCheckers.forEach((triChecker) => {
      const data = this.getData(triChecker.coordinate.x, triChecker.coordinate.y);
      triChecker.setData(data);
    });
  }

  update() {
    this.view.update();
  }

  render(ctx) {
    this.view.render(ctx);
  }

  getCurrentColor() {
    return this.data.currentColor;
  }

  handleInput(x, y, lBtnDown, onBoardChange, onGameEnd) {
    const oldData = {
      black: this.data.black,
      white: this.data.white,
    };
    this.view.triCheckers.forEach(triChecker => triChecker.handleInput(x, y, lBtnDown));

    if (oldData.black !== this.data.black || oldData.white !== this.data.white) {
      onBoardChange && onBoardChange();
      this.updateBanAndKo(this.getCurrentColor());
      this.updateAllCheckers();
      this.save();
      if (this.isGameEnd()) {
        onGameEnd && onGameEnd();
      }
      return true;
    }
    return false;
  }

  clear() {
    this.data.clear();
    this.updateAllCheckers();
  }
}

TriangoBoard.instance = new TriangoBoard();




/***/ })

/******/ });
//# sourceMappingURL=AI.worker.js.map