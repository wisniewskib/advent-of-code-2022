import fs from 'fs';
import clipboardy from 'clipboardy';

export const solvePartOne = (input) => {
	let sum = 0;
	input.split('\n').forEach((line) => {
		const commonItemType = line
			.substring(0, line.length / 2)
			.split('')
			.find((itemType) => line.substring(line.length / 2).includes(itemType));
		const charCode = commonItemType.charCodeAt(0);
		sum += charCode <= 90 ? charCode - 38 : charCode - 96;
	});
	console.log(sum);
	return sum;
};

export const solvePartTwo = (input) => {
	let sum = 0;
	const lines = input.split('\n');
	for (let i = 0; i < lines.length; i += 3) {
		const commonItem = lines[i]
			.split('')
			.find(
				(letter) =>
					lines[i + 1].includes(letter) && lines[i + 2].includes(letter)
			);
		const charCode = commonItem.charCodeAt(0);
		sum += charCode <= 90 ? charCode - 38 : charCode - 96;
	}
	console.log(sum);
	return sum;
};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day3.txt', 'utf8');
		// await clipboardy.write(String(solvePartOne(data)));
		await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
