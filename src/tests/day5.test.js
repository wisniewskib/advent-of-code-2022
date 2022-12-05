import { solvePartOne, solvePartTwo } from '../day5';

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

describe('Test day 5 solution', () => {
	test('test part 1', () => {
		expect(solvePartOne(input)).toBe('CMZ');
	});
	test('test part 2', () => {
		expect(solvePartTwo(input)).toBe('MCD');
	});
});
