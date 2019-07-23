import global from '../global';
import CanvasButton from '../canvasButton';
import TriangoBoard from '../triangoBoard';


const game = global.getGame();
const input = global.getInput();
const ctx = global.getCtx();
const triangoBoard = TriangoBoard.instance;

/**
 * 所有游戏状态
 */
const allGameStates = {
  gameStart: null,
  gameEnd: null,
  twoP: null,
  playersTurn: null,
  aisTurn: null,
};

// ///////////////////////////////////////
/**
 * 游戏开始（设置）界面
 */
// ///////////////////////////////////////
allGameStates.gameStart = (function GameStart() {
  const o = {};
  const btn1 = new CanvasButton(100, 100, 50, 50, 20, '2P', () => {
    game.changeState(allGameStates.twoP);
  });
  const btn2 = new CanvasButton(200, 100, 50, 50, 20, 'AI', () => {
    game.changeState(allGameStates.playersTurn);
  });
  const btn3 = new CanvasButton(300, 100, 80, 50, 20, 'debug', () => {
    game.changeState(allGameStates.debug);
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
    ctx.fillText('gameStart!', 160, 50);
  };
  return o;
}());

// ///////////////////////////////////////
/**
 * 游戏结束界面
 */
// ///////////////////////////////////////
allGameStates.gameEnd = (function GameEnd() {
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
 * debug mode
 */
// ///////////////////////////////////////
allGameStates.debug = (() => {
  const o = {};
  const returnBtn = new CanvasButton(80, 50, 80, 50, 20, 'return', () => {
    game.changeState(allGameStates.gameStart);
  });
  const btnSwapColor = new CanvasButton(210, 50, 80, 50, 20, 'black', () => {
    global.swapColor();
    btnSwapColor.text = btnSwapColor.text === 'black' ? 'white' : 'black';
    // eslint-disable-next-line no-unused-expressions
    btnSwapColor.text === 'black' ? btnSwapColor.x = 210 : btnSwapColor.x = 330;
  });
  o.handleInput = () => {
    const x = input.mouseX;
    const y = input.mouseY;
    const lbtndown = input.lBtnDown;
    returnBtn.handleInput(x, y, lbtndown);
    btnSwapColor.handleInput(x, y, lbtndown);
    triangoBoard.handleInput();
  };
  o.update = () => {
    triangoBoard.update();
  };
  o.render = () => {
    returnBtn.render(ctx);
    btnSwapColor.render(ctx);
    triangoBoard.render();
  };
  return o;
})();

// ///////////////////////////////////////
/**
 * 2个人轮流下棋
 */
// ///////////////////////////////////////
allGameStates.twoP = (() => {
  const o = {};
  o.handleInput = () => {
    triangoBoard.handleInput(() => {
      global.swapColor();
    });
  };
  o.update = () => {
    triangoBoard.update();
  };
  o.render = () => {
    triangoBoard.render();
  };
  return o;
})();


// ///////////////////////////////////////
/**
 * 轮到玩家的回合
 */
// ///////////////////////////////////////
allGameStates.playersTurn = (function PlayersTurn() {
  const o = {};
  o.nextState = () => allGameStates.aisTurn;
  o.handleInput = () => {
    triangoBoard.handleInput();
  };
  o.update = () => {
    triangoBoard.update();
  };
  o.render = () => {
    triangoBoard.render();
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
  const o = {};
  o.nextState = () => allGameStates.playersTurn;
  o.handleInput = () => {
    // triangoBoard.handleInput();
  };
  o.update = () => {
    triangoBoard.update();
  };
  o.render = () => {
    triangoBoard.render();
  };
  return o;
}());

export default allGameStates;
