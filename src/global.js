import Game from './game';
import Input from './input';

const global = (() => {
  const game = new Game();
  const input = new Input(game.canvas);
  input.listen();
  /**
   * 棋子状态的枚举
   * Enum for piece state
   * @readonly
   * @enum {number}
   */
  const PieceState = {
    void: -1,
    blank: 0,
    black: 1,
    white: 2,
    ban: 3,
    ko: 4,
    currentColor: 1,
    nextColor: 2,
  };

  const swapColor = () => {
    /* eslint-disable no-bitwise */
    PieceState.nextColor ^= PieceState.currentColor;
    PieceState.currentColor ^= PieceState.nextColor;
    PieceState.nextColor ^= PieceState.currentColor;
    /* eslint-enable no-bitwise */
  };
  return {
    getGame: () => game,
    getCtx: () => game.ctx,
    getCanvas: () => game.canvas,
    getInput: () => input,
    getAllPieceState: () => PieceState,
    swapColor,
  };
})();


export default global;
