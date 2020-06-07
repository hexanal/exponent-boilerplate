import './shaper-cell.scss';

import { shaperState } from './shaper';

export default ({element}) => {
  const state = {
    lock: false,
    drawn: false,
    type: 'round'
  };

  const hotCornerSize = getComputedStyle(element).getPropertyValue('--hot-corner-size');
  const CORNER_THRESHOLD = parseInt( hotCornerSize.replace('%', ''), 10 ) / 100;

  element.addEventListener('mousedown', () => {
    shaperState.set('mode', (state.drawn ? 'erase' : 'draw') );

    state.drawn = !state.drawn;
    element.dataset.drawn = state.drawn;
  });
  element.addEventListener('mouseenter', e => {
    const mode = shaperState.get('mode');

    if (mode === 'off') return;

    state.drawn = mode === 'draw'; // the other possible mode is 'erase', which set the cell to empty :)
    element.dataset.drawn = state.drawn;
  });
  element.addEventListener('mousemove', e => {
    if ( state.drawn && shaperState.get('mode') === 'off' ) return; // don't alter this cell if it's drawn and we are not currently drawing or erasing

    const { top, left, width, height } = element.getBoundingClientRect();
    const ratioY = (e.clientY - top) / height;
    const ratioX = (e.clientX - left) / width;

    const vertical = ratioY < CORNER_THRESHOLD ? 'bottom' : ( ratioY > (1 - CORNER_THRESHOLD) ? 'top' : 'center' );
    const horizontal = ratioX < CORNER_THRESHOLD ? 'right' : ( ratioX > (1 - CORNER_THRESHOLD) ? 'left' : 'center' );
    const type = vertical + '-' + horizontal;

    state.type = type;
    element.dataset.type = state.type;
  });
}

