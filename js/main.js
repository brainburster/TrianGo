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
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./src/input.js");
/* harmony import */ var _game_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.state */ "./src/game.state.js");



class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
    this.ms_update_delay = 16;
    this.input = new _input__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas);
    this.input.listen();
    this.state_stack = new _game_state__WEBPACK_IMPORTED_MODULE_1__["StateStack"]();
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
    this.state_stack.render();
  }

  run() {
    let previous = (new Date).getTime();
    let lag = 0.0;

    let gameloop = () => {
      let current = (new Date).getTime();
      let elapsed = current - previous;
      previous = current;
      lag += elapsed;
      this.handleInput();

      while (lag >= this.ms_update_delay) {
        this.update();
        lag -= this.ms_update_delay;
      }
      this.render();
      requestAnimationFrame(gameloop);
    }

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

/***/ "./src/game.state.js":
/*!***************************!*\
  !*** ./src/game.state.js ***!
  \***************************/
/*! exports provided: State, StateStack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateStack", function() { return StateStack; });
class State {
  /** @param {Game} game */
  constructor(game) {
    this.game = game;
    this.gameObjs = [];
  }
  nextState() {
    throw 'abstract method';
  }

  handleInput() {
    throw 'abstract method';
  }

  update() {
    this.gameObjs.forEach(obj => {
      obj && obj.update && obj.update();
    });
  }

  render() {
    this.gameObjs.forEach(obj => {
      obj && obj.draw && obj.draw(this.ctx);
    });
  }

}

class StateStack {
  constructor() {
    this.states = [];
    this.top = 0;
  }

  pop() {
    if (this.top < 1) {
      return undefined;
    }
    return this.states[--this.top];
  }

  /** @param {State} state */
  push(state) {
    this.states[this.top++] = state;
  }

  peek() {
    if (this.top > 0) {
      return this.states[this.top - 1];
    } else {
      return undefined;
    }
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
    let top_state = this.peek();
    top_state && top_state.handleInput && top_state.handleInput();
  }

  update() {
    let top_state = this.peek();
    top_state && top_state.update && top_state.update();
  }

  render() {
    let top_state = this.peek();
    top_state && top_state.render && top_state.render();
  }
}



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
    this.canvas.addEventListener('mouseleave', (e) => {
      this.mouseLeave = true;
    })
    this.canvas.addEventListener('mouseenter', (e) => {
      this.mouseLeave = false;
    })
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
    })
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
    })
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
/* harmony import */ var _triango__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triango */ "./src/triango.js");


function main() {
  let game = _triango__WEBPACK_IMPORTED_MODULE_0__["default"].getGame();
  document.getElementById('triango').appendChild(game.getCanvas());
  game.run();
}

main();

/***/ }),

/***/ "./src/triango.js":
/*!************************!*\
  !*** ./src/triango.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.state */ "./src/game.state.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");



/////////////////////////////////////////
/**
 * 游戏开始（设置）界面
 * class GameStart : State
 */
/////////////////////////////////////////
class GameStart extends _game_state__WEBPACK_IMPORTED_MODULE_0__["State"] {
  /** @param {Game} game */
  constructor(game) {
    super(game);
  }

  nextState() {
    this.game.changeState(triango.allGameState.playersTurn);
  }

  handleInput() {

  }

  update() {
    super.update();
  }

  render() {
    const ctx = this.game.ctx;
    ctx.fillText('helloWorld!', 50, 50);
    super.render();
  }
}

/////////////////////////////////////////
/**
 * 游戏结束界面
 * class GameEnd : State
 */
/////////////////////////////////////////
class GameEnd extends _game_state__WEBPACK_IMPORTED_MODULE_0__["State"] {
  /** @param {Game} game */
  constructor(game) {
    super(game);
  }

  nextState() {
    this.game.changeState(triango.allGameState.gameStart);
  }

  handleInput() {

  }

  update() {

  }

}

/////////////////////////////////////////
/**
 * 游戏中
 * class InGame : State
 */
/////////////////////////////////////////
class InGame extends _game_state__WEBPACK_IMPORTED_MODULE_0__["State"] {
  /** @param {Game} game */
  constructor(game) {
    super(game);
  }

  render() {
    this.drawBoard();
    super.render();
  }

  drawBoard() {
    //...................
  }
}

/////////////////////////////////////////
/**
 * 轮到玩家的回合
 * class PlayersTurn : InGame
 */
/////////////////////////////////////////
class PlayersTurn extends InGame {
  /** @param {Game} game */
  constructor(game) {
    super(game);
  }

  nextState() {
    this.game.changeState(triango.allGameState.aisTurn);
  }

  handleInput() {

  }

  update() {

  }

}

/////////////////////////////////////////
/**
 * 轮到轮到AI的回合
 * class AIsTurn : InGame
 */
/////////////////////////////////////////
class AIsTurn extends InGame {
  /** @param {Game} game */
  constructor(game) {
    super(game);
  }

  nextState() {
    this.game.changeState(triango.allGameState.playersTurn);
  }

  handleInput() {

  }

  update() {

  }

}

/////////////////////////////////////////
/**
 * 全局对象 triango 
 * 用于获取game的单例
 */
/////////////////////////////////////////
const triango = (function () {
  const game = new _game__WEBPACK_IMPORTED_MODULE_1__["default"]();

  function getGame() {
    return game;
  }

  const allGameState = {
    'gameStart': new GameStart(game),
    'gameEnd': new GameEnd(game),
    'playersTurn': new PlayersTurn(game),
    'aisTurn': new AIsTurn(game)
  }

  game.changeState(allGameState.gameStart);

  return {
    'getGame': getGame,
    'allGameState': allGameState
  };
})();

/* harmony default export */ __webpack_exports__["default"] = (triango);

/***/ })

/******/ });
//# sourceMappingURL=main.js.map