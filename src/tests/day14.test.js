import { solvePartOne, solvePartTwo } from '../day14';
import fs from 'fs';

const input = fs.readFileSync('src/inputs/day14.txt', 'utf8');
describe('Test day 14 solution', () => {
	test('test part 1', () => {
		expect(solvePartOne()).toBe(757);
	});
	test('test part 2', () => {
		expect(solvePartTwo()).toBe(24943);
	});
});
