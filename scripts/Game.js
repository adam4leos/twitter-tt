// TODO imporeve winning sets
// TODO improve private variables
// TODO improve global events handling
// TODO improve winning combination logic
// TODO support dynamic settings

const TicTacToe = (function () {
  const { CELL_CLASSES, GAME_MESSAGES, KEY_CODES } = Constants;
  const { isCellNode, isCellVisited, isNewGameButton } = ValidationChecks;
  const { moveDown, moveLeft, moveRight, moveUp } = Navigation;
  const { board, modal, cells } = DOMContent;
  const { hideModal, showMessage } = Modal;
  const { changeFocus, focusFirstCell } = Focus;
  const { drawMark, drawPreviewMark, removePreviewMark } = Marks;
  const {
    toggleCurrentPlayer,
    updatePlayerChoices,
    resetPlayersChoices,
    getCurrentPlayer,
  } = Player;
  const { hasCurrentPlayerWon, hasNoWinner } = WinLogic;

  // private variables
  const game = {};

  // Private methods
  // End game checks
  const endGameIfOver = () => {
    if (hasCurrentPlayerWon()) {
      showMessage(
        GAME_MESSAGES.GAME_FINISHED_HEADING,
        `Player ${getCurrentPlayer()} has won!`
      );
    } else if (hasNoWinner()) {
      showMessage(GAME_MESSAGES.GAME_FINISHED_HEADING, GAME_MESSAGES.DRAW_TEXT);
    } else {
      toggleCurrentPlayer();
    }
  };

  // Game reset
  const resetGameCellsClasses = () => {
    for (let i = 0, length = cells.length; i < length; i++) {
      cells[i].className = CELL_CLASSES.CELL;
    }
  };

  const resetGame = () => {
    resetGameCellsClasses();
    resetPlayersChoices();
    focusFirstCell();
  };

  // Game behaviour
  const updateCellField = (cell) => {
    if (!isCellNode(cell) || isCellVisited(cell)) return;

    drawMark(cell);
    updatePlayerChoices(
      getCurrentPlayer(),
      parseInt(cell.getAttribute('data-id'), 10)
    );
    endGameIfOver();
  };

  // Event handlers
  const onBoardClickHandler = ({ target }) => {
    updateCellField(target);
  };

  const onBoardMouseOverHandler = ({ target }) => {
    drawPreviewMark(target);
    changeFocus(target);
  };

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

  const onGlobalKeyPressHandler = (e) => {
    const { keyCode, target } = e;

    switch (keyCode) {
      case KEY_CODES.ENTER:
      case KEY_CODES.SPACE:
        if (isCellNode(target)) updateCellField(target);
        else if (isNewGameButton(target)) onStartNewGameClickHandler(e);
        break;

      case KEY_CODES.LEFT:
      case KEY_CODES.A:
        moveLeft();
        break;

      case KEY_CODES.UP:
      case KEY_CODES.W:
        moveUp();
        break;

      case KEY_CODES.RIGHT:
      case KEY_CODES.D:
        moveRight();
        break;

      case KEY_CODES.DOWN:
      case KEY_CODES.S:
        moveDown();
        break;

      default:
        return; // exit this handler for other keys
    }

    e.preventDefault(); // prevent the default action (scroll / move caret)
  };

  // Event Listeners
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

  // Public methods
  game.start = () => {
    addEventListeners();
  };

  game.reset = () => {
    resetGame();
  };

  return game;
})();

document.addEventListener('DOMContentLoaded', TicTacToe.start);
