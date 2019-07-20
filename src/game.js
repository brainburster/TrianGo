import StateStack from './stateStack';

class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
    this.ms_update_delay = 16;
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
    this.ctx.fillStyle = '#CCC';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.state_stack.render();
  }

  run() {
    let previous = (new Date()).getTime();
    let lag = 0.0;

    const gameloop = () => {
      const current = (new Date()).getTime();
      const elapsed = current - previous;
      previous = current;
      lag += elapsed;
      this.handleInput();

      while (lag >= this.ms_update_delay) {
        this.update();
        lag -= this.ms_update_delay;
      }
      this.render();
      requestAnimationFrame(gameloop);
    };

    requestAnimationFrame(gameloop);
  }

  changeState(state) {
    this.state_stack.push(state);
  }

  getState() {
    return this.state_stack.peek();
  }

  rollbackState() {
    return this.state_stack.pop();
  }
}

export default Game;
