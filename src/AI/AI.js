// import TriangoBoard from './triangoBoard';
import PieceState from '../pieceState';

class AI {
  /** @param {TriangoBoard} board */
  constructor(board, onGameEnd) {
    this.board = board;
    this.onGameEnd = onGameEnd;
    this.worker = new Worker('./js/AI.worker.js');
    this.best = null;
    this.worker.onmessage = (e) => {
      this.best = e.data;
    };
  }

  run() {
    this.worker.postMessage('Hello');
    this.board.updateBanAndKo(PieceState.white);
    if (this.board.isGameEnd()) {
      this.onGameEnd && this.onGameEnd();
      return null;
    }
    this.worker.postMessage({
      white: this.board.white,
      black: this.board.black,
      ban: this.board.ban,
      ko: this.board.ko,
    });
    return this.best;
  }
}

export default AI;
