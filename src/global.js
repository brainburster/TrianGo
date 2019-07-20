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
    playerColor: 1,
    AIColor: 2,
  };

  const swapColor = () => {
    /* eslint-disable no-bitwise */
    PieceState.AIColor ^= PieceState.playerColor;
    PieceState.playerColor ^= PieceState.AIColor;
    PieceState.AIColor ^= PieceState.playerColor;
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
