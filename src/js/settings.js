import projectSettings from '../../exponent.config';

export default {
  ...projectSettings,

  // selector for Exponent's components
  componentSelector: 'component', // [data-{value}] — e.g. <div data-component="yo"></div>

  // selector for the components' interface elements
  uiSelector: 'ui',

  // selector for components' user input elements
  controlSelector: 'control',

  // project-specific settings to help you enable/disable features
  featureFlags: {
    logger: true,
  },

  debug: {
    enabled: true,
    timestampLogs: true,
    logLevel: 0, // 0: none, 1: some, 2: all of it!
  },

};
