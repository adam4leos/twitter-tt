const ValidationChecks = (function () {
  const { CELL_CLASSES, PLAYING_CELLS } = Constants;

  const isCellNode = (node) => node.classList.contains(CELL_CLASSES.CELL);
  const isCellVisited = (node) =>
    isCellNode(node) && node.classList.contains(CELL_CLASSES.VISITED);
  const isPlayerChoiceWithinGameRange = (choice) =>
    choice > 0 && choice <= PLAYING_CELLS;
  const isNewGameButton = (node) => node.classList.contains('modal-button');

  return {
    isCellNode,
    isCellVisited,
    isPlayerChoiceWithinGameRange,
    isNewGameButton,
  };
})();
