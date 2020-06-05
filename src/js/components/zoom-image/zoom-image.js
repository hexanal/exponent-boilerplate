import { debounce, clamp, delay } from 'lodash';
import './zoom-image.scss';

export default params => {
  const { element, ui, control } = params;
  const state = {
    isTouch: false,
    pan: false,
    doubleTapped: false,
    enabled: false,
    startPan: { x: 0, y: 0 },
    overflow: { x: 0, y: 0 },
    lastMove: { x: 0, y: 0 },
    currentMove: { x: 0, y: 0 },
    current: {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }
  }

  /**
   * Mouse & Touch Interactions
   */
  ui['image'].addEventListener('touchstart', e => {
    state.isTouch = true;
  })
  ui['image'].addEventListener('mousedown', e => {
    if (state.enabled) return stopPan();

    const { clientX, clientY } = e;
    const { width, height, top, left } = ui['image'].getBoundingClientRect();

    state.startPan = { x: clientX, y: clientY };
    state.current = { width, height, top, left };
    state.viewportPosition = window.scrollY;

    element.dataset.enabled = true;

    lockPositionAndSize()
      .then(expand);
  });

  ui['image'].addEventListener('touchmove', e => {
    if (!state.enabled) return;

    const { clientX, clientY } = e.touches[0];
    handlePan({clientX, clientY});
  });

  ui['image'].addEventListener('mousemove', e => {
    if (!state.enabled || state.isTouch) return;

    const { clientX, clientY } = e;
    handleMousePan({clientX, clientY});
  });

  ui['image'].addEventListener('touchend', e => {
    stopPan();
  });

  /**
   * Handling the pan... panhandling, *teehee*
   */
  function handlePan({ clientX, clientY }) {
    const { x, y } = state.startPan;
    const inc = {
      x: state.lastMove.x + (x - clientX),
      y: state.lastMove.y + (y - clientY),
    };
    const move = {
      x: clamp( inc.x, 0, state.overflow.x ),
      y: clamp( inc.y, 0, state.overflow.y ),
    };
    state.currentMove = move;

    element.dataset.panning = true;
    ui['image'].style.transform = `translate(${-move.x}px, ${-move.y}px)`;
  }
  function handleMousePan({ clientX, clientY }) {
    const { innerWidth, innerHeight } = window;
    const percentWidth = clientX / innerWidth;
    const percentHeight = clientY / innerHeight;
    const move = {
      x: state.overflow.x * percentWidth,
      y: state.overflow.y * percentHeight,
    };

    ui['image'].style.transform = `translate(${-move.x}px, ${-move.y}px)`;
  }

  function stopPan() {
    state.lastMove = state.currentMove;
    state.currentMove = { x: 0, y: 0 };
    element.dataset.panning = false;
  }

  /**
   * Expand/Close - Positioning and Sizing
   */
  function lockPositionAndSize() {
    const { top, left, width, height } = state.current;

    return new Promise(resolve => {
      ui['image'].style.top = `${top}px`;
      ui['image'].style.left = `${left}px`;
      ui['image'].style.width = `${width}px`;
      ui['image'].style.height = `${height}px`;

      element.style.width = `${width}px`;
      element.style.height = `${height}px`;

      delay(resolve, 200);
    });
  }

  function resetPositionAndSize() {
    state.startPan = { x: 0, y: 0 };
    state.overflow = { x: 0, y: 0 };

    ui['image'].style.transform = `translate(0px, 0px)`;
    ui['image'].style.top = '';
    ui['image'].style.left = '';
    ui['image'].style.width = '';
    ui['image'].style.height = '';

    element.style.width = '';
    element.style.height = '';
  }

  function expand() {
    const { width, height } = state.current;
    const { innerWidth, innerHeight } = window;

    const viewportRatio = innerHeight / innerWidth;
    const imageRatio = height / width;
    const widthFactor = innerWidth / width;
    const heightFactor = innerHeight / height;

    const expandDirection = viewportRatio > imageRatio
      ? 'height'
      : 'width';

    ui['image'].style.top = '0';
    ui['image'].style.left = '0';

    if (expandDirection === 'width') {
      state.overflow.y = ( height * widthFactor ) - innerHeight;
      ui['image'].style.width = '100%';
      ui['image'].style.height = `${100 * viewportRatio}%`;
    } else {
      state.overflow.x = ( width * heightFactor ) - innerWidth;
      ui['image'].style.width = `${100 * viewportRatio}%`;
      ui['image'].style.height = '100%';
    }

    state.enabled = true;
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

  /**
   * Other event bindings
   */
  const escapeToClose = e => {
    if (e.code === 'Escape') {
      close();
      document.removeEventListener(escapeToClose);
    }
  }

  control['close'].addEventListener('click', e => {
    e.preventDefault();
    close();
  });

  const onResize = debounce(() => {
    if (state.enabled) {
      ui['image'].style.transform = `translate(0, 0)`;
      expand();
    }
  }, 500);

  document.addEventListener('keyup', escapeToClose);
  window.addEventListener('resize', onResize);
}
