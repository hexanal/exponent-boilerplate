import './container-query.scss';

export default ({control, ui}) => {
  control['embiggen'].addEventListener('click', e => {
    ui['truncate1'].classList.toggle('is-big');
  });
}
