import floodFill from './floodFill';

describe('floodFill', () => {
  test('Example 1', () => {
    const image = [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1]
    ];
    const sr = 1;
    const sc = 1;
    const color = 2;
    const expected = [
      [2, 2, 2],
      [2, 2, 0],
      [2, 0, 1]
    ];
    expect(floodFill(image, sr, sc, color)).toEqual(expected);
  });

  test('Example 2: No changes when target color equals starting pixel color', () => {
    const image = [
      [0, 0, 0],
      [0, 0, 0]
    ];
    const sr = 0;
    const sc = 0;
    const color = 0;
    const expected = [
      [0, 0, 0],
      [0, 0, 0]
    ];
    expect(floodFill(image, sr, sc, color)).toEqual(expected);
  });

  test('Edge case: 50x50 matrix', () => {
    const image = Array.from({ length: 50 }, () => Array(50).fill(1));
    const sr = 25;
    const sc = 25;
    const color = 2;
    const expected = Array.from({ length: 50 }, () => Array(50).fill(2));
    expect(floodFill(image, sr, sc, color)).toEqual(expected);
  });

  test('Edge case: 1x1 matrix', () => {
    const image = [[1]];
    const sr = 0;
    const sc = 0;
    const color = 2;
    const expected = [[2]];
    expect(floodFill(image, sr, sc, color)).toEqual(expected);
  });

  test('Non-contiguous regions', () => {
    const image = [
      [1, 1, 0],
      [1, 0, 0],
      [1, 1, 1]
    ];
    const sr = 0;
    const sc = 0;
    const color = 2;
    const expected = [
      [2, 2, 0],
      [2, 0, 0],
      [2, 2, 2]
    ];
    expect(floodFill(image, sr, sc, color)).toEqual(expected);
  });
});
