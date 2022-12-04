import { solvePartOne, solvePartTwo } from '../day4';

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

describe('Test day 4 solution', () => {
	test('test part 1', () => {
		expect(solvePartOne(input)).toBe(2);
	});
	test('test part 2', () => {
		expect(solvePartTwo(input)).toBe(4);
	});
});
