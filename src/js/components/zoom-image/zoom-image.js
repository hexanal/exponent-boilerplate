import { delay } from 'lodash';
import './zoom-image.scss';

export default params => {
  const { element, ui, control } = params;
  const state = {
    enabled: false,
    saved: { width: 0, height: 0, top: 0, left: 0 }
  }

  ui['image'].addEventListener('click', e => {
    e.preventDefault();

    if (state.enabled) return close();

    const { width, height, top, left } = ui['image'].getBoundingClientRect();

    state.saved = { width, height, top, left };
    state.viewportPosition = window.scrollY;

    element.dataset.enabled = true;

    lockPositionAndSize()
      .then(expand);
  });

  function lockPositionAndSize() {
    const { top, left, width, height } = state.saved;

    return new Promise(resolve => {
      ui['image'].style.top = `${top}px`;
      ui['image'].style.left = `${left}px`;
      ui['image'].style.width = `${width}px`;
      ui['image'].style.height = `${height}px`;

      element.style.width = `${width}px`;
      element.style.height = `${height}px`;

      delay(resolve, 300);
    });
  }

  function resetPositionAndSize() {
    ui['image'].style.top = '';
    ui['image'].style.left = '';
    ui['image'].style.width = '';
    ui['image'].style.height = '';

    element.style.width = '';
    element.style.height = '';
  }

  function expand() {
    const { width, height } = state.saved;
    const { innerWidth, innerHeight } = window;

    const viewportRatio = innerHeight / innerWidth;
    const imageRatio = height / width;

    const expandDirection = viewportRatio > imageRatio
      ? 'height'
      : 'width';

    ui['image'].style.top = '0';
    ui['image'].style.left = '0';

    if (expandDirection === 'width') {
      ui['image'].style.width = '100%';
      ui['image'].style.height = `${100 * viewportRatio}%`;
    } else {
      ui['image'].style.width = `${100 * viewportRatio}%`;
      ui['image'].style.height = '100%';
    }

    state.enabled = false;
    element.dataset.zoomed = true;
  }

  function close() {
    window.scrollTo({ top: state.viewportPosition });

    lockPositionAndSize()
      .then(() => {
        resetPositionAndSize();
        element.dataset.enabled = false;
        element.dataset.zoomed = false;
        state.enabled = false;
      });
  }

  control['close'].addEventListener('click', e => {
    e.preventDefault();
    close();
  });
}
