module.exports = {
  /* Project "mode" -> either 'production' or 'development' */
  mode: 'development',

  /**
   * Your 'user settings'. You can override the defaults here;
   */

  /* selector for Exponent's components */
  // componentSelector: 'component', // [data-{value}] — e.g. <div data-component="yo"></div>

  /* selector for the components' interface elements */
  // uiSelector: 'ui',

  /* selector for components' user input elements */
  // controlSelector: 'control',

  /**
   * and finally, you can put anything you want, this was always allowed!
   * in this example: project-specific settings help with toggling features
   */
  featureFlags: {
    debug: true
  },
};
