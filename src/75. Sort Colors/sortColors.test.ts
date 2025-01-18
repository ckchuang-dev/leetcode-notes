import { sortColors, sortColorsThreePointers } from './sortColors';

const testCases = [
  [
    [2, 0, 2, 1, 1, 0],
    [0, 0, 1, 1, 2, 2]
  ],
  [
    [2, 0, 1],
    [0, 1, 2]
  ],
  [[1], [1]],
  [
    [2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2]
  ],
  [
    Array(100).fill(2).concat(Array(100).fill(1)).concat(Array(100).fill(0)),
    Array(100).fill(0).concat(Array(100).fill(1)).concat(Array(100).fill(2))
  ]
];

describe('Sort Colors', () => {
  test.each(testCases)('should sort %s to %s - two loop', (input, expected) => {
    sortColors(input);
    expect(input).toEqual(expected);
  });

  test.each(testCases)(
    'should sort %s to %s - three pointers',
    (input, expected) => {
      sortColorsThreePointers(input);
      expect(input).toEqual(expected);
    }
  );
});
