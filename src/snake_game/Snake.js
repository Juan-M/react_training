import { useEffect } from 'react';
import * as d3 from 'd3';
import { makeStyles } from '@mui/styles';
import snakeHead from '../imgs/snakeHead.svg';
import snakeTail from '../imgs/snakeTail.svg';
import snakeSegment from '../imgs/snakeSegment.svg';
import { WINDS, BOARD_LIMITS, symbolToStr } from './common';

const useStyles = makeStyles(theme => ({
  snake: {
    border: '1px dotted purple'
  },
}));

function svgAttr(segments, pos) {
  let svg = pos ? snakeTail : snakeHead;
  const isSegment = pos && pos < segments.length - 1;
  if (isSegment) {
    svg = snakeSegment;
  }

  return svg;
};

function updateSerpent(board, segments) {
  const cellSide = BOARD_LIMITS.cellSide;
  const container = d3.select(board);
  
  container.selectAll('image.snake').remove();
  container
    .selectAll('image.snake')
    .data(segments)
    .enter()
    .append('image')
    .attr('xlink:href', (d, p) => svgAttr(segments, p))
    .attr('class', 'snake')
    .attr('width', cellSide * 1.5)
    .attr('height', cellSide)
    .attr('x', d => d.x * cellSide)
    .attr('y', d => d.y * cellSide)
    .attr('transform', (d) => {
      switch (d.facing) {
        case WINDS.north:
          return `rotate(90, ${d.x * cellSide + cellSide / 2}, ${d.y * cellSide + cellSide / 2})`;
        case WINDS.east:
          return `rotate(180, ${d.x * cellSide + cellSide / 2}, ${d.y * cellSide + cellSide / 2})`;
        case WINDS.south:
          return `rotate(270, ${d.x * cellSide + cellSide / 2}, ${d.y * cellSide + cellSide / 2})`;
        default:
          return '';
      }
    });
};

export const Snake = (props) => {
  const classes = useStyles();

  useEffect(() => {
    updateSerpent(props.board.current, props.segments);
  }, [props.board, props.segments]);

  return (
    <pre className={classes.snake}>
      Snake head at: {props.segments[0].x} {props.segments[0].y} and going {symbolToStr(props.segments[0].facing)},
      with total snake length {props.segments.length}
    </pre>
  );
};