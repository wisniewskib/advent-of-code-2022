import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

const isNotTouching = (xH, yH, xT, yT) => {
	return Math.abs(xH - xT) > 1 || Math.abs(yH - yT) > 1;
};

export const solvePartOne = (input) => {
	const visited = new Set();
	visited.add('0-0');
	let xH = 0,
		yH = 0,
		xT = 0,
		yT = 0;
	input.split('\n').forEach((line) => {
		let [direction, steps] = line.split(' ');
		steps = Number(steps);
		switch (direction) {
			case 'U':
				yH += steps;
				break;
			case 'D':
				yH -= steps;
				break;
			case 'L':
				xH -= steps;
				break;
			case 'R':
				xH += steps;
				break;
		}
		while (isNotTouching(xH, yH, xT, yT)) {
			if (yH !== yT && (direction === 'L' || direction === 'R')) {
				yT = yH > yT ? ++yT : --yT;
			}
			if (xH !== xT && (direction === 'U' || direction === 'D')) {
				xT = xH > xT ? ++xT : --xT;
			}
			switch (direction) {
				case 'U':
					yT++;
					break;
				case 'D':
					yT--;
					break;
				case 'L':
					xT--;
					break;
				case 'R':
					xT++;
					break;
			}
			visited.add(`${xT}-${yT}`);
		}
	});
	console.log(visited.size);
	return visited.size;
};

export const solvePartTwo = (input) => {
	const visited = new Set();
	visited.add('0-0');
	let xPos = Array.from({ length: 10 }, (i) => 0),
		yPos = Array.from({ length: 10 }, (i) => 0);
	input.split('\n').forEach((line) => {
		let [direction, steps] = line.split(' ');
		steps = Number(steps);
		for (let step = 0; step < steps; step++) {
			switch (direction) {
				case 'U':
					yPos[0]++;
					break;
				case 'D':
					yPos[0]--;
					break;
				case 'L':
					xPos[0]--;
					break;
				case 'R':
					xPos[0]++;
					break;
			}
			for (let i = 1; i < 10; i++) {
				if (isNotTouching(xPos[i - 1], yPos[i - 1], xPos[i], yPos[i])) {
					if (xPos[i - 1] === xPos[i]) {
						if (yPos[i - 1] > yPos[i]) {
							yPos[i]++;
						} else {
							yPos[i]--;
						}
					} else if (yPos[i - 1] === yPos[i]) {
						if (xPos[i - 1] > xPos[i]) {
							xPos[i]++;
						} else {
							xPos[i]--;
						}
					} else {
						if (xPos[i - 1] > xPos[i]) {
							xPos[i]++;
						} else {
							xPos[i]--;
						}
						if (yPos[i - 1] > yPos[i]) {
							yPos[i]++;
						} else {
							yPos[i]--;
						}
					}
				}
				if (i === 9) {
					visited.add(`${xPos[i]}-${yPos[i]}`);
				}
			}
		}
	});
	console.log(visited.size);
	return visited.size;
};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day9.txt', 'utf8');

		// await clipboardy.write(String(solvePartOne(data)));
		await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
