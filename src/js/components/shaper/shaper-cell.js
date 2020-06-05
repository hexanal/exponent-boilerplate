import './shaper-cell.scss';

export default ({element}) => {
  const state = {
    locked: false,
    type: 'round'
  };
  const CORNER_THRESHOLD = 0.4;

  element.addEventListener('click', e => {
    state.locked = !state.locked;
    element.dataset.locked = state.locked;
  });
  element.addEventListener('mousemove', e => {
    if ( state.locked ) return;

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

