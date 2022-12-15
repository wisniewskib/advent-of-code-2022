import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

const isNumber = (value) => typeof value === 'number';
const isArray = (value) => typeof value === 'object';

export const solvePartOne = (input) => {
	const pairs = input.trim().split(/\n\s*\n/);
	let inOrderCount = 0;
	pairs.forEach((pair, i) => {
		const [left, right] = pair.split('\n').map((data) => JSON.parse(data));
		if (areInRightOrder(left, right)) {
			inOrderCount += i + 1;
		}
	});
	console.log(inOrderCount);
	return inOrderCount;
};

export const solvePartTwo = (input) => {
	let packets = input
		.trim()
		.replace(/\n\s*\n/g, '\n')
		.split('\n');
	packets.push('[[2]]');
	packets.push('[[6]]');
	packets = packets
		.map((packetString) => JSON.parse(packetString))
		.sort((packet1, packet2) => (areInRightOrder(packet1, packet2) ? -1 : 1));

	const decoderKey =
		(packets.findIndex((packet) => JSON.stringify(packet) === '[[2]]') + 1) *
		(packets.findIndex((packet) => JSON.stringify(packet) === '[[6]]') + 1);

	console.log(decoderKey);
	return decoderKey;
};

function areInRightOrder(left, right) {
	if (isNumber(left) && isNumber(right)) {
		if (left !== right) return left < right;
	} else if (isNumber(left)) {
		return areInRightOrder([left], right);
	} else if (isNumber(right)) {
		return areInRightOrder(left, [right]);
	} else {
		if (left === undefined) return true;
		if (right === undefined) return false;

		for (let i = 0; i < Math.max(left.length, right.length); i++) {
			let comp = areInRightOrder(left[i], right[i], i);
			if (comp !== null) return comp;
		}
	}

	return null;
}

try {
	const data = fs.readFileSync('src/inputs/day13.txt', 'utf8');

	// await clipboardy.write(String(solvePartOne(data)));
	await clipboardy.write(String(solvePartTwo(data)));
} catch (error) {
	console.error(error);
}
