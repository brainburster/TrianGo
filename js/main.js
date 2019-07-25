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

/***/ "./src/AI.js":
/*!*******************!*\
  !*** ./src/AI.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _triangleChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triangleChecker */ "./src/triangleChecker.js");
// import TriangoBoard from './triangoBoard';


class AI {
  /** @param {TriangoBoard} board */
  constructor(board, onGameEnd) {
    this.board = board;
    this.onGameEnd = onGameEnd;
  }

  run() {
    this.board.updateBanAndKo(_triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].white);
    if (this.board.isGameEnd()) {
      this.onGameEnd && this.onGameEnd();
      return null;
    }
    let x;
    let y;
    do {
      x = Math.random() * 8 >>> 0;
      y = Math.random() * 4 >>> 0;
    } while (this.board.getData(x, y) !== _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].blank);
    return {
      x,
      y,
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AI);


/***/ }),

/***/ "./src/canvasButton.js":
/*!*****************************!*\
  !*** ./src/canvasButton.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (CanvasButton);


/***/ }),

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
    this.canvas.width = 800;
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

  getState() {
    return this.state_stack.peek();
  }

  lastState() {
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
/* harmony import */ var _canvasButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../canvasButton */ "./src/canvasButton.js");
/* harmony import */ var _triangoBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../triangoBoard */ "./src/triangoBoard.js");
/* harmony import */ var _triangleChecker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../triangleChecker */ "./src/triangleChecker.js");
/* harmony import */ var _AI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AI */ "./src/AI.js");







const game = _global__WEBPACK_IMPORTED_MODULE_0__["default"].getGame();
const input = _global__WEBPACK_IMPORTED_MODULE_0__["default"].getInput();
const ctx = _global__WEBPACK_IMPORTED_MODULE_0__["default"].getCtx();
const triangoBoard = _triangoBoard__WEBPACK_IMPORTED_MODULE_2__["default"].instance;

/**
 * 所有游戏状态
 */
const GameStates = {
  gameStart: null,
  gameEnd: null,
  debug: null,
  twoP: null,
  playersTurn: null,
  aisTurn: null,
};

const gameScene = (() => {
  const o = {};

  function GameEnd() {
    game.changeState(GameStates.gameEnd);
  }
  const btnReturn = new _canvasButton__WEBPACK_IMPORTED_MODULE_1__["default"](80, 50, 80, 50, 20, 'return', () => {
    triangoBoard.clear();
    game.changeState(GameStates.gameStart);
  });
  const btnUndo = new _canvasButton__WEBPACK_IMPORTED_MODULE_1__["default"](80, 150, 80, 50, 20, 'undo', () => {
    if (triangoBoard.undo()) {
      triangoBoard.updateAllCheckers();
    }
  });
  const btnRedo = new _canvasButton__WEBPACK_IMPORTED_MODULE_1__["default"](80, 250, 80, 50, 20, 'redo', () => {
    if (triangoBoard.redo()) {
      triangoBoard.updateAllCheckers();
    }
  });

  o.handleInput = (onBoardChange) => {
    const x = input.mouseX;
    const y = input.mouseY;
    const lbtndown = input.lBtnDown;
    btnReturn.handleInput(x, y, lbtndown);
    btnRedo.handleInput(x, y, lbtndown);
    btnUndo.handleInput(x, y, lbtndown);
    return triangoBoard.handleInput(x, y, lbtndown, onBoardChange, GameEnd);
  };
  o.update = () => {
    triangoBoard.update();
  };
  o.render = () => {
    triangoBoard.render(ctx);
    btnRedo.render(ctx);
    btnUndo.render(ctx);
    btnReturn.render(ctx);
    const {
      black,
      white,
    } = triangoBoard.getScore();
    ctx.fillText(`black:${black}  white:${white}`, 650, 50);
  };
  return o;
})();


// ///////////////////////////////////////
/**
 * 游戏开始（设置）界面
 */
// ///////////////////////////////////////
GameStates.gameStart = (function GameStart() {
  const o = {};
  const btn1 = new _canvasButton__WEBPACK_IMPORTED_MODULE_1__["default"](290, 120, 50, 50, 20, '2P', () => {
    game.changeState(GameStates.twoP);
  });
  const btn2 = new _canvasButton__WEBPACK_IMPORTED_MODULE_1__["default"](390, 120, 50, 50, 20, 'AI', () => {
    game.changeState(GameStates.playersTurn);
  });
  const btn3 = new _canvasButton__WEBPACK_IMPORTED_MODULE_1__["default"](505, 120, 80, 50, 20, 'debug', () => {
    game.changeState(GameStates.debug);
  });
  o.handleInput = () => {
    const x = input.mouseX;
    const y = input.mouseY;
    const lbtndown = input.lBtnDown;
    btn1.handleInput(x, y, lbtndown);
    btn2.handleInput(x, y, lbtndown);
    btn3.handleInput(x, y, lbtndown);
  };
  o.render = () => {
    btn1.render(ctx);
    btn2.render(ctx);
    btn3.render(ctx);
    ctx.fillStyle = 'black';
    ctx.fillText('GameStart!', 400, 50);
  };
  return o;
}());

