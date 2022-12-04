import fs from 'fs';
import clipboardy from 'clipboardy';

const mapInputToArrayOfPairsSections = (input) =>
	input.split('\n').map((line) => {
		const pairs = line.split(',');
		const pair1 = pairs[0].split('-').map(Number);
		const pair2 = pairs[1].split('-').map(Number);
		return [
			Array.from({ length: pair1[1] - pair1[0] + 1 }, (v, i) => pair1[0] + i),
			Array.from({ length: pair2[1] - pair2[0] + 1 }, (v, i) => pair2[0] + i),
		];
	});

export const solvePartOne = (input) => {
	let fullyOverlappedPairs = 0;
	const pairsArray = mapInputToArrayOfPairsSections(input);
	pairsArray.forEach((pair) => {
		if (
			pair[0].length >= pair[1].length &&
			pair[1].every((n) => pair[0].includes(n))
		) {
			fullyOverlappedPairs += 1;
		} else if (pair[0].every((n) => pair[1].includes(n))) {
			fullyOverlappedPairs += 1;
		}
	});
	console.log(fullyOverlappedPairs);
	return fullyOverlappedPairs;
};

export const solvePartTwo = (input) => {
	let fullyOverlappedPairs = 0;
	const pairsArray = mapInputToArrayOfPairsSections(input);
	pairsArray.forEach((pair) => {
		if (
			pair[0].some((n) => pair[1].includes(n)) ||
			pair[1].some((n) => pair[0].includes(n))
		) {
			fullyOverlappedPairs += 1;
		}
	});
	console.log(fullyOverlappedPairs);
	return fullyOverlappedPairs;
};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day4.txt', 'utf8');
		// await clipboardy.write(String(solvePartOne(data)));
		await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
