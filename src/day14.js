import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

const getXes = (start, end, y) => {
	const xes = [];
	while (start <= end) {
		xes.push(`${start}-${y}`);
		start += 1;
	}
	return xes;
};

const getYs = (start, end, x) => {
	const ys = [];
	while (start <= end) {
		ys.push(`${x}-${start}`);
		start += 1;
	}
	return ys;
};

const buildGrid = (input) => {
	const grid = new Set();
	input.split('\n').forEach((line) => {
		const cords = line
			.split('->')
			.map((cord) => cord.trim().split(',').map(Number));
		let prevX, prevY;
		cords.forEach(([x, y]) => {
			maxY = Math.max(y, maxY);
			if (!prevX && !prevY) {
				prevX = x;
				prevY = y;
			} else {
				if (x != prevX) {
					const start = Math.min(x, prevX);
					const end = Math.max(x, prevX);
					getXes(start, end, y).forEach((item) => grid.add(item));
				} else {
					const start = Math.min(y, prevY);
					const end = Math.max(y, prevY);
					getYs(start, end, x).forEach((item) => grid.add(item));
				}
				prevX = x;
				prevY = y;
			}
		});
	});
	return grid;
};

var maxY = 0;
const data = fs.readFileSync('src/inputs/day14.txt', 'utf8');
const grid = buildGrid(data);
const sand = new Set();

const isFilled = (x, y) => {
	return grid.has(`${x}-${y}`) || y === maxY + 2;
};

const cantKeepPouring = () => {
	return (
		isFilled(500, 0) && isFilled(500, 1) && isFilled(501, 1) && isFilled(499, 1)
	);
};

const pourSand = () => {
	let [x, y] = [500, 0];
	while (
		!isFilled(x, y + 1) ||
		!isFilled(x - 1, y + 1) ||
		!isFilled(x + 1, y + 1)
	) {
		// console.log(x, y);
		if (!isFilled(x, y + 1)) {
			y += 1;
		} else if (!isFilled(x - 1, y + 1)) {
			y += 1;
			x -= 1;
		} else if (!isFilled(x + 1, y + 1)) {
			y += 1;
			x += 1;
		}
		if (y >= maxY) {
			return false;
		}
	}
	grid.add(`${x}-${y}`);
	return true;
};

const pourSandUntilBlocked = () => {
	let [x, y] = [500, 0];
	while (
		!isFilled(x, y + 1) ||
		!isFilled(x - 1, y + 1) ||
		!isFilled(x + 1, y + 1)
	) {
		if (!isFilled(x, y + 1)) {
			y += 1;
		} else if (!isFilled(x - 1, y + 1)) {
			y += 1;
			x -= 1;
		} else if (!isFilled(x + 1, y + 1)) {
			y += 1;
			x += 1;
		}
		if (cantKeepPouring()) {
			return false;
		}
	}
	if (cantKeepPouring()) {
		return false;
	}
	grid.add(`${x}-${y}`);
	sand.add(`${x}-${y}`);
	return true;
};

const drawGrid = () => {
	let line = `........................`;
	const gridToDraw = [];
	for (let i = 0; i < 14; i++) {
		gridToDraw.push([...line.split('')]);
	}
	grid.forEach((cords) => {
		const [x, y] = cords.split('-');
		gridToDraw[y][x - 490] = '#';
	});
	sand.forEach((cords) => {
		const [x, y] = cords.split('-');
		gridToDraw[y][x - 490] = 'o';
	});
	console.log(gridToDraw.map((line) => line.join('')).join('\n'));
};

export const solvePartOne = () => {
	// let count = 0;
	// // drawGrid();
	// while (pourSand()) {
	// 	count += 1;
	// }
	// console.log(count);
	// return count;
};

export const solvePartTwo = (input) => {
	let count = 0;
	while (pourSandUntilBlocked()) {
		count += 1;
	}
	console.log(count);
	return count;
};

try {
	// await clipboardy.write(String(solvePartOne()));
	await clipboardy.write(String(solvePartTwo()));
} catch (error) {
	console.error(error);
}
