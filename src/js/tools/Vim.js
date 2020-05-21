import Messaging from 'middlewares/Messaging';

/**
 * this is an example of a 'tool' which in this case is simply a collection of
 * functions that (poorly) emulates vim bindings.
 */

const MOVE_AMOUNT = 64; // 4em?
const MOVE_MULTIPLIER = 10;
const SCROLL_NAVIGATE = {
  to: top => {
    window.scrollTo({ top, left: 0, behavior: 'smooth' });
  },
  down: top => {
    window.scrollBy({ top, left: 0, behavior: 'smooth' });
  },
  up: top => {
    window.scrollBy({ top: -top, left: 0, behavior: 'smooth' });
  }
};

const Vim = {
  BACK_TO_TOP: () => { SCROLL_NAVIGATE.to(0); },
  GO_TO_END: () => { SCROLL_NAVIGATE.to(document.documentElement.scrollHeight); },
  MOVE_DOWN: () => { SCROLL_NAVIGATE.down(MOVE_AMOUNT) },
  MOVE_UP: () => { SCROLL_NAVIGATE.up(MOVE_AMOUNT) },
  MOVE_DOWN_FAR: () => { SCROLL_NAVIGATE.down(MOVE_AMOUNT * MOVE_MULTIPLIER) },
  MOVE_UP_FAR: () => { SCROLL_NAVIGATE.up(MOVE_AMOUNT * MOVE_MULTIPLIER) },
  NAVIGATE_TO_HOME: () => {
    Messaging.dispatch('NAVIGATE_TO', { href: '/' });
  },
}

export default Vim;
