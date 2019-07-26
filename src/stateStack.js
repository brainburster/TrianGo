class StateStack {
  constructor() {
    this.states = [];
    this.top = 0;
  }

  pop() {
    if (this.top < 1) {
      return undefined;
    }
    return this.states[--this.top]; // eslint-disable-line
  }

  /** @param {State} state */
  push(state) {
    this.states[this.top++] = state; // eslint-disable-line
  }

  peek() {
    if (this.top > 0) {
      return this.states[this.top - 1];
    }
    return undefined;
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
    const topState = this.peek();
    return topState && topState.handleInput && topState.handleInput();
  }

  update() {
    const topState = this.peek();
    return topState && topState.update && topState.update();
  }

  render() {
    const topState = this.peek();
    return topState && topState.render && topState.render();
  }
}

export default StateStack;
