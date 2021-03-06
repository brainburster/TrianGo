import global from '../global';
import CanvasButton from '../canvasButton';
import {
  TriangoBoard,
} from '../triangoBoard';
import PieceState from '../pieceState';
import AI from '../AI/AI';


const game = global.getGame();
const input = global.getInput();
const ctx = global.getCtx();
const triangoBoard = TriangoBoard.instance;

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
  const btnReturn = new CanvasButton(80, 50, 80, 50, 20, 'back', () => {
    triangoBoard.clear();
    game.changeState(GameStates.gameStart);
  });
  const btnUndo = new CanvasButton(80, 150, 80, 50, 20, 'undo', () => {
    if (triangoBoard.undo()) {
      triangoBoard.updateAllCheckers();
    }
  });
  const btnRedo = new CanvasButton(80, 250, 80, 50, 20, 'redo', () => {
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
    ctx.fillText(`Black:[${black}]  White:[${white}]`, 650, 50);
  };
  return o;
})();

GameStates.gameStart = (function GameStart() {
  const o = {};
  const btn1 = new CanvasButton(290, 120, 50, 50, 20, '2P', () => {
    game.changeState(GameStates.twoP);
  });
  const btn2 = new CanvasButton(390, 120, 50, 50, 20, 'AI', () => {
    game.changeState(GameStates.playersTurn);
  });
  const btn3 = new CanvasButton(505, 120, 80, 50, 20, 'debug', () => {
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

GameStates.gameEnd = (function GameEnd() {
  const o = {};
  const btnReturn = new CanvasButton(80, 50, 80, 50, 20, 'back', () => {
    triangoBoard.clear();
    game.changeState(GameStates.gameStart);
  });
  const btnUndo = new CanvasButton(80, 150, 80, 50, 20, 'undo', () => {
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
    ctx.fillText(`Black:[${black}]  White:[${white}]`, 400, 80);
    ctx.fillText(`${black > white ? 'Black' : 'White'} Win`, 400, 130);
  };
  return o;
}());

GameStates.debug = (() => {
  const o = {};
  const btnSwapColor = new CanvasButton(210, 50, 80, 50, 20, 'black', () => {
    triangoBoard.setCurrentColor(btnSwapColor.text === 'black' ? PieceState.white : PieceState.black);
    triangoBoard.updateBanAndKo(triangoBoard.getCurrentColor());
    triangoBoard.updateAllCheckers();
    if (triangoBoard.isGameEnd()) {
      game.changeState(GameStates.gameEnd);
    }
  });
  const btnClear = new CanvasButton(460, 50, 80, 50, 20, 'clear', () => {
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
    btnSwapColor.text = triangoBoard.getCurrentColor() === PieceState.white ? 'white' : 'black';
    triangoBoard.getCurrentColor() === PieceState.white
      ? btnSwapColor.x = 210 : btnSwapColor.x = 330;
    gameScene.update();
  };
  o.render = () => {
    btnSwapColor.render(ctx);
    btnClear.render(ctx);
    gameScene.render();
  };
  return o;
})();

GameStates.twoP = (() => {
  const o = {};

  function swapColor() {
    triangoBoard.setCurrentColor(triangoBoard.getCurrentColor() === PieceState.black
      ? PieceState.white : PieceState.black);
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
    ctx.fillStyle = triangoBoard.getCurrentColor() === PieceState.black ? 'black' : 'white';
    ctx.fillRect(300, 40, 20, 20);
  };
  return o;
})();


GameStates.playersTurn = (function PlayersTurn() {
  const o = {};

  function waitAI() {
    game.changeState(GameStates.aisTurn);
    triangoBoard.setCurrentColor(PieceState.white);
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

GameStates.aisTurn = (function AIsTurn() {
  const o = {};
  let text = '';
  const ai = new AI(triangoBoard, (point) => {
    triangoBoard.placePiece(point.x, point.y, PieceState.white);
    triangoBoard.setCurrentColor(PieceState.black);
    triangoBoard.updateBanAndKo(PieceState.black);
    triangoBoard.updateAllCheckers();
    triangoBoard.data.history.current -= 1;
    triangoBoard.save();
    game.changeState(GameStates.playersTurn);
    if (triangoBoard.isGameEnd()) {
      game.changeState(GameStates.gameEnd);
    }
  }, () => {
    triangoBoard.updateAllCheckers();
    game.changeState(GameStates.playersTurn);
    game.changeState(GameStates.gameEnd);
  });
  o.handleInput = () => {

  };
  o.start = () => {
    ai.run();
  };
  o.update = () => {
    gameScene.update();
    text += '.';
    if (text.length >= 16) {
      text = '';
    }
  };
  o.render = () => {
    gameScene.render();
    ctx.fillStyle = 'black';
    ctx.fillText('AI thinking:', 400, 50);
    ctx.fillText(text, 400, 80);
  };
  return o;
}());

export default GameStates;
