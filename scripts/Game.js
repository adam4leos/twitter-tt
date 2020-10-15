// TODO imporeve winning sets
// TODO improve private variables
// TODO improve global events handling
// TODO improve winning combination logic
// TODO support dynamic settings

const {
  BOARD_SIZE,
  PLAYING_CELLS,
  PLAYER_MARKS,
  CELL_CLASSES,
  GAME_MESSAGES,
  WINNING_SETS,
  KEY_CODES,
  FIRST_CELL_INDEX,
  LAST_CELL_INDEX,
} = Constants;
const { moveDown, moveLeft, moveRight, moveUp } = Navigation;
const {
  isCellNode,
  isCellVisited,
  isPlayerChoiceWithinGameRange,
  isNewGameButton,
} = ValidationChecks;
const { changeFocus, focusFirstCell } = Focus;

const { board, modal, cells, startNewGameButton } = DOMContent;

const TicTacToe = (function () {
  const game = {};

  // private variables
  const ownership = {
    [PLAYER_MARKS.X]: [],
    [PLAYER_MARKS.O]: [],
  };

  let currentPlayer = PLAYER_MARKS.X;

  // private methods
  const isPlayerExistsInGame = (player) => ownership[player] !== undefined;

  // TODO improve turnend conditions check
  function endGameIfOver() {
    if (hasCurrentPlayerWon()) {
      showMessage(
        GAME_MESSAGES.GAME_FINISHED_HEADING,
        `Player ${currentPlayer} has won!`
      );
    } else if (hasNoWinner()) {
      showMessage(GAME_MESSAGES.GAME_FINISHED_HEADING, GAME_MESSAGES.DRAW_TEXT);
    } else {
      toggleCurrentPlayer();
    }
  }

  const hasNoWinner = () =>
    ownership[PLAYER_MARKS.X].length + ownership[PLAYER_MARKS.O].length ===
    PLAYING_CELLS;

  const showMessage = (heading, message) => {
    modal.querySelector('.modal-heading').innerHTML = heading;
    modal.querySelector('.modal-text').innerHTML = message;

    modal.showModal();
    startNewGameButton.focus();
    preventFocusLose(); // TODO block all focus changes
  };

  const hideModal = () => {
    modal.close();
  };

  const resetGameCellsClasses = () => {
    for (let i = 0, length = cells.length; i < length; i++) {
      cells[i].className = CELL_CLASSES.CELL;
    }
  };

  const resetPlayersChoices = () => {
    Object.keys(ownership).forEach((ownershipKey) => {
      ownership[ownershipKey] = [];
    });
  };

  const resetGame = () => {
    resetGameCellsClasses();
    resetPlayersChoices();
    focusFirstCell();
  };

  function hasCurrentPlayerWon() {
    const ownedCells = ownership[currentPlayer];

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
  }

  const toggleCurrentPlayer = () => {
    currentPlayer =
      currentPlayer === PLAYER_MARKS.X ? PLAYER_MARKS.O : PLAYER_MARKS.X;
  };

  const updatePlayerChoices = (player, choice) => {
    if (!isPlayerExistsInGame(player) || !isPlayerChoiceWithinGameRange(choice))
      return;

    ownership[player].push(choice);
  };

  const drawMark = (cell) => {
    if (
      !isCellNode(cell) ||
      isCellVisited(cell) ||
      !isPlayerExistsInGame(currentPlayer)
    )
      return;
    cell.classList.add(CELL_CLASSES[currentPlayer], CELL_CLASSES.VISITED);
  };

  const drawPreviewMark = (cell) => {
    if (
      !isCellNode(cell) ||
      isCellVisited(cell) ||
      !isPlayerExistsInGame(currentPlayer)
    )
      return;
    cell.classList.add(CELL_CLASSES[currentPlayer]);
  };

  const removePreviewMark = (cell) => {
    if (
      !isCellNode(cell) ||
      isCellVisited(cell) ||
      !isPlayerExistsInGame(currentPlayer)
    )
      return;
    cell.classList.remove(CELL_CLASSES[currentPlayer]);
  };

  const updateCellField = (cell) => {
    if (!isCellNode(cell) || isCellVisited(cell)) return;

    drawMark(cell);
    updatePlayerChoices(
      currentPlayer,
      parseInt(cell.getAttribute('data-id'), 10)
    );
    endGameIfOver();
  };

  const onBoardClickHandler = ({ target }) => {
    updateCellField(target);
  };

  // TODO here
  const onBoardMouseOverHandler = ({ target }) => {
    drawPreviewMark(target);
    changeFocus(target);
  }

  const onBoardMouseOutHandler = ({ target }) => {
    removePreviewMark(target);
  };

  const onModalCancelHandler = () => {
    resetGame();
  };

  const onStartNewGameClickHandler = (event) => {
    if (!event || !isNewGameButton(event.target)) return;

    resetGame();
    hideModal();
  };


  const preventFocusLose = () => {
    // TODO remove TAB functionality and return it
    //console.log('123')
  };

  const onGlobalKeyPressHandler = (e) => {
    const { keyCode, target } = e;

    switch (keyCode) {
      case KEY_CODES.ENTER:
      case KEY_CODES.SPACE:
        if (isCellNode(target)) updateCellField(target);
        else if (isNewGameButton(target)) onStartNewGameClickHandler(e);
        break;

      case KEY_CODES.LEFT:
        moveLeft();
        break;

      case KEY_CODES.UP:
        moveUp();
        break;

      case KEY_CODES.RIGHT:
        moveRight();
        break;

      case KEY_CODES.DOWN:
        moveDown();
        break;

      default:
        return; // exit this handler for other keys
    }

    e.preventDefault(); // prevent the default action (scroll / move caret)
  };

  const addModalEventListeners = () => {
    modal.addEventListener('cancel', onModalCancelHandler);
    modal.addEventListener('click', onStartNewGameClickHandler);
  };

  const addCellsEventListeners = () => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('focus', onBoardMouseOverHandler);
      cells[i].addEventListener('blur', onBoardMouseOutHandler);
    }
  };

  const addBoardMouseEventListeners = () => {
    board.addEventListener('click', onBoardClickHandler);
    board.addEventListener('mouseover', onBoardMouseOverHandler);
    board.addEventListener('mouseout', onBoardMouseOutHandler);
  };

  const addKeyboardEventListeners = () => {
    document.addEventListener('keydown', onGlobalKeyPressHandler);
  };

  const addEventListeners = () => {
    addBoardMouseEventListeners();
    addCellsEventListeners();
    addModalEventListeners();
    addKeyboardEventListeners();
  };

  // public methods
  game.start = function() {
    addEventListeners();
  };

  game.reset = function() {
    resetGame();
  }

  return game;
})();

document.addEventListener('DOMContentLoaded', TicTacToe.start);
