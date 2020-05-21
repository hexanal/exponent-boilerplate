import settings from 'settings';

export function isDev() {
  return settings.mode === 'development';
}

export function isProduction() {
  return settings.mode === 'production';
}

export function getFeatureFlag(id) {
  const flag = settings.featureFlags[id];

  return typeof flag !== 'boolean'
    ? false
    : flag;
}

export function isFeatureEnabled(id) {
  return this.getFeatureFlag(id);
}

export default {
  all: settings,
  isDev,
  isProduction,
  getFeatureFlag,
  isFeatureEnabled,
};
