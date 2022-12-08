import fs from 'fs';
import clipboardy from 'clipboardy';

const readDirectories = (input) => {
	const dirs = {};
	const currentPath = [];
	input.split('\n').forEach((line) => {
		if (/\d+\s\w+/.test(line)) {
			const fileSize = Number(line.split(' ')[0]);

			const path = [];
			currentPath.forEach((dir) => {
				path.push(dir);

				const dirSize = dirs[path.join('/')] ?? 0;
				dirs[path.join('/')] = dirSize + fileSize;
			});
		} else if (/\$ cd/.test(line)) {
			const target = line.split(' ')[2];
			target === '..' ? currentPath.pop() : currentPath.push(target);
		}
	});

	return dirs;
};

export const solvePartOne = (input) => {
	const dirs = readDirectories(input);
	return Object.values(dirs).reduce(
		(acc, cur) => (cur <= 100000 ? acc + cur : acc),
		0
	);
};

export const solvePartTwo = (input) => {
	const dirs = readDirectories(input);
	return Object.values(dirs)
		.sort((a, b) => a - b)
		.find((dirSize) => 70000000 - dirs['/'] + dirSize >= 30000000);
};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day7.txt', 'utf8');

		// await clipboardy.write(String(solvePartOne(data)));
		// await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
