import Game from './game';
import Input from './input';
import Board from './triango.board';

const global = (() => {
  const game = new Game();
  const board = new Board();
  const input = new Input(game.canvas);
  input.listen();
  return {
    getGame: () => game,
    getCtx: () => game.ctx,
    getCanvas: () => game.canvas,
    getBoard: () => board,
    getInput: () => input,
  };
})();


export default global;
