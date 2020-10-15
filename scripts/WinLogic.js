const WinLogic = (function () {
  const { WINNING_SETS, BOARD_SIZE, PLAYER_MARKS, PLAYING_CELLS } = Constants;
  const { getCurrentPlayerMarks, getPlayerMarks } = Player;

  const hasCurrentPlayerWon = () => {
    const ownedCells = getCurrentPlayerMarks();

    if (ownedCells.length < BOARD_SIZE) {
      return false;
    }

    return (
      WINNING_SETS.filter(function (set) {
        return (
          set.filter(function (num) {
            return ownedCells.indexOf(num) >= 0;
          }).length >= BOARD_SIZE
        );
      }).length > 0
    );
  };

  const hasNoWinner = () =>
    getPlayerMarks(PLAYER_MARKS.X).length +
      getPlayerMarks(PLAYER_MARKS.O).length ===
    PLAYING_CELLS;

  return { hasCurrentPlayerWon, hasNoWinner };
})();
