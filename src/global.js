import Game from './game';
import Input from './input';

const global = (() => {
  const game = new Game();
  const input = new Input(game.canvas);
  input.listen();
  return {
    getGame: () => game,
    getCtx: () => game.ctx,
    getCanvas: () => game.canvas,
    getInput: () => input,
  };
})();


export default global;
