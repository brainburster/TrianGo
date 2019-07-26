import run from './AI.impl';
import {
  TriBoardData as TBD,
} from '../triangoBoard';

onmessage = (e) => {
  const board = new TBD();
  board.black = e.data.black;
  board.white = e.data.white;
  board.ko = e.data.ko;
  board.ban = e.data.ban;
  postMessage(run(board));
};
