import fs from 'fs';
import clipboardy from 'clipboardy';

export const solvePartOne = (input) => {
	const visibleTrees = new Set();
	let forest = input.split('\n').map((line) => line.split('').map(Number));
	const width = forest[0].length,
		height = forest.length;
	let xMax = width - 1,
		yMax = height - 1,
		topMax = -1,
		bottomMax = -1,
		leftMax = -1,
		rightMax = -1;
	// Yes I know these two loops are ugly but I need to get a breakfast
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (forest[y][x] > leftMax) {
				visibleTrees.add(`${y}-${x}`);
			}
			if (forest[y][xMax - x] > rightMax) {
				visibleTrees.add(`${y}-${xMax - x}`);
			}
			leftMax = Math.max(forest[y][x], leftMax);
			rightMax = Math.max(forest[y][xMax - x], rightMax);
		}
		leftMax = -1;
		rightMax = -1;
	}
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			console.log(forest[y][x], forest[yMax - y][x]);
			if (forest[y][x] > topMax) {
				visibleTrees.add(`${y}-${x}`);
			}
			if (forest[yMax - y][x] > bottomMax) {
				visibleTrees.add(`${yMax - y}-${x}`);
			}
			topMax = Math.max(forest[y][x], topMax);
			bottomMax = Math.max(forest[yMax - y][x], bottomMax);
		}
		topMax = -1;
		bottomMax = -1;
	}
	console.log(visibleTrees.size);
	return visibleTrees.size;
};

const evaluateScenicScore = (forest, y, x, width, height) => {
	const currentTree = forest[y][x];
	let left = 0,
		right = 0,
		top = 0,
		bottom = 0;

	for (let i = 1; x - i >= 0; i++) {
		if (forest[y][x - i] < currentTree) {
			left++;
		} else if (forest[y][x - i] >= currentTree) {
			left++;
			break;
		}
	}

	for (let i = 1; x + i < width; i++) {
		if (forest[y][x + i] < currentTree) {
			right++;
		} else if (forest[y][x + i] >= currentTree) {
			right++;
			break;
		}
	}

	for (let i = 1; y - i >= 0; i++) {
		if (forest[y - i][x] < currentTree) {
			top++;
		} else if (forest[y - i][x] >= currentTree) {
			top++;
			break;
		}
	}

	for (let i = 1; y + i < height; i++) {
		if (forest[y + i][x] < currentTree) {
			bottom++;
		} else if (forest[y + i][x] >= currentTree) {
			bottom++;
			break;
		}
	}
	return left * right * top * bottom;
};

export const solvePartTwo = (input) => {
	let forest = input.split('\n').map((line) => line.split('').map(Number));
	const width = forest[0].length,
		height = forest.length;
	let highestScenicScore = 0;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			highestScenicScore = Math.max(
				evaluateScenicScore(forest, y, x, width, height),
				highestScenicScore
			);
		}
	}
	console.log(highestScenicScore);
	return highestScenicScore;
};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day8.txt', 'utf8');
		// await clipboardy.write(String(solvePartOne(data)));
		await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
