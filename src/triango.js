import {
  State,
} from './game.state';
import Game from './game';
/* eslint-disable*/
// ///////////////////////////////////////
/**
 * 游戏开始（设置）界面
 * class GameStart : State
 */
// ///////////////////////////////////////
class GameStart extends State {
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
    const {
      ctx,
    } = this.game;
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

// ///////////////////////////////////////
/**
 * 游戏中
 * class InGame : State
 */
// ///////////////////////////////////////
class InGame extends State {
  /** @param {Game} game */
  constructor(game) {
    super(game);
  }

  render() {
    this.drawBoard();
    super.render();
  }

  drawBoard() {
    // ...................
  }
}

// ///////////////////////////////////////
/**
 * 轮到玩家的回合
 * class PlayersTurn : InGame
 */
// ///////////////////////////////////////
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

// ///////////////////////////////////////
/**
 * 轮到轮到AI的回合
 * class AIsTurn : InGame
 */
// ///////////////////////////////////////
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
/* eslint-enable */

// ///////////////////////////////////////
/**
 * 全局对象 triango ,
 * 用于获取game的单例
 */
// ///////////////////////////////////////
// eslint-disable-next-line func-names
const triango = (function () {
  const game = new Game();

  function getGame() {
    return game;
  }

  const allGameState = {
    gameStart: new GameStart(game),
    gameEnd: new GameEnd(game),
    playersTurn: new PlayersTurn(game),
    aisTurn: new AIsTurn(game),
  };

  game.changeState(allGameState.gameStart);

  return {
    getGame,
    allGameState,
  };
}());

export default triango;
