import fs from 'fs';
import clipboardy from 'clipboardy';

const areCharactersAllDifferent = (str) =>
	str.split('').every((letter, index) => index === str.lastIndexOf(letter));

export const solvePartOne = (input) => {
	for (let i = 0; i < input.length; i += 1) {
		if (areCharactersAllDifferent(input.substring(i, i + 5))) {
			return i + 4;
		}
	}
	return 0;
};

export const solvePartTwo = (input) => {
	for (let i = 0; i < input.length; i += 1) {
		if (areCharactersAllDifferent(input.substring(i, i + 14))) {
			return i + 14;
		}
	}
	return 0;
};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day6.txt', 'utf8');
		// await clipboardy.write(String(solvePartOne(data)));
		await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
