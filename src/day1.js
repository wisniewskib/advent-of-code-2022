import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

export const solvePartOne = (input) => {
	let max = 0;
	let temp = 0;
	input.split('\n').forEach((kcal) => {
		if (kcal === '') {
			max = Math.max(max, temp);
			temp = 0;
		} else {
			temp += Number(kcal);
		}
	});
	return max;
};

export const solvePartTwo = (input) => {
	const elves = [];
	let temp = 0;
	input.split('\n').forEach((kcal) => {
		if (kcal === '') {
			elves.push(Number(temp));
			temp = 0;
		} else {
			temp += Number(kcal);
		}
	});
	elves.push(temp);
	elves.sort((n1, n2) => n2 - n1);
	return elves[0] + elves[1] + elves[2];
};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day1.txt', 'utf8');
		// await clipboardy.write(String(solvePartOne(data)));
		// await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
