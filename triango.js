/////////////////////////////////////////
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
    this.canvas.addEventListener("mouseleave", (e) => {
      this.mouseLeave = true;
    })
    this.canvas.addEventListener("mouseenter", (e) => {
      this.mouseLeave = false;
    })
    this.canvas.addEventListener("mousemove", (e) => {
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
    })
    this.canvas.addEventListener("mousedown", (e) => {
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
      switch (e.button) {
        case "0":
          this.lBtnDown = true;
          break;
        case "1":
          this.mBtnDown = true;
          break;
        case "2":
          this.rBtnDown = true;
          break;
        default:
          break;
      }
    });
    this.canvas.addEventListener("mouseup", (e) => {
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
      switch (e.button) {
        case "0":
          this.lBtnDown = false;
          break;
        case "1":
          this.mBtnDown = false;
          break;
        case "2":
          this.rBtnDown = false;
          break;
        default:
          break;
      }
    });
    this.canvas.addEventListener("wheel", (e) => {
      this.mouseWheel += Math.round(e.deltaY / 100);
      this.mouseWheel = (this.mouseWheel + 100) % 100;
    });
    window.addEventListener("keydown", (e) => {
      this.keyDown[e.key] = true;
      this.keyCodeDown[e.keyCode] = true;
    });
    window.addEventListener("keyup", (e) => {
      this.keyDown[e.key] = false;
      this.keyCodeDown[e.keyCode] = false;
    })
  }
}

/////////////////////////////////////////
class Board {
  constructor() {

  }
}

/////////////////////////////////////////
class State {
  /** @param {Game} game */
  constructor(game) {
    this.game = game;
    this.drawlist = [];
  }
  nextState() {
    throw "abstract method";
  }

  handleInput() {
    throw "abstract method";
  }

  update() {
    throw "abstract method";
  }

  render() {
    this.drawBoard();
    this.drawlist.forEach(obj => {
      obj.draw(this.ctx);
    });
  }

  drawBoard() {
    const ctx = this.game.ctx;
    ctx.fillText("HelloWorld!", 50, 50);
  }

  setGame(game) {
    this.game = game;
    return this;
  }
}

//static allState
State.allState = {
  gameStart: new GameStart(),
  gameEnd: new GameEnd(),
  playersTurn: new PlayersTurn(),
  aisTurn: new AIsTurn()
}

/////////////////////////////////////////
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
    return this.top();
  }

  clear() {
    delete this.states;
    this.states = [];
    this.top = 0;
  }

  handleInput() {
    let top_state = this.peek();
    top_state && top_state.handleInput();
  }

  update() {
    let top_state = this.peek();
    top_state && top_state.update();
  }

  render() {
    let top_state = this.peek();
    top_state && top_state.render();
  }
}

/////////////////////////////////////////
class Game {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext("2d");
    this.ms_update_delay = 16;
    this.input = new Input(this.canvas);
    this.input.listen();
    this.state_stack = new StateStack();
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

/////////////////////////////////////////
class Traingo extends Game {
  constructor() {
    super();
    this.state_stack.push(State.allState.gameStart.setGame(this));
  }

}

/////////////////////////////////////////
class GameStart extends State {
  /** @param {Game} game */
  constructor(game) {
    super(game);
  }

  nextState() {
    this.game.changeState(State.allState.playersTurn.setGame(this.game));
  }

  handleInput() {

  }

  update() {

  }

}

class GameEnd extends State {
  /** @param {Game} game */
  constructor(game) {
    super(game);
  }

  nextState() {
    this.game.changeState(State.allState.gameStart.setGame(this.game));
  }

  handleInput() {

  }

  update() {

  }

}

/////////////////////////////////////////
class PlayersTurn extends State {
  /** @param {Game} game */
  constructor(game) {
    super(game);
  }

  nextState() {
    this.game.changeState(State.allState.aisTurn.setGame(this.game));
  }

  handleInput() {

  }

  update() {

  }

}

/////////////////////////////////////////
class AIsTurn {
  /** @param {Game} game */
  constructor(game) {
    super(game);
  }

  nextState() {
    this.game.changeState(State.allState.playersTurn.setGame(this.game));
  }

  handleInput() {

  }

  update() {

  }

}

/////////////////////////////////////////
function main() {
  let game = new Traingo();
  document.getElementById("triango").appendChild(game.getCanvas());
  game.run();
}

main();