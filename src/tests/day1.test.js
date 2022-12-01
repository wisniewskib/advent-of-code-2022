import { solvePartOne, solvePartTwo } from '../day1';

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe('Test day 1 solution', () => {
	test('test part 1', () => {
		expect(solvePartOne(input)).toBe(24000);
	});
	test('test part 2', () => {
		expect(solvePartTwo(input)).toBe(45000);
	});
});
