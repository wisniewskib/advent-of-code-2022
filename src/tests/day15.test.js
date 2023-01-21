import { solvePartOne, solvePartTwo } from '../day15';
import fs from 'fs';

const input = fs.readFileSync('src/inputs/day15test.txt', 'utf8');
describe('Test day 15 solution', () => {
	test('test part 1', () => {
		expect(solvePartOne()).toBe(26);
	});
	test('test part 2', () => {
		// expect(solvePartTwo()).toBe();
	});
});
