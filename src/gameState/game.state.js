import global from '../global';
import TriangoBoard from '../triangoBoard';

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
  const ctx = global.getCtx();
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
  const ctx = global.getCtx();
  const o = {};
  o.nextState = () => allGameStates.gameStart;
  o.handleInput = () => {};
  o.render = () => {
    ctx.fillStyle = 'black';
    ctx.fillText('gameEnd!', 50, 50);
  };
  return o;
}());
const game = global.getGame();
const triangoBoard = new TriangoBoard();

// ///////////////////////////////////////
/**
 * 轮到玩家的回合
 */
// ///////////////////////////////////////
allGameStates.playersTurn = (function PlayersTurn() {
  const ctx = global.getCtx();
  const o = {};
  o.nextState = () => allGameStates.aisTurn;
  o.handleInput = () => {
    triangoBoard.handleInput();
  };
  o.render = () => {
    triangoBoard.render(ctx);
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
  const ctx = global.getCtx();
  const o = {};
  o.nextState = () => allGameStates.playersTurn;
  o.handleInput = () => {
    game.triangoBoard.handleInput();
  };
  o.render = () => {
    game.triangoBoard.render(ctx);
  };
  return o;
}());

export default allGameStates;
