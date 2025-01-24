import { insertInterval } from './insertInterval';

describe('Insert Interval', () => {
  test.each([
    [[[1, 3], [6, 9]], [2, 5], [[1, 5], [6, 9]]],
    [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8], [[1, 2], [3, 10], [12, 16]]],
    [[], [4, 8], [[4, 8]]],
    [[[1, 3], [6, 9]], [3, 6], [[1, 9]]],
    [[[1, 3], [6, 9]], [12, 15], [[1, 3], [6, 9], [12, 15]]],
  ])(
    'insertInterval(%s, %s) should return %s',
    (intervals, newInterval, expected) => {
      const result = insertInterval(intervals, newInterval);

      expect(result).toEqual(expected);
      expect(result).not.toBe(intervals);
    }
  );
});
