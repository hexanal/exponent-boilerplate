import measure from 'tools/dom/measure';

import './box-measure.scss';

export default ({element}) => {
  const measurement = document.createElement('div');
  element.appendChild(measurement);

  element.classList.add('box-measure');
  measurement.classList.add('box-measure-label');

  measure(element, ({width, height}) => {
    measurement.textContent = `w: ${Math.round(width)}px - h: ${Math.round(height)}px`;
  });
}