// ///////////////////////////////////////
/**
 * 游戏结束界面
 */
// ///////////////////////////////////////
GameStates.gameEnd = (function GameEnd() {
  const o = {};
  const btnReturn = new _canvasButton__WEBPACK_IMPORTED_MODULE_1__["default"](80, 50, 80, 50, 20, 'return', () => {
    triangoBoard.clear();
    game.changeState(GameStates.gameStart);
  });
  const btnUndo = new _canvasButton__WEBPACK_IMPORTED_MODULE_1__["default"](80, 150, 80, 50, 20, 'undo', () => {
    triangoBoard.undo();
    game.lastState();
  });
  o.handleInput = () => {
    const x = input.mouseX;
    const y = input.mouseY;
    const lbtndown = input.lBtnDown;
    btnReturn.handleInput(x, y, lbtndown);
    btnUndo.handleInput(x, y, lbtndown);
  };
  o.update = () => {
    triangoBoard.update();
  };
  o.render = () => {
    triangoBoard.render(ctx);
    btnReturn.render(ctx);
    btnUndo.render(ctx);
    ctx.fillStyle = 'black';
    ctx.fillText('GameEnd!', 400, 30);
    const {
      black,
      white,
    } = triangoBoard.getScore();
    ctx.fillText(`black:${black}  white:${white}`, 400, 80);
    ctx.fillText(`${black > white ? 'black' : 'white'} Win`, 400, 130);
  };
  return o;
}());

// ///////////////////////////////////////
/**
 * debug mode
 */
// ///////////////////////////////////////
GameStates.debug = (() => {
  const o = {};
  const btnSwapColor = new _canvasButton__WEBPACK_IMPORTED_MODULE_1__["default"](210, 50, 80, 50, 20, 'black', () => {
    triangoBoard.setCurrentColor(btnSwapColor.text === 'black' ? _triangleChecker__WEBPACK_IMPORTED_MODULE_3__["PieceState"].white : _triangleChecker__WEBPACK_IMPORTED_MODULE_3__["PieceState"].black);
    btnSwapColor.text = btnSwapColor.text === 'black' ? 'white' : 'black';
    // eslint-disable-next-line no-unused-expressions
    btnSwapColor.text === 'black' ? btnSwapColor.x = 210 : btnSwapColor.x = 330;
    triangoBoard.updateBanAndKo();
    triangoBoard.updateAllCheckers();
    if (triangoBoard.isGameEnd()) {
      game.changeState(GameStates.gameEnd);
    }
  });
  const btnClear = new _canvasButton__WEBPACK_IMPORTED_MODULE_1__["default"](450, 50, 80, 50, 20, 'clear', () => {
    triangoBoard.clear();
  });
  o.handleInput = () => {
    const x = input.mouseX;
    const y = input.mouseY;
    const lbtndown = input.lBtnDown;
    btnSwapColor.handleInput(x, y, lbtndown);
    btnClear.handleInput(x, y, lbtndown);
    gameScene.handleInput();
  };
  o.update = () => {
    gameScene.update();
  };
  o.render = () => {
    btnSwapColor.render(ctx);
    btnClear.render(ctx);
    gameScene.render();
  };
  return o;
})();

// ///////////////////////////////////////
/**
 * 2个人轮流下棋
 */
// ///////////////////////////////////////
GameStates.twoP = (() => {
  const o = {};

  function swapColor() {
    triangoBoard.setCurrentColor(triangoBoard.currentColor === _triangleChecker__WEBPACK_IMPORTED_MODULE_3__["PieceState"].black
      ? _triangleChecker__WEBPACK_IMPORTED_MODULE_3__["PieceState"].white : _triangleChecker__WEBPACK_IMPORTED_MODULE_3__["PieceState"].black);
  }

  o.handleInput = () => {
    gameScene.handleInput(swapColor);
  };
  o.update = () => {
    gameScene.update();
  };
  o.render = () => {
    gameScene.render();
    ctx.fillStyle = 'black';
    ctx.fillText('current:', 240, 50);
    ctx.fillStyle = triangoBoard.currentColor === _triangleChecker__WEBPACK_IMPORTED_MODULE_3__["PieceState"].black ? 'black' : 'white';
    ctx.fillRect(300, 40, 20, 20);
  };
  return o;
})();


// ///////////////////////////////////////
/**
 * 轮到玩家的回合
 */
