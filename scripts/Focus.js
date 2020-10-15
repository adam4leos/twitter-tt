const Focus = (function () {
  const { cells } = DOMContent;
  const { FIRST_CELL_INDEX } = Constants;
  let currentFocusIndex = FIRST_CELL_INDEX;

  const focusCellByIndex = (index) => {
    currentFocusIndex = index;
    cells[index].focus();
  };

  const changeFocus = (newFocusTarget) => {
    if (!isCellNode(newFocusTarget) || isCellVisited(newFocusTarget)) return;

    const id = parseInt(newFocusTarget.getAttribute('data-id'), 10);
    focusCellByIndex(id - 1);
  };

  const focusFirstCell = () => {
    cells[0].focus();
  };

  const getCurrentFocusIndex = () => currentFocusIndex;

  return { changeFocus, focusCellByIndex, focusFirstCell, getCurrentFocusIndex };
})();
