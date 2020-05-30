import measure from 'tools/measure';

import './measured.scss';

export default ({element, ui}) => {
  measure(element, ({width, height}) => {
    ui['width'].textContent = width;
    ui['height'].textContent = height;
  });
}
