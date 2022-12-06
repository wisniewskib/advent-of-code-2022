import { solvePartOne, solvePartTwo } from '../day6';

const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
const input2 = `nppdvjthqldpwncqszvftbrmjlhg`;
describe('Test day 6 solution', () => {
	test('test part 1', () => {
		expect(solvePartOne(input)).toBe(7);
		expect(solvePartOne(input2)).toBe(6);
	});
	test('test part 2', () => {
		expect(solvePartTwo(input)).toBe(19);
		expect(solvePartTwo(input2)).toBe(23);
	});
});
