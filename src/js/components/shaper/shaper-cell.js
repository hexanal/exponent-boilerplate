import './shaper-cell.scss';

import { shaperState } from './shaper';

export default ({element}) => {
  const state = {
    lock: false,
    drawn: false,
    type: 'center-center',
    lockType: 'center-center'
  };

  // todo: give access to optimization AS YOU GO
  // don't START with them necessarily: KNOW THAT THEY'RE THERE
  // when optimizing -> knowledge that heavy processing is happening that requires optimizing

  const hotCornerSize = getComputedStyle(element).getPropertyValue('--hot-corner-size');
  const CORNER_THRESHOLD = parseInt( hotCornerSize.replace('%', ''), 10 ) / 100;

  element.addEventListener('mousedown', () => {
    shaperState
      .set('mode', (state.drawn ? 'edit' : 'draw') )
      .and(mode => {
        state.mode = mode;
        state.drawn = state.mode === 'edit' ? !state.drawn : true;
        render();
      });
  });
  element.addEventListener('mouseenter', e => {
    const mode = shaperState.get('mode');

    if (mode === 'off') return;

    state.drawn = mode === 'draw';
    render();
  });
  element.addEventListener('mouseleave', e => {
    const mode = shaperState.get('mode');

    if (mode === 'off') return;

    state.drawn = mode === 'draw';
    render();
  });
  element.addEventListener('mousemove', e => {
    const { top, left, width, height } = element.getBoundingClientRect();
    const ratioY = (e.clientY - top) / height;
    const ratioX = (e.clientX - left) / width;

    const vertical = ratioY < CORNER_THRESHOLD ? 'bottom' : ( ratioY > (1 - CORNER_THRESHOLD) ? 'top' : 'center' );
    const horizontal = ratioX < CORNER_THRESHOLD ? 'right' : ( ratioX > (1 - CORNER_THRESHOLD) ? 'left' : 'center' );
    const type = vertical + '-' + horizontal;

    state.type = type;
    render();
  });

  function render() {
    element.dataset.drawn = state.drawn;
    element.dataset.type = state.type;
  }
}

