import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

export const solvePartOne = (input) => {
	let cycle = 0,
		signal = 0,
		X = 1,
		current = 0;
	input.split('\n').forEach((line) => {
		if (/noop/.test(line)) {
			cycle += 1;
			if (cycle <= 220 && cycle % 40 === 20) {
				signal += cycle * X;
			}
		} else {
			const value = Number(line.split(' ')[1]);
			for (let i = 0; i < 2; i++) {
				cycle += 1;
				if (cycle <= 220 && cycle % 40 === 20) {
					signal += cycle * X;
				}
			}
			X += value;
		}
	});

	console.log(signal);

	return signal;
};

const isAtSprite = (rowRender, spritePos) => {
	const length = rowRender.length;
	return (
		length === spritePos || length === spritePos - 1 || length === spritePos + 1
	);
};

const draw = (crt, row, X) => {
	if (isAtSprite(crt[row], X)) {
		crt[row] = crt[row] + '#';
	} else {
		crt[row] = crt[row] + '.';
	}
};

export const solvePartTwo = (input) => {
	let X = 1,
		cycle = 0,
		row = 0;
	const crt = [''];
	input.split('\n').forEach((line) => {
		for (let i = 0; i < 2; i++) {
			if (crt[row].length === 40) {
				row += 1;
				crt[row] = '';
			}

			if (/noop/.test(line)) {
				cycle += 1;
				draw(crt, row, X);
				break;
			} else {
				cycle += 1;
				draw(crt, row, X);
			}
		}
		const value = Number(line.split(' ')[1]);
		if (value) {
			X += value;
		}
	});

	console.log(crt);
};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day10.txt', 'utf8');

		// await clipboardy.write(String(solvePartOne(data)));
		await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
