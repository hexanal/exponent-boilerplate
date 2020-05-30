export default ({element, messaging}) => {
  const state = {
    toggled: (element.dataset.toggled === 'true')
  }

  element.addEventListener('click', e => {
    state.toggled = !state.toggled;
    messaging.dispatch({
      id: `TOGGLE_${element.dataset.target}`,
      payload: state.toggled
    });
  });
}

