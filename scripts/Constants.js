const Constants = (function() {
  const DEFAULT_BOARD_SIZE = 3;
  const BOARD_SIZE = DEFAULT_BOARD_SIZE;
  const PLAYING_CELLS = BOARD_SIZE * BOARD_SIZE;

  const PLAYER_MARKS = {
    X: 'x',
    O: 'o',
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
    TAB: 9,
    ENTER: 13,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  const GAME_MESSAGES = {
    GAME_FINISHED_HEADING: 'Game finished!',
    DRAW_TEXT: "It's a draw!",
  };

  const FIRST_CELL_INDEX = 0;
  const LAST_CELL_INDEX = PLAYING_CELLS - 1;

  return {
    BOARD_SIZE,
    PLAYING_CELLS,
    PLAYER_MARKS,
    CELL_CLASSES,
    KEY_CODES,
    WINNING_SETS,
    GAME_MESSAGES,
    FIRST_CELL_INDEX,
    LAST_CELL_INDEX,
  };
})();
