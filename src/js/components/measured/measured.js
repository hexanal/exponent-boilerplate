import measure from 'tools/dom/measure';
import inView from 'tools/dom/in-view';

import './measured.scss';

export default ({element, ui}) => {
  /* Example use of the measure tool */
  measure(element, ({width, height}) => {
    ui['width'].textContent = width;
    ui['height'].textContent = height;
  });

  /* Example use of the 'inView' tool */
  inView(element, isInView => {
    element.dataset.inViewport = isInView;
  }, {
    // you can pass options as you would with `IntersectionObserver`
    threshold: 1
  });
}
