import PieceState from '../pieceState';

function run(data) {
  let x;
  let y;
  do {
    x = Math.random() * 8 >>> 0;
    y = Math.random() * 4 >>> 0;
  } while (data.getData(x, y) !== PieceState.blank);
  return {
    x,
    y,
  };
}

export default run;