// ///////////////////////////////////////
GameStates.playersTurn = (function PlayersTurn() {
  const o = {};

  function waitAI() {
    game.changeState(GameStates.aisTurn);
  }

  o.handleInput = () => {
    gameScene.handleInput(waitAI);
  };
  o.update = () => {
    gameScene.update();
  };
  o.render = () => {
    gameScene.render();
    ctx.fillStyle = 'black';
    ctx.fillText('player', 400, 50);
  };
  return o;
}());

// ///////////////////////////////////////
/**
 * 轮到轮到AI的回合
 * class AIsTurn : InGame
 */
// ///////////////////////////////////////
GameStates.aisTurn = (function AIsTurn() {
  const o = {};
  const ai = new _AI__WEBPACK_IMPORTED_MODULE_4__["default"](triangoBoard, () => {
    triangoBoard.updateBanAndKo(_triangleChecker__WEBPACK_IMPORTED_MODULE_3__["PieceState"].white);
    triangoBoard.updateAllCheckers();
    game.changeState(GameStates.gameEnd);
  });

  o.update = () => {
    const point = ai.run();
    if (point) {
      triangoBoard.placePiece(point.x, point.y, _triangleChecker__WEBPACK_IMPORTED_MODULE_3__["PieceState"].white);
      triangoBoard.updateBanAndKo(_triangleChecker__WEBPACK_IMPORTED_MODULE_3__["PieceState"].black);
      triangoBoard.updateAllCheckers();
      game.changeState(GameStates.playersTurn);
    }
    gameScene.update();
  };
  o.render = () => {
    gameScene.render();
    ctx.fillStyle = 'black';
    ctx.fillText('AI', 400, 50);
  };
  return o;
}());

/* harmony default export */ __webpack_exports__["default"] = (GameStates);


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



const global = (() => {
  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();
  const input = new _input__WEBPACK_IMPORTED_MODULE_1__["default"](game.canvas);
  input.listen();
  return {
    getGame: () => game,
    getCtx: () => game.ctx,
    getCanvas: () => game.canvas,
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
        case 0:
          this.lBtnDown = true;
          break;
        case 1:
          this.mBtnDown = true;
          break;
        case 2:
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
        case 0:
          this.lBtnDown = false;
          break;
        case 1:
          this.mBtnDown = false;
          break;
        case 2:
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
/*! exports provided: PieceState, TriangleChecker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PieceState", function() { return PieceState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriangleChecker", function() { return TriangleChecker; });
/* harmony import */ var _triangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triangle */ "./src/triangle.js");


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
          szColor = 'pink';
          break;
        case PieceState.ko:
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
      if (checker.data !== PieceState.blank) {
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




/***/ }),

/***/ "./src/triangoBoard.js":
/*!*****************************!*\
  !*** ./src/triangoBoard.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _triangleChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triangleChecker */ "./src/triangleChecker.js");


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
    case _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].black:
      return _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].white;
    case _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].white:
      return _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].black;
    default:
      return _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].void;
  }
}

class TriangoBoard {
  constructor() {
    // 棋盘数据，棋盘大小4x2x4, 数据大小 32*4 bit
    this.black = 0; // 黑棋
    this.white = 0; // 白棋
    this.ban = 0; // 禁入点
    this.ko = 0; // 劫
    this.currentColor = _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].black;
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
        const triChecker = new _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["TriangleChecker"](offsetX + i * (r * cos30 + gapX) + j * (r * cos30 + gapY),
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
      return _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].void;
    }
    const flag = 1 << (x | (y << 3));
    if (this.black & flag) {
      return _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].black;
    }
    if (this.white & flag) {
      return _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].white;
    }
    if (this.ban & flag) {
      return _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].ban;
    }
    if (this.ko & flag) {
      return _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].ko;
    }
    return _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].blank;
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
      case _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].black:
        this.black |= flag;
        break;
      case _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].white:
        this.white |= flag;
        break;
      case _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].ban:
        this.ban |= flag;
        break;
      case _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].ko:
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
        if (this.getData(i, j) === _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].blank) {
          const adjacencys = this.adjacencylist[i][j];
          const sum = adjacencys.reduce((previous, current) => {
            const color = this.getData(current.x, current.y);
            return previous + ((color === _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].blank) ? 0 : 1);
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
      if (this.getData(x, y) === _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].blank) {
        this.setData(x, y, _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].ban);
      } else if (this.history.contain(this.black, this.white, clr)) {
        this.setData(x, y, _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].ko);
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
      if (clr === _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].blank || clr === _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].ko || clr === _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].ban) {
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
        if (clr === _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].blank) {
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
      this.setData(point.x, point.y, _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].blank);
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
    this.currentColor = _triangleChecker__WEBPACK_IMPORTED_MODULE_0__["PieceState"].black;
    this.history.clear();
    this.updateAllCheckers();
  }
}

TriangoBoard.instance = new TriangoBoard();

/* harmony default export */ __webpack_exports__["default"] = (TriangoBoard);


/***/ })

/******/ });
//# sourceMappingURL=main.js.map