// import TriangoBoard from './triangoBoard';
import {
  PieceState,
} from './triangleChecker';

class AI {
  /** @param {TriangoBoard} board */
  constructor(board, onGameEnd) {
    this.board = board;
    this.onGameEnd = onGameEnd;
  }

  run() {
    this.board.updateBanAndKo(PieceState.white);
    if (this.board.isGameEnd()) {
      this.onGameEnd && this.onGameEnd();
      return null;
    }
    let x;
    let y;
    do {
      x = Math.random() * 8 >>> 0;
      y = Math.random() * 4 >>> 0;
    } while (this.board.getData(x, y) !== PieceState.blank);
    return {
      x,
      y,
    };
  }
}

export default AI;
