import PieceState from '../pieceState';
import {
  TriBoardData,
} from '../triangoBoard';

const best = {
  x: 0,
  y: 0,
};

let maxDepth = 5;

/** @param {TriBoardData} boardData */
function getScore(boardData) {
  let black = 0;
  let white = 0;
  let count1 = 0;
  let count2 = 0;
  for (let j = 0; j < 4; j += 1) {
    for (let i = 0; i < 8; i += 1) {
      const color = boardData.getData(i, j);
      if (color === PieceState.black) {
        black += 1;
      } else if (color === PieceState.white) {
        white += 1;
      } else if (color !== PieceState.void) {
        const adjs = boardData.adjacencylist[i][j];
        const sum = adjs.reduce((x, y) => {
          const clr = boardData.getData(y.x, y.y);
          // eslint-disable-next-line no-nested-ternary
          return x + (clr === PieceState.black ? 1 : (clr === PieceState.white ? -1 : 0));
        }, 0);
        if (sum === adjs.length) {
          black += 1;
          count1 += 1;
        } else if (sum === -adjs.length) {
          white += 1.2;
          count2 += 1;
        }
      }
    }
  }

  if (count1 > 1) {
    black += 6;
  }
  if (count2 > 1) {
    white += 10;
  }

  return {
    black,
    white,
  };
}

/** @param {TriBoardData} boardData */
function getAllCanPlacePoint(boardData) {
  const pointList = [];
  for (let j = 0; j < 4; j += 1) {
    for (let i = 0; i < 8; i += 1) {
      const color = boardData.getData(i, j);
      if (color === PieceState.blank) {
        pointList.push({
          x: i,
          y: j,
        });
      }
    }
  }

  pointList.sort(() => Math.random() - 0.5);

  return pointList;
}

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
    return score * 100;
  }
  if (depth < 1) {
    const {
      black,
      white,
    } = getScore(boardData);
    return boardData.currentColor === PieceState.black ? black - white : white - black;
  }

  const buckup = {
    black: boardData.black,
    white: boardData.white,
    ban: boardData.ban,
    ko: boardData.ko,
    currentColor: boardData.currentColor,
  };

  const openlist = getAllCanPlacePoint(boardData);

  for (let i = 0; i < openlist.length; i += 1) {
    const {
      x,
      y,
    } = openlist[i];
    if (boardData.getData(x, y) !== PieceState.blank) {
      continue;
    }
    boardData.setData(x, y, boardData.currentColor);
    boardData.updateBlackAndWhite(x, y);
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
        best.x = x;
        best.y = y;
      }
    }
    if (score >= beta) {
      break;
    }
  }
  return alpha;
}

function run(data) {
  const boardData = new TriBoardData(data);
  const score = boardData.getScore();
  const remaining = 32 - score.black - score.white;
  if (remaining > 30) {
    maxDepth = 4;
  } else if (remaining > 24) {
    maxDepth = 5;
  } else if (remaining > 12) {
    maxDepth = 6;
  } else if (remaining > 8) {
    maxDepth = 7;
  } else {
    maxDepth = 9;
  }

  alphaBeta(boardData, maxDepth, -1000000, 1000000);
  return best;
}

export default run;
