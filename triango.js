/////////////////////////////////////////HTMLCanvasElement
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
class Status {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Board} board
   * @param {Input} input
   */
  constructor(ctx, board, input) {
    this.ctx = ctx;
    this.board = board;
    this.input = input;
    this.drawlist = [];
  }
  processInput() {
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
    const ctx = this.ctx;
    ctx.fillText("HelloWorld!", 50, 50);
  }
}

/////////////////////////////////////////
class PlayersTurn extends Status {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Board} board
   * @param {Input} input
   */
  constructor(ctx, board, input) {
    super(ctx, board, input);
  }

}

/////////////////////////////////////////
class AIsTurn {

}

/////////////////////////////////////////
class Traingo {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext("2d");
    this.ms_update_delay = 16;
    this.board = new Board();
    this.input = new Input(this.canvas);
    this.input.listen();
    this.status = new PlayersTurn(this.ctx, this.board, this.input);
  }

  getCanvas() {
    return this.canvas;
  }

  processInput() {
    this.status.processInput();
  }

  update() {
    this.status.update();
  }

  render() {
    this.status.render();
  }

  run() {
    let previous = (new Date).getTime();
    let lag = 0.0;

    let gameloop = () => {
      let current = (new Date).getTime();
      let elapsed = current - previous;
      previous = current;
      lag += elapsed;
      this.processInput();

      while (lag >= this.ms_update_delay) {
        this.update();
        lag -= this.ms_update_delay;
      }
      this.render();
      requestAnimationFrame(gameloop);
    }

    requestAnimationFrame(gameloop);
  }
}

/////////////////////////////////////////
function main() {
  let game = new Traingo();
  document.getElementById("triango").appendChild(game.getCanvas());
  let i = new InputManager((game.getCanvas()));
  i.listen();
  game.run();
}

main();