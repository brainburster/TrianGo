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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stateStack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stateStack */ "./src/stateStack.js");


class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
    this.ms_update_delay = 16;
    this.state_stack = new _stateStack__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  getCanvas() {
    return this.canvas;
  }

  handleInput() {
    this.state_stack.handleInput();
  }

  update() {
    this.state_stack.update();
  }

  render() {
    this.ctx.fillStyle = '#CCC';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.state_stack.render();
  }

  run() {
    let previous = (new Date()).getTime();
    let lag = 0.0;

    const gameloop = () => {
      const current = (new Date()).getTime();
      const elapsed = current - previous;
      previous = current;
      lag += elapsed;
      this.handleInput();

      while (lag >= this.ms_update_delay) {
        this.update();
        lag -= this.ms_update_delay;
      }
      this.render();
      requestAnimationFrame(gameloop);
    };

    requestAnimationFrame(gameloop);
  }

  changeState(state) {
    this.state_stack.push(state);
  }

  rollbackState() {
    return this.state_stack.pop();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./src/gameState/game.state.js":
/*!*************************************!*\
  !*** ./src/gameState/game.state.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./src/global.js");


const allGameStates = {
  gameStart: null,
  gameEnd: null,
  playersTurn: null,
  aisTurn: null,
};

// ///////////////////////////////////////
/**
 * 游戏开始（设置）界面
 */
// ///////////////////////////////////////
allGameStates.gameStart = (function GameStart() {
  const ctx = _global__WEBPACK_IMPORTED_MODULE_0__["default"].getCtx();
  const o = {};
  o.nextState = () => allGameStates.playersTurn;
  o.handleInput = () => {};
  o.render = () => {
    ctx.fillStyle = 'black';
    ctx.fillText('gameStart!', 50, 50);
  };
  return o;
}());

// ///////////////////////////////////////
/**
 * 游戏结束界面
 */
// ///////////////////////////////////////
allGameStates.gameEnd = (function GameEnd() {
  const ctx = _global__WEBPACK_IMPORTED_MODULE_0__["default"].getCtx();
  const o = {};
  o.nextState = () => allGameStates.gameStart;
  o.handleInput = () => {};
  o.render = () => {
    ctx.fillStyle = 'black';
    ctx.fillText('gameEnd!', 50, 50);
  };
  return o;
}());

// ///////////////////////////////////////
/**
 * 轮到玩家的回合
 */
// ///////////////////////////////////////
allGameStates.playersTurn = (function PlayersTurn() {
  const board = _global__WEBPACK_IMPORTED_MODULE_0__["default"].getBoard();
  const ctx = _global__WEBPACK_IMPORTED_MODULE_0__["default"].getCtx();
  const o = {};
  o.nextState = () => allGameStates.aisTurn;
  o.handleInput = () => {};
  o.render = () => {
    board.render(ctx);
  };
  return o;
}());

// ///////////////////////////////////////
/**
 * 轮到轮到AI的回合
 * class AIsTurn : InGame
 */
// ///////////////////////////////////////
allGameStates.aisTurn = (function AIsTurn() {
  const board = _global__WEBPACK_IMPORTED_MODULE_0__["default"].getBoard();
  const ctx = _global__WEBPACK_IMPORTED_MODULE_0__["default"].getCtx();
  const o = {};
  o.nextState = () => allGameStates.playersTurn;
  o.handleInput = () => {};
  o.render = () => {
    board.render(ctx);
  };
  return o;
}());

/* harmony default export */ __webpack_exports__["default"] = (allGameStates);


/***/ }),

/***/ "./src/global.js":
/*!***********************!*\
  !*** ./src/global.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input */ "./src/input.js");
/* harmony import */ var _triango_board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./triango.board */ "./src/triango.board.js");




const global = (() => {
  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();
  const board = new _triango_board__WEBPACK_IMPORTED_MODULE_2__["default"]();
  const input = new _input__WEBPACK_IMPORTED_MODULE_1__["default"](game.canvas);
  input.listen();
  return {
    getGame: () => game,
    getCtx: () => game.ctx,
    getCanvas: () => game.canvas,
    getBoard: () => board,
    getInput: () => input,
  };
})();


