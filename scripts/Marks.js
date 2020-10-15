const Marks = (function () {
  const { CELL_CLASSES } = Constants;
  const { isCellNode, isCellVisited } = ValidationChecks;
  const { getCurrentPlayer } = Player;

  const drawMark = (cell) => {
    if (!isCellNode(cell) || isCellVisited(cell)) return;

    const currentPlayer = getCurrentPlayer();
    cell.classList.add(CELL_CLASSES[currentPlayer], CELL_CLASSES.VISITED);
  };

  const drawPreviewMark = (cell) => {
    if (!isCellNode(cell) || isCellVisited(cell)) return;

    const currentPlayer = getCurrentPlayer();
    cell.classList.add(CELL_CLASSES[currentPlayer]);
  };

  const removePreviewMark = (cell) => {
    if (!isCellNode(cell) || isCellVisited(cell)) return;

    const currentPlayer = getCurrentPlayer();
    cell.classList.remove(CELL_CLASSES[currentPlayer]);
  };

  return { drawMark, drawPreviewMark, removePreviewMark };
})();
