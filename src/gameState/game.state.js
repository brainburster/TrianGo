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
  debug: null,
  twoP: null,
  playersTurn: null,
  aisTurn: null,
};

const gameScene = (() => {
  const o = {};
  const triBoard = TriangoBoard.instance;
  const btnReturn = new CanvasButton(80, 50, 80, 50, 20, 'return', () => {
    game.changeState(allGameStates.gameStart);
  });
  const btnRedo = new CanvasButton(80, 150, 80, 50, 20, 'redo', () => {
    if (triangoBoard.redo()) {
      triangoBoard.updateAllCheckers();
    }
  });
  const btnUndo = new CanvasButton(80, 250, 80, 50, 20, 'Undo', () => {
    if (triangoBoard.undo()) {
      triangoBoard.updateAllCheckers();
    }
  });
  o.handleInput = (callback) => {
    const x = input.mouseX;
    const y = input.mouseY;
    const lbtndown = input.lBtnDown;
    btnReturn.handleInput(x, y, lbtndown);
    triBoard.handleInput(callback);
    btnRedo.handleInput(x, y, lbtndown);
    btnUndo.handleInput(x, y, lbtndown);
  };
  o.update = () => {
    triBoard.update();
  };
  o.render = () => {
    triBoard.render();
    btnRedo.render(ctx);
    btnUndo.render(ctx);
    btnReturn.render(ctx);
  };
  return o;
})();


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
  const btnSwapColor = new CanvasButton(210, 50, 80, 50, 20, 'black', () => {
    global.swapColor();
    btnSwapColor.text = btnSwapColor.text === 'black' ? 'white' : 'black';
    // eslint-disable-next-line no-unused-expressions
    btnSwapColor.text === 'black' ? btnSwapColor.x = 210 : btnSwapColor.x = 330;
    triangoBoard.updateBanAndKo();
    triangoBoard.updateAllCheckers();
  });
  const btnClear = new CanvasButton(450, 50, 80, 50, 20, 'clear', () => {
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
allGameStates.twoP = (() => {
  const o = {};
  o.handleInput = () => {
    gameScene.handleInput(() => {
      global.swapColor();
    });
  };
  o.update = () => {
    gameScene.update();
  };
  o.render = () => {
    gameScene.render();
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
  o.handleInput = () => {
    gameScene.handleInput();
  };
  o.update = () => {
    gameScene.update();
  };
  o.render = () => {
    gameScene.render();
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
  o.handleInput = () => {
    gameScene.handleInput();
  };
  o.update = () => {
    gameScene.update();
  };
  o.render = () => {
    gameScene.render();
  };
  return o;
}());

export default allGameStates;
