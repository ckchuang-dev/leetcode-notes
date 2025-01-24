import { mergeInterval } from './mergeInterval';

describe('Merge Interval', () => {
  test.each([
    [
      [
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18]
      ],
      [
        [1, 6],
        [8, 10],
        [15, 18]
      ]
    ],
    [
      [
        [1, 4],
        [4, 5]
      ],
      [[1, 5]]
    ],
    [[], []],
    [
      [
        [8, 17],
        [15, 18],
        [1, 3],
        [2, 6]
      ],
      [
        [1, 6],
        [8, 18]
      ]
    ],
    [
      [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      [[0, 0]]
    ],
    [
      Array.from({ length: 10000 }, (_, i) => [i, i + 1]),
      Array.from({ length: 1 }, () => [0, 10000])
    ]
  ])('intervals %s as input should return %s', (intervals, expected) => {
    const result = mergeInterval(intervals);

    expect(result).toEqual(expected);
    expect(result).not.toBe(intervals);
  });
});
