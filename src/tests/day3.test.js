import { solvePartOne, solvePartTwo } from '../day3';

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

describe('Test day 3 solution', () => {
	test('test part 1', () => {
		expect(solvePartOne(input)).toBe(157);
	});
	test('test part 2', () => {
		expect(solvePartTwo(input)).toBe(70);
	});
});
