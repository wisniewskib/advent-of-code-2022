import { solvePartOne, solvePartTwo } from '../day2';

const input = `A Y
B X
C Z
A Y
B X
C Z`;

describe('Test day 1 solution', () => {
	test('test part 1', () => {
		expect(solvePartOne(input)).toBe(30);
	});
	test('test part 2', () => {
		expect(solvePartTwo(input)).toBe(24);
	});
});
