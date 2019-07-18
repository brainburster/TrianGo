import global from './global';
import allGameStates from './gameState/game.state';

function main() {
  const game = global.getGame();
  game.changeState(allGameStates.playersTurn);
  document.getElementById('triango').appendChild(game.getCanvas());
  game.run();
}

main();
