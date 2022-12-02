import fs from 'fs';
import clipboardy from 'clipboardy';

export const solvePartOne = (input) => {
	const points = { X: 1, Y: 2, Z: 3 };
	let result = 0;

	const evaluateRound = (round) => {
		if (round[0] === 'A') {
			return round[1] === 'X' ? 3 : round[1] === 'Y' ? 6 : 0;
		}
		if (round[0] === 'B') {
			return round[1] === 'X' ? 0 : round[1] === 'Y' ? 3 : 6;
		}
		return round[1] === 'X' ? 6 : round[1] === 'Y' ? 0 : 3;
	};

	input.split('\n').forEach((line) => {
		const round = line.toString().split(' ');
		result += evaluateRound(round) + points[round[1]];
	});

	return result;
};

export const solvePartTwo = (input) => {
	const points = { X: 0, Y: 3, Z: 6 };
	let result = 0;

	const evaluateRound = (round) => {
		if (round[0] === 'A') {
			return round[1] === 'X' ? 3 : round[1] === 'Y' ? 1 : 2;
		}
		if (round[0] === 'B') {
			return round[1] === 'X' ? 1 : round[1] === 'Y' ? 2 : 3;
		}
		return round[1] === 'X' ? 2 : round[1] === 'Y' ? 3 : 1;
	};
	input.split('\n').forEach((line) => {
		const round = line.toString().split(' ');
		if (line.length > 0) result += evaluateRound(round) + points[round[1]];
	});
	console.log(result);
	return result;
};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day2.txt', 'utf8');
		// await clipboardy.write(String(solvePartOne(data)));
		// await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
