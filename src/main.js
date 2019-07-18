import global from './global';
import allGameStates from './gameState/game.state';

function main() {
  const game = global.getGame();
  game.changeState(allGameStates.gameStart);
  document.getElementById('triango').appendChild(game.getCanvas());
  game.run();
}

main();
