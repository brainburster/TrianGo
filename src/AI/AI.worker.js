import run from './AI.impl';
import Board from '../triangoBoard';

onmessage = (e) => {
  const board = new Board();
  board.black = e.data.black;
  board.white = e.data.white;
  board.ko = e.data.ko;
  board.ban = e.data.ban;
  postMessage(run(board));
};
