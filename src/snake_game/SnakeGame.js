import { useRef, useReducer, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Board } from './Board';
import { Snake } from './Snake';
import { reducer, initialState} from './reducer';
import {
  BOARD_DIMENSIONS,
  symbolToStr,
  WINDS,
} from './common';

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
    },
    '&.up': {
      top: 0,
      left: `${Math.ceil(BOARD_DIMENSIONS.width / 3)}px`,
    },
    '&.right': {
      top: `${Math.ceil(BOARD_DIMENSIONS.height / 4)}px`,
      right: 0,
    },
    '&.down': {
      bottom: '50px',
      left: `${Math.ceil(BOARD_DIMENSIONS.width / 3)}px`,
    },
    '&.left': {
      top: `${Math.ceil(BOARD_DIMENSIONS.height / 4)}px`,
      left: 0,
    },
  }
}));

export const SnakeGame = () => {
  const classes = useStyles();
  const gContainer = useRef();
  const [game, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  const handleUp = () => {
    dispatch({type: WINDS.north});
  };

  const handleRight = () => {
    dispatch({type: WINDS.east});
  }; 

  const handleDown = () => {
    dispatch({type: WINDS.south});
  }; 

  const handleLeft = () => {
    dispatch({type: WINDS.west});
  }; 

  const handleKeyDown = (e) => {
    switch (e.code) {
      case 'ArrowUp':
        dispatch({type: WINDS.north});
        break;
      case 'ArrowRight':
        dispatch({type: WINDS.east});
        break; 
      case 'ArrowDown':
        dispatch({type: WINDS.south});
        break;
      case 'ArrowLeft':
        dispatch({type: WINDS.west});
        break;
      default:
        break;
    }
  };
  
  return (
    <div className={classes.game}>
      <Board className={classes.game__container} ref={gContainer} boardItems={game.board} />
      <Snake board={gContainer} segments={game.snake} />
      <button onClick={handleUp} className={`${classes.game__direction_button} up`} >^</button>
      <button onClick={handleRight} className={`${classes.game__direction_button} right`} >&gt;</button>
      <button onClick={handleDown} className={`${classes.game__direction_button} down`} >v</button>
      <button onClick={handleLeft} className={`${classes.game__direction_button} left`} >&lt;</button>
      <pre>x: {game.snake[0].x}, y: {game.snake[0].y}, type: {symbolToStr(game.snake[0].type)}, facing: {symbolToStr(game.snake[0].facing)},</pre>
    </div>
  );
};