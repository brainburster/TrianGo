import global from '../global';

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

// ///////////////////////////////////////
/**
 * 轮到玩家的回合
 */
// ///////////////////////////////////////
allGameStates.playersTurn = (function PlayersTurn() {
  const board = global.getBoard();
  const ctx = global.getCtx();
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
  const board = global.getBoard();
  const ctx = global.getCtx();
  const o = {};
  o.nextState = () => allGameStates.playersTurn;
  o.handleInput = () => {};
  o.render = () => {
    board.render(ctx);
  };
  return o;
}());

export default allGameStates;
