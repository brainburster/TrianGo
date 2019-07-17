import triango from './triango'

function main() {
  let game = triango.getGame();
  document.getElementById('triango').appendChild(game.getCanvas());
  game.run();
}

main();