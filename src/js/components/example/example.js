import './example.scss';

export default params => {
  const { element, ui, messaging } = params;

  // 'element' is the DOM node with the 'data-component' attribute
  element.classList.add('state-loaded');

  /**
   * 'ui' is an object containing all the 'UI' children nodes found inside the
   * component, the keys are the value of their 'data-ui' attribute.
   *
   * you could very well do that on your own inside the component by grabbing
   * the children elements, but the 'ui' object has the particularity of only
   * containing the component's children and NOT the children element of NESTED
   * components. So it's a convention that also helps you avoid running into
   * some trouble down the road! ✌️
   */
  ui.heading.textContent = 'Welcome to exponent!';

  /**
   * 'messaging' is a middleware that allows for inter-component communication.
   * it's very very basic and only allows for DISPATCHING & SUBSCRIBING.
   * so yeah, it's like publish/subscribe, or a 'on' & 'trigger' with events,
   * but this one's my own.
   *
   * it's always possible to swap it out for a better system! Check it out in
   * `/js/middlewares/Messaging.js`, and how it's passed into the components in
   * `/js/index.js`
   */
  messaging.subscribe('CHANGED_SCROLL_DIR', dir => {
    element.classList.toggle('state-scrolling-up', dir === 'UP');
  });
}
