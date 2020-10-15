const Player = (function () {
  const { PLAYER_MARKS } = Constants;
  const { isPlayerChoiceWithinGameRange } = ValidationChecks;

  const ownership = {
    [PLAYER_MARKS.X]: [],
    [PLAYER_MARKS.O]: [],
  };
  let currentPlayer = PLAYER_MARKS.X;

  const isPlayerExistsInGame = (player) => ownership[player] !== undefined;
  const getCurrentPlayer = () => currentPlayer;
  const getPlayerMarks = (player) =>
    isPlayerExistsInGame(player) && ownership[player];
  const getCurrentPlayerMarks = () => ownership[getCurrentPlayer()];

  const toggleCurrentPlayer = () => {
    currentPlayer =
      getCurrentPlayer() === PLAYER_MARKS.X ? PLAYER_MARKS.O : PLAYER_MARKS.X;
  };

  const updatePlayerChoices = (player, choice) => {
    if (!isPlayerExistsInGame(player) || !isPlayerChoiceWithinGameRange(choice))
      return;

    getPlayerMarks(player).push(choice);
  };

  const resetPlayersChoices = () => {
    Object.keys(ownership).forEach((ownershipKey) => {
      ownership[ownershipKey] = [];
    });
  };

  return {
    toggleCurrentPlayer,
    updatePlayerChoices,
    resetPlayersChoices,
    getCurrentPlayer,
    getCurrentPlayerMarks,
    getPlayerMarks,
  };
})();
