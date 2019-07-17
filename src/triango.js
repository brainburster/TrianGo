import {
  State,
} from './game.state';
import Game from './game';
import TriangoBoard from './triango.board';
/* eslint-disable*/
// ///////////////////////////////////////
/**
 * 游戏开始（设置）界面
 * class GameStart : State
 */
// ///////////////////////////////////////
class GameStart extends State {
  constructor() {
    super();
  }

  nextState() {
    getGame().changeState(getAllGameState().playersTurn);
  }

  handleInput() {

  }

  update() {
    super.update();
  }

  render() {
    const {
      ctx,
    } = this.game;
    ctx.fillStyle = 'black';
    ctx.fillText('helloWorld!', 50, 50);
    super.render();
  }
}

// ///////////////////////////////////////
/**
 * 游戏结束界面
 * class GameEnd : State
 */
// ///////////////////////////////////////
class GameEnd extends State {
  constructor() {
    super();
  }

  nextState() {
    getGame().changeState(getAllGameState().gameStart);
  }

  handleInput() {

  }

  update() {

  }
}

// ///////////////////////////////////////
/**
 * 游戏中
 * class InGame : State
 */
// ///////////////////////////////////////
class InGame extends State {
  constructor() {
    super();
    this.board = new TriangoBoard();
  }

  render() {
    this.board.render(getCtx());
    super.render();
  }
}

// ///////////////////////////////////////
/**
 * 轮到玩家的回合
 * class PlayersTurn : InGame
 */
// ///////////////////////////////////////
class PlayersTurn extends InGame {
  constructor() {
    super();
  }

  nextState() {
    getGame().changeState(getAllGameState().aIsTurn);
  }

  handleInput() {

  }

  update() {

  }
}

// ///////////////////////////////////////
/**
 * 轮到轮到AI的回合
 * class AIsTurn : InGame
 */
// ///////////////////////////////////////
class AIsTurn extends InGame {
  constructor() {
    super();
  }

  nextState() {
    getGame().changeState(getAllGameState().playersTurn);
  }

  handleInput() {

  }

  update() {

  }
}
/* eslint-enable */

// ///////////////////////////////////////
/**
 * 全局对象 triango ,
 * 用于获取游戏以及游戏状态的单例
 */
// ///////////////////////////////////////
// eslint-disable-next-line func-names
const triango = (function () {
  const game = new Game();

  const allGameState = {
    gameStart: new GameStart(),
    gameEnd: new GameEnd(),
    playersTurn: new PlayersTurn(),
    aIsTurn: new AIsTurn(),
  };

  // game.changeState(allGameState.gameStart);
  game.changeState(allGameState.playersTurn);

  return {
    getGame: () => game,
    allGameState,
  };
}());

function getGame() {
  return triango.getGame();
}

function getCtx() {
  return triango.getGame().ctx;
}

// function getCanvas() {
//   return triango.getGame().canvas;
// }

function getAllGameState() {
  return triango.allGameState();
}

// /**
//  * 从一个简易对象池中获取游戏状态对象
//  * @param {string} WhatState 游戏状态的类型（使用字符串）
//  * @returns {State} 返回一个游戏状态对象
//  */
// function createGameState(WhatState) {
//   if (typeof (WhatState) !== 'string') {
//     throw new Error('参数必须为字符串');
//   }
//   return triango.allGameState[WhatState];
// }

export default triango;
