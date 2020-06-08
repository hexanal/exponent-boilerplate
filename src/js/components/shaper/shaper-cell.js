import stater from 'tools/stater';
import './shaper-cell.scss';

import { shaperState } from './shaper';

export default ({element}) => {
  const state = stater({
    id: element.dataset.cellId,
    visible: false,
    saved: false,
    type: 'center-center'
  });

  // todo: give access to optimization AS YOU GO
  // don't START with them necessarily: KNOW THAT THEY'RE THERE
  // when optimizing -> knowledge that heavy processing is happening that requires optimizing

  state.visible.changed(visible => element.dataset.visible = visible );
  state.type.changed(type => element.dataset.type = type );

  const hotCornerSize = getComputedStyle(element).getPropertyValue('--hot-corner-size');
  const CORNER_THRESHOLD = parseInt( hotCornerSize.replace('%', ''), 10 ) / 100;

  function getCornerTypeFromMoveEvent(e) {
    const { top, left, width, height } = element.getBoundingClientRect();
    const ratioY = (e.clientY - top) / height;
    const ratioX = (e.clientX - left) / width;
    const vertical = ratioY < CORNER_THRESHOLD ? 'bottom' : ( ratioY > (1 - CORNER_THRESHOLD) ? 'top' : 'center' );
    const horizontal = ratioX < CORNER_THRESHOLD ? 'right' : ( ratioX > (1 - CORNER_THRESHOLD) ? 'left' : 'center' );
    const type = vertical + '-' + horizontal;

    return type;
  }

  function drawOrReplace() {
    const { type, saved } = state.get();
    const sameType = saved && saved === type;

    if ( sameType ) {
      state.saved.set(false);
      state.visible.set(false);
    } else {
      state.saved.set( type );
      state.visible.set( true );
    }
  }

  element.addEventListener('mousedown', drawOrReplace);
  element.addEventListener('mouseleave', e => {
    const { type, saved } = state.get();
    state.type.set( saved ? saved : type);
  });
  element.addEventListener('mousemove', e => {
    state.type.set( getCornerTypeFromMoveEvent(e) );
  });

  element.addEventListener('touchend', e => {
    const { type } = state.get();
    drawOrReplace();
    // state.saved.set(false);
    // state.type.set( type );
    // state.visible.set( type );
    console.log('touchend');
  });
  element.addEventListener('touchstart', e => {
    e.preventDefault();
    // if( shaperState.get('drawing') ) {
    //   drawOrReplace();
    // }
  });
  element.addEventListener('touchmove', e => {
    state.type.set( getCornerTypeFromMoveEvent(e.touches[0]) );
  });
}

