import stater from 'tools/stater';

import './grigri-devtool.scss';

export default function({element, control, ui}) {
  const state = stater({
    active: false,
    gutters: document.documentElement.style.getPropertyValue('--gutters'),
    margins: document.documentElement.style.getPropertyValue('--margins'),
    maxWidth: document.documentElement.style.getPropertyValue('--max-width'),
    spacing: document.documentElement.style.getPropertyValue('--spacing')
  });

  console.log( ui );

  state.active.changed(active => element.dataset.active = active);
  state.gutters.changed(value => {
    document.documentElement.style.setProperty('--gutters', `${value}rem`);
    ui['gutters-value'].textContent = `${value}rem`;
  });
  state.margins.changed(value => {
    document.documentElement.style.setProperty('--margins', `${value}rem`);
    ui['margins-value'].textContent = `${value}em`;
  });
  state.maxWidth.changed(value => {
    document.documentElement.style.setProperty('--max-width', `${value}px`);
    ui['max-width-value'].textContent = `${value}px`;
  });
  state.spacing.changed(value => {
    document.documentElement.style.setProperty('--spacing', `${value}rem`);
    ui['spacing-value'].textContent = `${value}rem`;
  });

  state.update();

  function toggleUI() {
    state.active.toggle();
  }

  function setGridPropValue(prop, value) {
    state[prop].set(value);
  }

  control.trigger.addEventListener('click', toggleUI);
  control.gutters.addEventListener('input', e => setGridPropValue('gutters', e.target.value) ); // todo automatically get a data attribute to target property
  control.margins.addEventListener('input', e => setGridPropValue('margins', e.target.value) );
  control['max-width'].addEventListener('input', e => setGridPropValue('maxWidth', e.target.value) );
  control.spacing.addEventListener('input', e => setGridPropValue('spacing', e.target.value) );
}
