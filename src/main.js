import triango from './triango';

function main() {
  const game = triango.getGame();
  document.getElementById('triango').appendChild(game.getCanvas());
  game.run();
}

main();
