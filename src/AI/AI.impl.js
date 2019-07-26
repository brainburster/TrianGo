import PieceState from '../pieceState';
import {
  TriBoardData,
} from '../triangoBoard';

const best = {
  x: 0,
  y: 0,
};
const maxDepth = 4;

/**
 * 极大极小值算法
 * @param {TriBoardData} boardData
 */
function alphaBeta(boardData, depth, alpha, beta) {
  if (boardData.isGameEnd()) {
    const {
      black,
      white,
    } = boardData.getScore();
    const score = boardData.currentColor === PieceState.black ? black - white : white - black;
    return score * 1000;
  }
  if (depth < 1) {
    const {
      black,
      white,
    } = boardData.getScore();
    return boardData.currentColor === PieceState.black ? black - white : white - black;
  }

  const buckup = {
    black: boardData.black,
    white: boardData.white,
    ban: boardData.ban,
    ko: boardData.ko,
    currentColor: boardData.currentColor,
  };

  for (let j = 0; j < 4; j += 1) {
    for (let i = 0; i < 8; i += 1) {
      if (boardData.getData(i, j) !== PieceState.blank) {
        continue;
      }
      boardData.setData(i, j, boardData.currentColor);
      boardData.updateBlackAndWhite(i, j);
      boardData.swapColor();
      boardData.updateBanAndKo(boardData.currentColor);

      const score = -alphaBeta(boardData, depth - 1, -beta, -alpha);

      boardData.black = buckup.black;
      boardData.white = buckup.white;
      boardData.ban = buckup.ban;
      boardData.ko = buckup.ko;
      boardData.currentColor = buckup.currentColor;

      if (score > alpha) {
        alpha = score;
        if (depth === maxDepth) {
          best.x = i;
          best.y = j;
        }
      }
      if (score >= beta) {
        break;
      }
    }
  }
  return alpha;
}

function run(data) {
  const boardData = new TriBoardData(data);
  // do {
  //   best.x = Math.random() * 8 >>> 0;
  //   best.y = Math.random() * 4 >>> 0;
  // } while (boardData.getData(best.x, best.y) !== PieceState.blank);
  alphaBeta(boardData, maxDepth, -10000, 10000);
  return best;
}

export default run;
