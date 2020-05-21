import SettingsManager from 'core/SettingsManager';

const PREFIX = '[exponent]';
const SEPARATOR = ' — ';
const settings = SettingsManager.all;

/**
 * Default
 */

// just a shortcut... for debugging JS on the go!
export function dump(x, level = 0) {
	if ( !isEnabled(level) ) return;

	console.log(x);
}

// output minor warnings for devs
export function warn(msg) {
	if ( settings.debug.logLevel < 2 ) return;
	log(msg, 'warn');
}

// output critical error for devs
export function error(msg) {
	if ( settings.debug.logLevel < 1 ) return;
	log(msg, 'error');
}

// classic info log for devs, with formatting
export function log(msg, fn = 'log') {
	if ( settings.debug.logLevel < 1 ) return;

	const message = withFormatting(msg);
  console[fn](message);
}

function isEnabled(level = 0) {
	if ( !SettingsManager.isFeatureEnabled('logger') ) return false;
	if ( !SettingsManager.isDev() ) return false;

	return true;
}

function withFormatting(msg) {
	if ( !isEnabled() ) return;

	let output = msg;

	output = withPrefix(output);
	output = settings.debug.timestampLogs ? withTimestamp(output) : output;

	return output;
}

function withPrefix(msg) {
	return `${PREFIX}${SEPARATOR}${msg}`;
}

function withTimestamp(msg) {
	const time = new Date().toTimeString();
	return `(@${time})${SEPARATOR}${msg}`;
}

const Logger = {
	dump,
	log,
	error,
	warn,
}

export default Logger;
