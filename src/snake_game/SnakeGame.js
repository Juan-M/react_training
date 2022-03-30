import { useRef, useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { WINDS, BOARD_DIMENSIONS, BOARD_LIMITS, INITIAL_SNAKE, EMPTY_BOARD, ITEM_TYPES } from './consts';
import { Board } from './Board';
import { Snake } from './Snake';

const CLOVERS_RATIO = 0.2;

const useStyles = makeStyles(() => ({
  game: {
    display: 'inline-block',
    position: 'relative',
  },
  game__container: {
    background: '#9b7653',
    border: '1px solid red',
  },
  game__direction_button: {
    border: '1px dashed purple',
    background: '0',
    width: `${Math.round(BOARD_DIMENSIONS.width / 3)}px`,
    height: `${Math.round(BOARD_DIMENSIONS.height / 2)}px`,
    position: 'absolute',
    opacity: 0,
    '&:hover': {
      opacity: '30%',
    }
  }
}));

const initBoard = (baseBoard) => baseBoard.map((row) => row.map(
  (cell) => ({
    ...cell,
    type: (Math.random() < CLOVERS_RATIO)
      && !(INITIAL_SNAKE.find(s => s.x === cell.x && s.y === cell.y)) ? ITEM_TYPES.clover : cell.type
  })
));

export const SnakeGame = () => {
  const classes = useStyles();
  const gContainer = useRef();
  const [snakeSegments, setSnakeSegments] = useState(INITIAL_SNAKE.map(s => ({...s})));
  const [boardItems, setBoardItems] = useState(initBoard(EMPTY_BOARD));

  const handleKeyDown = useCallback((e) => {
    switch (e.code) {
      case 'ArrowUp':
        handleUp();
        break;
      case 'ArrowRight':
        handleRight();
        break; 
      case 'ArrowDown':
        handleDown();
        break;
      case 'ArrowLeft':
        handleLeft();
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown');
    }
  }, [handleKeyDown]);

  const handleUp = () => {
    setSnakeSegments(segs => {
      if (segs[0].y > 0 && segs[0].facing !== WINDS.south) {
        const newSegs = segs.slice(0, -1);
        newSegs.unshift({...segs[0], facing: WINDS.north, y: segs[0].y - 1})
        return newSegs;
      }
      return segs;
    });
  }; 
  const handleRight = () => {
    setSnakeSegments(segs => {
      if (segs[0].x < BOARD_LIMITS.width - 1 && segs[0].facing !== WINDS.west) {
        const newSegs = segs.slice(0, -1);
        newSegs.unshift({...segs[0], facing: WINDS.east, x: segs[0].x + 1})
        return newSegs;
      }
      return segs;
    });
  }; 
  const handleDown = () => {
    setSnakeSegments(segs => {
      if (segs[0].y < BOARD_LIMITS.height - 1 && segs[0].facing !== WINDS.north) {
        const newSegs = segs.slice(0, -1);
        newSegs.unshift({...segs[0], facing: WINDS.south, y: segs[0].y + 1})
        return newSegs;
      }
      return segs;
    });
  }; 
  const handleLeft = () => {
    setSnakeSegments(segs => {
      if (segs[0].x > 0 && segs[0].facing !== WINDS.east) {
        const newSegs = segs.slice(0, -1);
        newSegs.unshift({...segs[0], facing: WINDS.west, x: segs[0].x - 1})
        return newSegs;
      }
      return segs;
    });
  }; 
  
  return (
    <div className={classes.game}>
      <Board className={classes.game__container} ref={gContainer} boardItems={boardItems} />
      <Snake board={gContainer} segments={snakeSegments} />
      <button onClick={handleUp} className={classes.game__direction_button} style={{ top: 0, left: `${Math.ceil(BOARD_DIMENSIONS.width / 3)}px` }}>^</button>
      <button onClick={handleRight} className={classes.game__direction_button} style={{ top: `${Math.ceil(BOARD_DIMENSIONS.height / 4)}px`, right: 0 }}>&gt;</button>
      <button onClick={handleDown} className={classes.game__direction_button} style={{ bottom: '50px', left: `${Math.ceil(BOARD_DIMENSIONS.width / 3)}px` }}>v</button>
      <button onClick={handleLeft} className={classes.game__direction_button} style={{ top: `${Math.ceil(BOARD_DIMENSIONS.height / 4)}px`, left: 0 }}>&lt;</button>
    </div>
  );
};