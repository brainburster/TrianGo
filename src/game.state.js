class State {
  /** @param {Game} game */
  constructor(game) {
    this.game = game;
    this.gameObjs = [];
  }
  nextState() {
    throw 'abstract method';
  }

  handleInput() {
    throw 'abstract method';
  }

  update() {
    this.gameObjs.forEach(obj => {
      obj && obj.update && obj.update();
    });
  }

  render() {
    this.gameObjs.forEach(obj => {
      obj && obj.render && obj.render(this.ctx);
    });
  }

}

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
    return this.top;
  }

  clear() {
    delete this.states;
    this.states = [];
    this.top = 0;
  }

  handleInput() {
    let top_state = this.peek();
    top_state && top_state.handleInput && top_state.handleInput();
  }

  update() {
    let top_state = this.peek();
    top_state && top_state.update && top_state.update();
  }

  render() {
    let top_state = this.peek();
    top_state && top_state.render && top_state.render();
  }
}

export {
  State,
  StateStack
};