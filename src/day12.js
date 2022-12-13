import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

const grid = getMap(fs.readFileSync('src/inputs/day12.txt', 'utf8'));

function getMap(input) {
	return input
		.split('\n')
		.filter(Boolean)
		.map((row) => row.split(''));
}

export const solvePartOne = () => {
	let start = '0,0',
		end = '0,0';

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			const current = grid[y][x];
			if (current === 'S') {
				start = [y, x].join(',');
			} else if (current === 'E') {
				end = [y, x].join(',');
			}
		}
	}
	return bfs(start, end);
};

export const solvePartTwo = () => {
	let starts = ['0,0'],
		end = '0,0';

	for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
		for (let columnIndex = 0; columnIndex < grid[0].length; columnIndex++) {
			const current = grid[rowIndex][columnIndex];
			if (current === 'S' || current === 'a') {
				starts.push([rowIndex, columnIndex].join(','));
			} else if (current === 'E') {
				end = [rowIndex, columnIndex].join(',');
			}
		}
	}

	const results = starts
		.map((start) => {
			return bfs(start, end);
		})
		.sort((a, b) => {
			if (a && b) {
				return a - b;
			} else {
				return -1;
			}
		});

	return results[0];
};

function bfs(start, end) {
	const visited = new Set();
	const queue = [[start, 0]];

	while (queue.length > 0) {
		const current = queue.shift();
		const curretPosition = current[0].split(',').map((e) => parseInt(e));
		const possibleMoves = getPossibleMoves(...curretPosition).map((e) =>
			e.join(',')
		);

		for (const move of possibleMoves) {
			if (move === end) {
				return current[1] + 1;
			}

			if (!visited.has(move)) {
				visited.add(move);
				queue.push([move, current[1] + 1]);
			}
		}
	}
}
function getPossibleMoves(y, x) {
	return [
		[y - 1, x],
		[y, x + 1],
		[y + 1, x],
		[y, x - 1],
	].filter((cords) => {
		return (
			(cords[0] >= 0 || cords[1] >= 0) &&
			grid?.[cords[0]]?.[cords[1]] &&
			canMove(grid[y][x], grid[cords[0]][cords[1]])
		);
	});
}

function canMove(from, to) {
	from = from === 'S' ? 'a' : from;
	to = to === 'E' ? 'z' : to;

	if (from.toLowerCase() !== from || to.toLowerCase() !== to) {
		return false;
	}

	if (to.charCodeAt(0) - from.charCodeAt(0) <= 1) {
		return true;
	}

	return false;
}

console.log(solvePartOne());
console.log(solvePartTwo());
