import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

const calculateManhattanDistance = (x1, y1, x2, y2) => {
	return (
		Math.max(x1, x2) - Math.min(x1, x2) + (Math.max(y1, y2) - Math.min(y1, y2))
	);
};

export const solvePartOne = (input) => {
	const sensors = [],
		beacons = new Set();
	let highestRange = 0,
		leftMost = 0,
		rightMost = 0;
	input.split('\n').forEach((line) => {
		const [sensor, beacon] = line.split(':');
		const [sensorX, sensorY] = sensor.match(/-?\d+/g);
		const [beaconX, beaconY] = beacon.match(/-?\d+/g);
		const manhattanDistance = calculateManhattanDistance(
			sensorX,
			sensorY,
			beaconX,
			beaconY
		);
		highestRange = Math.max(highestRange, manhattanDistance);
		leftMost = Math.min(leftMost, sensorX);
		rightMost = Math.max(rightMost, sensorX);
		sensors.push({
			x: sensorX,
			y: sensorY,
			range: manhattanDistance,
		});
		beacons.add(`${beaconX},${beaconY}`);
	});

	const xStart = leftMost - highestRange,
		xEnd = rightMost + highestRange;

	const positions = new Set();
	const Y = 10;
	console.log(leftMost, rightMost);
	sensors.forEach((sensor) => {
		const { x, y, range } = sensor;
		if (calculateManhattanDistance(x, y, x, Y) <= range) {
			for (let i = xStart; i <= xEnd; i++) {
				const cords = `${i},${Y}`;
				if (
					!positions.has(cords) &&
					calculateManhattanDistance(x, y, i, Y) <= range &&
					!beacons.has(cords)
				) {
					positions.add(cords);
				}
			}
		}
	});
	console.log(positions);
	console.log(positions.size);
};

export const solvePartTwo = (input) => {};

const init = async () => {
	try {
		const data = fs.readFileSync('src/inputs/day15test.txt', 'utf8');
		await clipboardy.write(String(solvePartOne(data)));
		// await clipboardy.write(String(solvePartTwo(data)));
	} catch (error) {
		console.error(error);
	}
};

export default init();
