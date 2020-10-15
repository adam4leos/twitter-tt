const Focus = (function () {
  const { cells } = DOMContent;
  const { FIRST_CELL_INDEX } = Constants;
  const { isCellNode, isCellVisited } = ValidationChecks;

  let currentFocusIndex = FIRST_CELL_INDEX;

  const preventFocusLose = () => {
    // TODO remove TAB functionality and return it
  };

  const focusCellByIndex = (index) => {
    currentFocusIndex = index;
    cells[index].focus();
  };

  const changeFocus = (newFocusTarget) => {
    if (!isCellNode(newFocusTarget) || isCellVisited(newFocusTarget)) return;

    // cellID - starts from 1, so -1 will give 0 base index
    const cellIndex = parseInt(newFocusTarget.getAttribute('data-id'), 10) - 1;
    focusCellByIndex(cellIndex);
  };

  const focusFirstCell = () => {
    cells[FIRST_CELL_INDEX].focus();
  };

  const getCurrentFocusIndex = () => currentFocusIndex;

  return {
    changeFocus,
    focusCellByIndex,
    focusFirstCell,
    getCurrentFocusIndex,
    preventFocusLose,
  };
})();
