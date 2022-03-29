import { useRef, useState, forwardRef, useEffect, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { WINDS } from './consts';
import { Snake } from './Snake';

const BOARD_LIMITS = {
  cellSide: 30,
  height: 20, 
  width: 26,
};

const BOARD_DIMENSIONS = {
  width: BOARD_LIMITS.cellSide * BOARD_LIMITS.width,
  height: BOARD_LIMITS.cellSide * BOARD_LIMITS.height,
}

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

const INITIAL_SNAKE = [
  { direction: 'west', x: 10, y: 9 },  // head
  { direction: 'west', x: 11, y: 9 },  // middle segments
  { direction: 'west', x: 12, y: 9 },  // middle segments
  { direction: 'west', x: 13, y: 9 },  // middle segments
  { direction: 'west', x: 14, y: 9 },  // middle segments
  { direction: 'west', x: 15, y: 9 },  // Tail
];

const Board = forwardRef((props, ref) => (
  <svg className={props.className} ref={ref} width={BOARD_DIMENSIONS.width} height={BOARD_DIMENSIONS.height} />
));

export const SnakeGame = () => {
  const classes = useStyles();
  const gContainer = useRef();
  const [snakeSegments, setSnakeSegments] = useState(INITIAL_SNAKE);
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
      if (segs[0].y > 0 && segs[0].direction !== WINDS.south) {
        const newSegs = segs.slice(0, -1);
        newSegs.unshift({...segs[0], direction: WINDS.north, y: segs[0].y - 1})
        return newSegs;
      }
      return segs;
    });
  }; 
  const handleRight = () => {
    setSnakeSegments(segs => {
      if (segs[0].x < BOARD_LIMITS.width - 1 && segs[0].direction !== WINDS.west) {
        const newSegs = segs.slice(0, -1);
        newSegs.unshift({...segs[0], direction: WINDS.east, x: segs[0].x + 1})
        return newSegs;
      }
      return segs;
    });
  }; 
  const handleDown = () => {
    setSnakeSegments(segs => {
      if (segs[0].y < BOARD_LIMITS.height - 1 && segs[0].direction !== WINDS.north) {
        const newSegs = segs.slice(0, -1);
        newSegs.unshift({...segs[0], direction: WINDS.south, y: segs[0].y + 1})
        return newSegs;
      }
      return segs;
    });
  }; 
  const handleLeft = () => {
    setSnakeSegments(segs => {
      if (segs[0].x > 0 && segs[0].direction !== WINDS.east) {
        const newSegs = segs.slice(0, -1);
        newSegs.unshift({...segs[0], direction: WINDS.west, x: segs[0].x - 1})
        return newSegs;
      }
      return segs;
    });
  }; 
  
  return (
    <div className={classes.game}>
      <Board className={classes.game__container} ref={gContainer}/>
      <Snake board={gContainer} segments={snakeSegments} cellSide={BOARD_LIMITS.cellSide}/>
      <button onClick={handleUp} className={classes.game__direction_button} style={{ top: 0, left: `${Math.ceil(BOARD_DIMENSIONS.width / 3)}px` }}>^</button>
      <button onClick={handleRight} className={classes.game__direction_button} style={{ top: `${Math.ceil(BOARD_DIMENSIONS.height / 4)}px`, right: 0 }}>&gt;</button>
      <button onClick={handleDown} className={classes.game__direction_button} style={{ bottom: '50px', left: `${Math.ceil(BOARD_DIMENSIONS.width / 3)}px` }}>v</button>
      <button onClick={handleLeft} className={classes.game__direction_button} style={{ top: `${Math.ceil(BOARD_DIMENSIONS.height / 4)}px`, left: 0 }}>&lt;</button>
    </div>
  );
};