import Triangle from './triangle';

class TriangoBoard {
  constructor() {
    this.triangle = new Triangle(200, 200, 50, true, 'black');
  }

  render(ctx) {
    this.triangle.draw(ctx);
  }
}

export default TriangoBoard;
