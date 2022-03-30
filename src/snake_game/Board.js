import { forwardRef, useEffect } from 'react';
import * as d3 from 'd3';
import clover from '../imgs/clover.svg';
import { BOARD_LIMITS, BOARD_DIMENSIONS, ITEM_TYPES } from './consts';

const updateBoard = (board, items) => {
  // !!!!! to check the board data
  // items.forEach(
  //   row => console.log(row.map(i => i.type.toString()).join().replaceAll('Symbol(', '').replaceAll(',', '').replaceAll(')', ''))
  // )

  const cellSide = BOARD_LIMITS.cellSide;
  const container = d3.select(board);
  const cloverArray = items.reduce((acc, row) => acc.concat(
    row.filter(item => item.type === ITEM_TYPES.clover)
  ), []);

  console.log(cloverArray)

  container.selectAll('image.clover').remove();

  container
    .selectAll('image.clover')
    .data(cloverArray)
    .enter()
    .append('image')
    .attr('class', 'clover')
    .attr('xlink:href', clover)
    .attr('width', cellSide * 1.1)
    .attr('height', cellSide)
    .attr('x', d => d.x * cellSide)
    .attr('y', d => d.y * cellSide);
}
const _Board = (props, ref) => {
  useEffect(() => {
    updateBoard(ref.current, props.boardItems);
  }, [ref, props.boardItems]);

  return (
    <svg className={props.className} ref={ref} width={BOARD_DIMENSIONS.width} height={BOARD_DIMENSIONS.height} />
  )
};
export const Board = forwardRef(_Board);