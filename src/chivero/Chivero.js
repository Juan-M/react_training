import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { makeStyles } from '@mui/styles';
import snakeHead from '../imgs/snakeHead.svg';


const useStyles = makeStyles(theme => ({
  chachi: {
    display: 'inline-block',
    background: 'white',
    color: 'red',
    padding: '0.5em 1em',
  },
  chivero__container: {
    border: '1px solid green',
    display: 'block',
    '& p': {
      margin: 0,
    }
  },
}));

function updateGraph(e, payload) {
  var container = d3.select(e);

  container
    .selectAll('image')
    .data(payload)
    .enter()
    .append('image')
    .attr('xlink:href', snakeHead)
    .attr('width', (d) => Math.round(d * 1.50))
    .attr('height', (d) => d)
    .attr('transform', (d, i) => `rotate(${d} ${(i * 150) + Math.round(d * 0.75)} ${200 + Math.round(d / 2)})`)
    .attr('x', (d, i) => i * 150)
    .attr('y', 200);
};

export const Chivero = (props) => {
  const classes = useStyles();
  const gContainer = useRef(null);

  useEffect(() => {
    updateGraph(gContainer.current, props.payload);
  }, [props.payload]);

  return (
    <div className={classes.chachi}>
      <svg className={classes.chivero__container} ref={gContainer} width="800" height="600"/>
    </div>
  );
};