/**
 * This "component" isn't really linked to a DOM element, and acts on its own.
 * It's a function that called by Exponent's "autoload" function.
 *
 * It gets passed the middlewares, so you can still plug into the whole Exponent
 * structure if you so desire.
 */

export default function(props) {
  const state = {
    scrollY: 0,
    scrollDirection: 'DOWN',
    scrollPastViewport: false,
  };

  const onScroll = e => {
    const { scrollY, innerHeight } = window;

    const scrollDirection = scrollY > state.scrollY ? 'DOWN' : 'UP';
    state.scrollY = scrollY;
    state.scrollPastViewport = scrollY >= innerHeight;

    document.documentElement.dataset.scrollDirection = state.scrollDirection;
    document.documentElement.dataset.scrolledPastViewport = state.scrollPastViewport;

    if (scrollDirection !== state.scrollDirection) {
      state.scrollDirection = scrollDirection;

      /**
       * Here, it's using the 'messaging' middleware to dispatch the message
       * that the scroll direction changed:
       */
      props.messaging.dispatch({
        id: 'CHANGED_SCROLL_DIR',
        payload: scrollDirection
      });

    }
  }

  document.addEventListener('scroll', onScroll);
}
