export function clamp(min, max, value) {
	return Math.min(max, Math.max(min, value));
}

export function getProbabilityOutcome(probability) {
	return probability > Math.random();
}

export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

export function round(val, scale = 5) {
	const decimals = Math.pow(10, scale);
	return Math.round((val + Number.EPSILON) * decimals) / decimals;
}

const Calculator = {
	clamp,
	getProbabilityOutcome,
	getRandomInt,
	round,
};

export default Calculator;