/* harmony default export */ __webpack_exports__["default"] = (global);


/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Input {
  /**
   * 监听输入
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.keyDown = {};
    this.keyCodeDown = new Array(256);
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseWheel = 0;
    this.lBtnDown = false;
    this.mBtnDown = false;
    this.rBtnDown = false;
    this.mouseLeave = true;
  }

  listen() {
    this.canvas.addEventListener('mouseleave', () => {
      this.mouseLeave = true;
    });
    this.canvas.addEventListener('mouseenter', () => {
      this.mouseLeave = false;
    });
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
    });
    this.canvas.addEventListener('mousedown', (e) => {
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
      switch (e.button) {
        case '0':
          this.lBtnDown = true;
          break;
        case '1':
          this.mBtnDown = true;
          break;
        case '2':
          this.rBtnDown = true;
          break;
        default:
          break;
      }
    });
    this.canvas.addEventListener('mouseup', (e) => {
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
      switch (e.button) {
        case '0':
          this.lBtnDown = false;
          break;
        case '1':
          this.mBtnDown = false;
          break;
        case '2':
          this.rBtnDown = false;
          break;
        default:
          break;
      }
    });
    this.canvas.addEventListener('wheel', (e) => {
      this.mouseWheel += Math.round(e.deltaY / 100);
      this.mouseWheel = (this.mouseWheel + 100) % 100;
    });
    window.addEventListener('keydown', (e) => {
      this.keyDown[e.key] = true;
      this.keyCodeDown[e.keyCode] = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keyDown[e.key] = false;
      this.keyCodeDown[e.keyCode] = false;
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Input);


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./src/global.js");
/* harmony import */ var _gameState_game_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameState/game.state */ "./src/gameState/game.state.js");



function main() {
  const game = _global__WEBPACK_IMPORTED_MODULE_0__["default"].getGame();
  game.changeState(_gameState_game_state__WEBPACK_IMPORTED_MODULE_1__["default"].gameStart);
  document.getElementById('triango').appendChild(game.getCanvas());
  game.run();
}

main();


/***/ }),

/***/ "./src/stateStack.js":
/*!***************************!*\
  !*** ./src/stateStack.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// class State {
//   constructor() {
//     this.gameObjs = [];
//   }

// nextState() {
//   throw 'abstract method';
// }

// handleInput() {
//   throw 'abstract method';
// }

//   update() {
//     this.gameObjs.forEach(obj => obj && obj.update && obj.update());
//   }

//   render() {
//     this.gameObjs.forEach(obj => obj && obj.render && obj.render(this.ctx));
//   }
// }

class StateStack {
  constructor() {
    this.states = [];
    this.top = 0;
  }

  pop() {
    if (this.top < 1) {
      return undefined;
    }
    return this.states[--this.top]; // eslint-disable-line
  }

  /** @param {State} state */
  push(state) {
    this.states[this.top++] = state; // eslint-disable-line
  }

  peek() {
    if (this.top > 0) {
      return this.states[this.top - 1];
    }
    return undefined;
  }

  length() {
    return this.top;
  }

  clear() {
    delete this.states;
    this.states = [];
    this.top = 0;
  }

  handleInput() {
    const topState = this.peek();
    return topState && topState.handleInput && topState.handleInput();
  }

  update() {
    const topState = this.peek();
    return topState && topState.update && topState.update();
  }

  render() {
    const topState = this.peek();
    return topState && topState.render && topState.render();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (StateStack);


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
  constructor(x, y, r, up = true, color = 'black') {
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
      this.y3 = this.y - 1.5 * this.r;
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

/***/ "./src/triango.board.js":
/*!******************************!*\
  !*** ./src/triango.board.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _triangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triangle */ "./src/triangle.js");


class TriangoBoard {
  constructor() {
    this.triangle = new _triangle__WEBPACK_IMPORTED_MODULE_0__["default"](200, 200, 50, true, 'black');
  }

  render(ctx) {
    this.triangle.draw(ctx);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TriangoBoard);


/***/ })

/******/ });
//# sourceMappingURL=main.js.map