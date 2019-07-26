import PieceState from '../pieceState';

class AI {
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
      white: this.board.data.white,
      black: this.board.data.black,
      ban: this.board.data.ban,
      ko: this.board.data.ko,
    });
    if (this.best) {
      const temp = this.best;
      this.best = null;
      return temp;
    }
    return null;
  }
}

export default AI;
