import throttle from 'lodash.throttle';
import measure from 'tools/dom/measure';

import './expand-collapse.scss';
import './collapse.scss';

export default ({element, ui, messaging}) => {
  const state = {
    open: !(element.dataset.startCollapsed === 'true')
  };

  measure(ui['content'], throttle( ({height}) => {
    state.height = height;
    render();
  }, 100) );

  messaging.subscribe(`TOGGLE_${element.dataset.componentId}`, toggleState => {
    state.open = toggleState;
    render();
  });

  function render() {
    element.dataset.expanded = state.open;
    element.style.height = state.open ? `${state.height}px` : 0;
  }
}

