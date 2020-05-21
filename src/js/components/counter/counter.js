/**
 * a classic 'counter' example component
 */

import Storage from 'tools/Storage'; // use the storage tool to keep stuff in localstorage
import './counter.css'; // importing of straight css is always allowed

/**
 * an exponent component is called as a function and gets passed an object as
 * its sole argument.
 *
 * by default, the 'props' object contains the following:

{
  id,       // the component's name, in this particular case: "counter"
  element,  // the 'root' DOM node that sports the 'data-component' attribute
  ui,       // an object containing the 'ui' children elements (elements found with a 'data-ui' attribute)
  controls, // same as 'ui', but allows for distinguishing between elements that display stuff (ui) and elements that control stuff (controls!) with event listeners
  children, // children refers to the first level children components (in this case, it has one nested component even though in this example, it goes deeper)
}

  * cool? ok let's proceed
  *
  */
function Counter({ui, controls, element, children, messaging}) {
  const { counterId } = element.dataset; // that's a custom attribute I use to keep track of who's who
  const localStoreId = `counter-${counterId}`; // keeping track of the localStorage id

  this.state = {
    count: parseInt( Storage.get(localStoreId, 0), 10), // setting up the count state, grabbing the stored value if there's one, otherwise start with 0
  };

  /**
   * next we set up the classic increment/decrement functions
   */

  this.inc = (e, amount = 1) => {
    this.setCount(this.state.count + amount);
    children.map(child => child.inc(e, 10)); // this exemplifies one possible use case for 'children'
      // note: I haven't figured a good way to make child->parent communication easy yet...
  }

  this.dec = (e, amount = 1) => {
    this.setCount(this.state.count - amount);
    children.map(child => child.dec(e, 10));
  }

  this.setCount = function(count) {
    this.state.count = count;
    Storage.set(localStoreId, count);
    ui.heading.innerHTML = count;
  };

  ui.heading.innerHTML = this.state.count; // initializing our children elements
  ui.id.innerHTML = counterId;
  controls.incrementor.addEventListener('click', this.inc);
  controls.decrementor.addEventListener('click', this.dec);

  // sometimes we don't know if the element was included by the developer
  if (controls['reset']) {
    controls['reset'].addEventListener('click', e => {
      const { target } = e.target.dataset;

      // dispatch a message using the 'messaging' middleware
      // note: see `example2.js` for more info on that
      messaging.dispatch({
        id: 'RESET_COUNTER',
        payload: { target }
      });
    });
  }

  // subscribe to messages using the 'messaging' middleware
  messaging.subscribe('RESET_COUNTER', ({target}) => {
    if (target !== counterId) return;
    this.setCount(0);
  });
}

/**
 * ok so... Exponent expects the component to be a function, and instanciates it
 * with a straight function call with the props object as its only argument.
 *
 * If you want to use a class or a prototypal function thing, here's one way:
 */
export default props => {
  return new Counter(props);
}
