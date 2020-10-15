const DOMContent = (function () {
  const { CELL_CLASSES } = Constants;
    
  const board = document.getElementById('board');
  const modal = document.getElementById('modal');
  const cells = document.getElementsByClassName(CELL_CLASSES.CELL);
  const startNewGameButton = document.getElementById('start-new-game-button');

  return { board, modal, cells, startNewGameButton };
})();
