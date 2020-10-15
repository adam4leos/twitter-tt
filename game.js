// TODO move constants
// TODO split logic
// TODO imporeve winning sets
// TODO improve private variables
// TODO improve global events handling
// TODO improve winning combination logic
// TODO support dynamic settings

const TicTacToe = (function () {
  const game = {};

  // private variables
  const DEFAULT_BOARD_SIZE = 3;
  const BOARD_SIZE = DEFAULT_BOARD_SIZE;
  const PLAYING_CELLS = BOARD_SIZE * BOARD_SIZE;
  const PLAYER_MARKS = {
    'X': 'x',
    'O': 'o',
  };
  const CELL_CLASSES = {
    CELL: 'cell',
    VISITED: 'visited',
    [PLAYER_MARKS.X]: PLAYER_MARKS.X,
    [PLAYER_MARKS.O]: PLAYER_MARKS.O,
  };
  const WINNING_SETS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  const KEY_CODES = {
    'TAB': 9,
    'ENTER': 13,
    'SPACE': 32,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40,
  };
  const ownership = {
    [PLAYER_MARKS.X]: [],
    [PLAYER_MARKS.O]: [],
  };
  const GAME_MESSAGES = {
    GAME_FINISHED_HEADING: 'Game finished!',
    DRAW_TEXT: "It's a draw!",
  }
  const FIRST_CELL_INDEX = 0;
  const LAST_CELL_INDEX = PLAYING_CELLS - 1;

  const board = document.getElementById('board');
  const modal = document.getElementById('modal');
  const cells = document.getElementsByClassName(CELL_CLASSES.CELL);
  const startNewGameButton = document.getElementById('start-new-game-button');

  let currentPlayer = PLAYER_MARKS.X;
  let currentFocusIndex = FIRST_CELL_INDEX;

  // private methods
  const isCellNode = node => node.classList.contains(CELL_CLASSES.CELL);
  const isCellVisited = node => isCellNode(node) && node.classList.contains(CELL_CLASSES.VISITED)
  const isPlayerExistsInGame = player => ownership[player] !== undefined;
  const isPlayerChoiceWithinGameRange = choice => choice > 0 && choice <= PLAYING_CELLS;
  const isNewGameButton = node => node.classList.contains('modal-button');

  // TODO improve turnend conditions check
  function endGameIfOver() {
    if (hasCurrentPlayerWon()) {
      showMessage(GAME_MESSAGES.GAME_FINISHED_HEADING, `Player ${currentPlayer} has won!`);
    } else if (hasNoWinner()) {
      showMessage(GAME_MESSAGES.GAME_FINISHED_HEADING, GAME_MESSAGES.DRAW_TEXT);
    } else {
      toggleCurrentPlayer();
    }
  }

  const hasNoWinner = () => ownership[PLAYER_MARKS.X].length + ownership[PLAYER_MARKS.O].length ===PLAYING_CELLS;

  const showMessage = (heading, message) => {
    modal.querySelector('.modal-heading').innerHTML = heading;
    modal.querySelector('.modal-text').innerHTML = message;

    modal.showModal();
    startNewGameButton.focus();
    preventFocusLose(); // TODO block all focus changes
  }

  const hideModal = () => {
    modal.close();
  }

  const resetGameCellsClasses = () => {
    for (let i = 0, length = cells.length; i < length; i++) {
      cells[i].className = CELL_CLASSES.CELL;
    }
  }

  const resetPlayersChoices = () => {
    Object.keys(ownership).forEach(ownershipKey => {
      ownership[ownershipKey] = [];
    });
  }

  const focusFirstCell = () => {
    cells[0].focus();
  }

  const resetGame = () => {
    resetGameCellsClasses();
    resetPlayersChoices();
    focusFirstCell();
  }

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
    currentPlayer = currentPlayer === PLAYER_MARKS.X ? PLAYER_MARKS.O : PLAYER_MARKS.X;
  }

  const updatePlayerChoices = (player, choice) => {
    if (!isPlayerExistsInGame(player) || !isPlayerChoiceWithinGameRange(choice)) return;

    ownership[player].push(choice);
  };

  const drawMark = (cell) => {
    if (!isCellNode(cell) || isCellVisited(cell) || !isPlayerExistsInGame(currentPlayer)) return;
    cell.classList.add(CELL_CLASSES[currentPlayer], CELL_CLASSES.VISITED);
  }

  const drawPreviewMark = (cell) => {
    if (!isCellNode(cell) || isCellVisited(cell) || !isPlayerExistsInGame(currentPlayer)) return;
    cell.classList.add(CELL_CLASSES[currentPlayer]);
  }

  const removePreviewMark = (cell) => {
    if (!isCellNode(cell) || isCellVisited(cell) || !isPlayerExistsInGame(currentPlayer)) return;
    cell.classList.remove(CELL_CLASSES[currentPlayer]);
  }

  const updateCellField = (cell) => {
    if (!isCellNode(cell) || isCellVisited(cell)) return;

    drawMark(cell);
    updatePlayerChoices(currentPlayer, parseInt(cell.getAttribute('data-id'), 10));
    endGameIfOver();
  }

  const onBoardClickHandler = ({ target }) => {
    updateCellField(target);
  }

  const onBoardMouseOverHandler = ({ target }) => {
    drawPreviewMark(target);
  }

  const onBoardMouseOutHandler = ({ target }) => {
    removePreviewMark(target);
  }

  const onModalCancelHandler = () => {
    resetGame();
  }

  const onStartNewGameClickHandler = (event) => {
    if (!event || !isNewGameButton(event.target)) return;

    resetGame();
    hideModal();
  };

  const focusCellByIndex = (index) => {
    currentFocusIndex = index;
    cells[index].focus();
  }

  const moveRight = () => {
    let newIndex = currentFocusIndex + 1;

    if (newIndex > LAST_CELL_INDEX) newIndex = FIRST_CELL_INDEX;

    focusCellByIndex(newIndex);
  }

  const moveUp = () => {
    let newIndex = currentFocusIndex - BOARD_SIZE;

    if (newIndex < FIRST_CELL_INDEX) newIndex = Math.min(LAST_CELL_INDEX, LAST_CELL_INDEX + newIndex + 1);

    focusCellByIndex(newIndex);
  }

  const moveLeft = () => {
    let newIndex = currentFocusIndex - 1;

    if (newIndex < FIRST_CELL_INDEX) newIndex = LAST_CELL_INDEX;

    focusCellByIndex(newIndex);
  }

  const moveDown = () => {
    let newIndex = currentFocusIndex + BOARD_SIZE;

    if (newIndex > LAST_CELL_INDEX) newIndex = Math.max(newIndex % LAST_CELL_INDEX - 1, 0);

    focusCellByIndex(newIndex);
  }

  const preventFocusLose = () => {
    // TODO remove TAB functionality and return it
    //console.log('123')
  }

  const onGlobalKeyPressHandler = (e) => {
    const { keyCode, target } = e;

    switch(keyCode) { 
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

      default: return; // exit this handler for other keys
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
  }

  const addBoardMouseEventListeners = () => {
    board.addEventListener('click', onBoardClickHandler);
    board.addEventListener('mouseover', onBoardMouseOverHandler);
    board.addEventListener('mouseout', onBoardMouseOutHandler);
  };

  const addKeyboardEventListeners = () => {
    document.addEventListener('keydown', onGlobalKeyPressHandler)
  };

  const addEventListeners = () => {
    addBoardMouseEventListeners();
    addCellsEventListeners();
    addModalEventListeners();
    addKeyboardEventListeners();
  }

  // public methods
  game.start = function () {
    addEventListeners();
  };

  return game;
})();

document.addEventListener('DOMContentLoaded', TicTacToe.start);
