import fs from 'fs';
import clipboardy from 'clipboardy';

export const solvePartOne = (input) => {
	let readingStacks = true;
	let stacks = [];
	input.split('\n').forEach((line) => {
		if (readingStacks) {
			if (line.match(/\d/g)) {
				readingStacks = false;
				stacks = stacks.map((stack) =>
					stack
						.filter((crate) => crate.match(/[a-zA-Z]/g))
						.map((crate) => crate.replace(/[^a-zA-Z]/g, ''))
				);
				return;
			}
			line.match(/.{1,4}/g).forEach((stackItem, index) => {
				if (!stacks[index]) {
					stacks[index] = [stackItem];
				} else {
					stacks[index].push(stackItem);
				}
			});
		} else if (line !== '') {
			const instructions = line.match(/\d+/g);
			for (let i = 0; i < instructions[0]; i += 1) {
				stacks[instructions[2] - 1].unshift(
					stacks[instructions[1] - 1].shift()
				);
			}
		}
	});
	console.log(stacks);
	return stacks.reduce((acc, cur) => (acc += cur[0]), '');
};

export const solvePartTwo = (input) => {
	let readingStacks = true;
	let stacks = [];
	input.split('\n').forEach((line) => {
		if (readingStacks) {
			if (line.match(/\d/g)) {
				readingStacks = false;
				stacks = stacks.map((stack) =>
					stack
						.filter((crate) => crate.match(/[a-zA-Z]/g))
						.map((crate) => crate.replace(/[^a-zA-Z]/g, ''))
				);
				return;
			}
			line.match(/.{1,4}/g).forEach((stackItem, index) => {
				if (!stacks[index]) {
					stacks[index] = [stackItem];
				} else {
					stacks[index].push(stackItem);
				}
			});
		} else if (line !== '') {
			const instructions = line.match(/\d+/g);
			stacks[instructions[2] - 1].unshift(
				...stacks[instructions[1] - 1].splice(0, instructions[0])
			);
		}
	});
	console.log(stacks);
	return stacks.reduce((acc, cur) => (acc += cur[0]), '');
};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day5.txt', 'utf8');
		// await clipboardy.write(String(solvePartOne(data)));
		await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
