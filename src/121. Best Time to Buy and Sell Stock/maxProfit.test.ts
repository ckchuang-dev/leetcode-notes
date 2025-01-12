import { maxProfit } from './maxProfit';

describe('Best Time to Buy and Sell Stock', () => {
  test.each([
    // [input, expected output]
    [[7, 1, 5, 3, 6, 4], 5],
    [[7, 6, 4, 3, 1], 0],
    [[1], 0],
    [[100, 1, 2, 3, 4, 5], 4]
  ])('maxProfit(%j) should return %i', (prices, expected) => {
    expect(maxProfit(prices)).toBe(expected);
  });

  test('handles large input of size 10^5', () => {
    // 產生 [1, 2, 3, ..., 100000]
    const prices = Array.from({ length: 10 ** 5 }, (_, i) => i + 1);
    // 最低點買（1），最高點賣（100000），最大獲利應為 99999
    const expected = 10 ** 5 - 1;

    expect(maxProfit(prices)).toBe(expected);
  });
});
