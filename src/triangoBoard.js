import TriangleChecker from './triangleChecker';

class TriangoBoard {
  constructor() {
    this.triangleChecker = new TriangleChecker(200, 200, 50, true, 'black');
  }

  render() {
    this.triangleChecker.render();
  }

  handleInput() {
    this.triangleChecker.handleInput();
  }
}

export default TriangoBoard;
