import stater from 'tools/stater';
import { clamp } from 'lodash';

import './grigri-devtool.scss';

export default function({element, control, ui}) {
  const state = stater({
    active: false,
    showColumns: false,
    showGutters: false,
    showMargins: false,
    showSpacing: false,
    gutters: document.documentElement.style.getPropertyValue('--gutters'),
    margins: document.documentElement.style.getPropertyValue('--margins'),
    maxWidth: document.documentElement.style.getPropertyValue('--max-width'),
    spacing: document.documentElement.style.getPropertyValue('--spacing')
  });

  state.active.changed(active => element.dataset.active = active);
  state.showColumns.changed(active => document.documentElement.dataset.showColumns = active);
  state.showMargins.changed(active => document.documentElement.dataset.showMargins = active);
  state.showSpacing.changed(active => document.documentElement.dataset.showSpacing = active);

  state.gutters.changed(value => {
    const val = clamp(value, parseInt(control.gutters.getAttribute('min'), 10), parseInt(control.gutters.getAttribute('max'), 10) );
    document.documentElement.style.setProperty('--gutters', `${val}rem`);
    control['gutters-value'].value = val;
  });
  state.margins.changed(value => {
    const val = clamp(value, parseInt(control.margins.getAttribute('min'), 10), parseInt(control.margins.getAttribute('max'), 10) );
    document.documentElement.style.setProperty('--margins', `${val}rem`);
    control['margins-value'].value = val;
  });
  state.spacing.changed(value => {
    const val = clamp(value, parseInt(control.spacing.getAttribute('min'), 10), parseInt(control.spacing.getAttribute('max'), 10) );
    document.documentElement.style.setProperty('--spacing', `${val}rem`);
    control['spacing-value'].value = val;
  });
  state.maxWidth.changed(value => {
    const val = clamp(value, parseInt(control['max-width'].getAttribute('min'), 10), parseInt(control['max-width'].getAttribute('max'), 10) );
    document.documentElement.style.setProperty('--max-width', `${val}px`);
    control['max-width-value'].value = val;
  });

  function toggleUI() {
    state.active.toggle();
  }

  function setGridPropValue(prop, value) {
    state[prop].set(value);
    return value;
  }

  control.trigger.addEventListener('click', toggleUI);
  control['toggle-columns'].addEventListener('change', e => state.showColumns.toggle() );
  control['toggle-margins'].addEventListener('change', e => state.showMargins.toggle() );
  control['toggle-spacing'].addEventListener('change', e => state.showSpacing.toggle() );

  control.gutters.addEventListener('input', e => setGridPropValue('gutters', e.target.value) ); // todo automatically get a data attribute to target property
  control['gutters-value'].addEventListener('change', e => {
    control.gutters.value = setGridPropValue('gutters', e.target.value);
  });

  control.margins.addEventListener('input', e => setGridPropValue('margins', e.target.value) );
  control['margins-value'].addEventListener('change', e => {
    control.margins.value = setGridPropValue('margins', e.target.value);
  });

  control.spacing.addEventListener('input', e => setGridPropValue('spacing', e.target.value) );
  control['spacing-value'].addEventListener('change', e => {
    control.spacing.value = setGridPropValue('spacing', e.target.value);
  });

  control['max-width'].addEventListener('input', e => setGridPropValue('maxWidth', e.target.value) );
  control['max-width-value'].addEventListener('change', e => {
    control['max-width'].value = setGridPropValue('maxWidth', e.target.value);
  });
}
