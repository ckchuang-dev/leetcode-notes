import { maxArea } from './maxArea';

describe('Container With Most Water', () => {
  test.each([
    {
      input: [1, 8, 6, 2, 5, 4, 8, 3, 7],
      expected: 49
    },
    {
      input: [1, 1],
      expected: 1
    },
    {
      input: [],
      expected: 0
    }
  ])('should return $expected when input is $input', ({ input, expected }) => {
    expect(maxArea(input)).toBe(expected);
  });
});
