import PieceState from '../pieceState';

class AI {
  constructor(board, callback, onGameEnd) {
    this.board = board;
    this.onGameEnd = onGameEnd;
    this.worker = new Worker('./js/AI.worker.js');
    this.worker.onmessage = (e) => {
      callback && callback(e.data);
    };
  }


  run() {
    this.board.updateBanAndKo(PieceState.white);
    if (this.board.isGameEnd()) {
      this.onGameEnd && this.onGameEnd();
      return;
    }
    this.worker.postMessage({
      white: this.board.data.white,
      black: this.board.data.black,
      ban: this.board.data.ban,
      ko: this.board.data.ko,
      currentColor: PieceState.white,
    });
  }
}

export default AI;
