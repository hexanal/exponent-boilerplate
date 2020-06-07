import './shaper-cell.scss';

export default ({element}) => {
  const state = {
    lock: false,
    drawn: false,
    type: 'round'
  };

  const CORNER_THRESHOLD = 0.35;

  element.addEventListener('mousedown', () => {
    state.drawn = !state.drawn;
    element.dataset.drawn = state.drawn;
  });
  // element.addEventListener('mouseup', () => {
  //   state.drawn = state.lock;
  //   state.lock = false;
  // });
  // element.addEventListener('mouseup', () => {
  //   state.drawn = state.lock;
  //   state.lock = false;
  // }):
  element.addEventListener('mouseenter', e => {
    if (e.buttons === 0 ) return;
    state.drawn = !state.drawn;
    element.dataset.drawn = state.drawn;
  });
  // element.addEventListener('mouseenter',
  element.addEventListener('mousemove', e => {
    // if (e.buttons === 0 ) return;
    if ( state.drawn ) return;

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

