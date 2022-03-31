import {
  BOARD_LIMITS,
  INITIAL_SNAKE,
  EMPTY_BOARD,
  ITEM_TYPES,
  WINDS,
  YUMMY_STUFF,
} from './common';

const CLOVERS_RATIO = 0.4;

/** Moves the snake taking into account possible food and obstacles
 * 
 * @param {object} state - current state
 * @param {number} xinc - x increment (can be negative)
 * @param {number} yinc - y increment (can be negative)
 * @param {WINDS} facing 
 * @returns {object} the new updated state
 */
function moveTowards(state, xinc, yinc, facing) {
  const head = state.snake[0];
  const x = head.x + xinc;
  const y = head.y + yinc;
  const isInsideBoard = x >= 0 && y >= 0 && x < BOARD_LIMITS.width && y < BOARD_LIMITS.height;
  const goingBackward = (
    (head.facing === WINDS.north && facing === WINDS.south) ||
    (head.facing === WINDS.east && facing === WINDS.west) ||
    (head.facing === WINDS.south && facing === WINDS.north) ||
    (head.facing === WINDS.west && facing === WINDS.east)
  );
  const victimCell = isInsideBoard && state.board[x][y];
  const theCellIsNotBlocked = victimCell.type !== ITEM_TYPES.wall && victimCell.type !== ITEM_TYPES.segment;

  if (!goingBackward && isInsideBoard && theCellIsNotBlocked) {
    const newState = { snake: [...state.snake], board: state.board.map(c => [...c]) };
    const willGrow = YUMMY_STUFF.includes(victimCell.type);
    if (!willGrow) {
      const tail = newState.snake[newState.snake.length - 1];
      newState.board[tail.x][tail.y] = { ...newState.board[tail.x][tail.y], facing: WINDS.west, type: ITEM_TYPES.empty };
      newState.snake = newState.snake.slice(0, -1);
      const newTail = newState.snake[newState.snake.length - 1];
      newTail.facing = newState.snake[newState.snake.length - 2].facing;
      newTail.type = ITEM_TYPES.tail;
    }
    newState.snake[0].type = ITEM_TYPES.segment;
    const newHead = { x, y, facing, type: ITEM_TYPES.head };
    newState.snake.unshift(newHead);
    newState.board[newHead.x][newHead.y] = newHead;
    return newState;
  }
  return state;
}

const initBoard = (baseBoard) => {
  const newBoard = baseBoard.map((row) => row.map(
    (cell) => ({
      ...cell,
      type: (Math.random() < CLOVERS_RATIO) ? ITEM_TYPES.clover : cell.type
    })
  ));
  INITIAL_SNAKE.forEach(s => newBoard[s.x][s.y] = s);
  return newBoard
}

export const initialState = {
  snake: INITIAL_SNAKE.map(s => ({...s})),
  board: initBoard(EMPTY_BOARD),
};

export function reducer(state, action) {
  switch (action.type) {
    case WINDS.north:
      return moveTowards(state, 0, -1, action.type);
      case WINDS.east:
      return moveTowards(state, +1, 0, action.type);
    case WINDS.south:
      return moveTowards(state, 0, +1, action.type);
    case WINDS.west:
      return moveTowards(state, -1, 0, action.type);
    default:
      throw new Error();
  }
}
