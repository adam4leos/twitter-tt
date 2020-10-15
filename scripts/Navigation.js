const Navigation = (function () {
  const { LAST_CELL_INDEX, FIRST_CELL_INDEX, BOARD_SIZE } = Constants;
  const { focusCellByIndex, getCurrentFocusIndex } = Focus;

  const moveRight = () => {
    let newIndex = getCurrentFocusIndex() + 1;

    if (newIndex > LAST_CELL_INDEX) newIndex = FIRST_CELL_INDEX;

    focusCellByIndex(newIndex);
  };

  const moveUp = () => {
    let newIndex = getCurrentFocusIndex() - BOARD_SIZE;

    if (newIndex < FIRST_CELL_INDEX)
      newIndex = Math.min(LAST_CELL_INDEX, LAST_CELL_INDEX + newIndex + 1);

    focusCellByIndex(newIndex);
  };

  const moveLeft = () => {
    let newIndex = getCurrentFocusIndex() - 1;

    if (newIndex < FIRST_CELL_INDEX) newIndex = LAST_CELL_INDEX;

    focusCellByIndex(newIndex);
  };

  const moveDown = () => {
    let newIndex = getCurrentFocusIndex() + BOARD_SIZE;

    if (newIndex > LAST_CELL_INDEX)
      newIndex = Math.max((newIndex % LAST_CELL_INDEX) - 1, 0);

    focusCellByIndex(newIndex);
  };

  return { moveDown, moveLeft, moveRight, moveUp };
})();
