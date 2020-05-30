// load the core "lib"
import Exponent from 'exponent-core';

// load your project settings
import settings from './settings';

// middlewares: kind of like plugins
// they "augment" the props that are passed to components
import Messaging from 'middlewares/Messaging';

// components: like plugins, but targetting specific DOM nodes
import counter from 'components/counter/counter';
import example from 'components/example/example';
import measured from 'components/measured/measured';
import scroll from 'components/scroll/scroll';

// load your styles, and webpack's gonna take care of ya
import '../scss/styles.scss';

/* that's one way to do it: */
Exponent
  /**
   * The configure method allows you to override Exponent's default settings;
   * it expects an object.
   */
  .configure(settings)

  /* The 'use' method expects an array of middlewares (or just one, eh) */
  .use([ Messaging ])

  /**
   * The 'register' method expects an object where the key is the component id
   * that will be looked for in the DOM and the value is the component function
   *
   * Here we're just using the ES shorthand because the component function has
   * the same name.
   */
  .register({ counter, example, measured })

  /**
   * Ok, this is just like importing the component and calling its function
   * right away. This is for so-called "global" components which simply run and
   * manage their own stuff.
   * todo: technically, this could be a middleware
   */
  .autoload([ scroll ])

  /**
   * React-style "mount" element, in this case: look for components anywhere
   * inside the document element:
   */
  .mount(document);


/**
 * here's another way, which you might call the "express" way:
 * maybe it's more explicit?
 */

// Exponent.use(Messaging);
// Exponent.register({ 'counter': counter });
// Exponent.mount(document);
