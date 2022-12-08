import { solvePartOne, solvePartTwo } from '../day8';

const input = `30373
25512
65332
33549
35390`;
describe('Test day 8 solution', () => {
	test('test part 1', () => {
		expect(solvePartOne(input)).toBe(21);
	});
});
