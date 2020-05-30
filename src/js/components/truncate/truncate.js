import truncate from 'lodash.truncate';
import debounce from 'lodash.debounce';
import measure from 'tools/dom/measure';

import './truncate.scss';

export default ({element}) => {
  const state = {
    full: element.textContent,
    truncated: truncate(element.textContent, {
      'length': 24,
      'omission': '[...]'
    })
  };

  const getContentsForWidth = function(width) {
    return width <= 200 ? state.truncated : state.full;
  }

  measure(element, debounce(({width}) => {
    element.textContent = getContentsForWidth(width);
  }, 500));
}

