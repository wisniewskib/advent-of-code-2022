import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

const inputToMonkeysObj = (input) => {
	const monkeyInput = input.split(/\n\s*\n/);
	return monkeyInput.map((monkey) => {
		const monkeyLines = monkey.split('\n');
		const items = monkeyLines[1].match(/\d+/g).map(Number);
		const equation = monkeyLines[2].split('=')[1].trim();
		let operation;
		if (equation.match(/old/g).length > 1) {
			operation = (old) => old * old;
		} else {
			const number = Number(equation.split(' ')[2]);
			if (/old\s\+\s\d+/.test(equation)) {
				operation = (old) => old + number;
			} else if (/old\s\*\s\d+/.test(equation)) {
				operation = (old) => old * number;
			} else if (/old\s\-\s\d+/.test(equation)) {
				operation = (old) => old - number;
			}
		}
		const testValue = Number(monkeyLines[3].match(/\d+/)[0]);
		const monkeyTrue = Number(monkeyLines[4].match(/\d+/)[0]);
		const monkeyFalse = Number(monkeyLines[5].match(/\d+/)[0]);
		const predicate = (number) =>
			number % testValue === 0 ? monkeyTrue : monkeyFalse;

		return {
			items,
			operation,
			predicate,
			inspected: 0,
			divisibleBy: testValue,
		};
	});
};

export const solvePartOne = (input) => {
	const monkeys = inputToMonkeysObj(input);
	for (let i = 0; i < 20; i++) {
		monkeys.forEach((monkey) => {
			while (monkey.items.length > 0) {
				let item = monkey.items.shift();
				item = Math.floor(monkey.operation(item) / 3);
				const targetMonkeyIndex = monkey.predicate(item);
				monkeys[targetMonkeyIndex].items.push(item);
				monkey.inspected += 1;
			}
		});
	}
	monkeys.sort((monkey1, monkey2) => monkey2.inspected - monkey1.inspected);
	return monkeys[0].inspected * monkeys[1].inspected;
};

export const solvePartTwo = (input) => {
	const monkeys = inputToMonkeysObj(input);
	let modulo = monkeys.reduce((acc, cur) => (acc = acc * cur.divisibleBy), 1);
	console.log(modulo);
	for (let i = 0; i < 10000; i++) {
		monkeys.forEach((monkey) => {
			while (monkey.items.length > 0) {
				let item = monkey.items.shift();
				item = monkey.operation(item) % modulo;
				const targetMonkeyIndex = monkey.predicate(item);
				monkeys[targetMonkeyIndex].items.push(item);
				monkey.inspected += 1;
			}
		});
	}
	monkeys.sort((monkey1, monkey2) => monkey2.inspected - monkey1.inspected);
	console.log(monkeys);
	return monkeys[0].inspected * monkeys[1].inspected;
};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day11.txt', 'utf8');

		// await clipboardy.write(String(solvePartOne(data)));
		await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
