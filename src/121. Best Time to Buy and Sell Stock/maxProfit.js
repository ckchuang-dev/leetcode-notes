/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (prices) => {
  let min = Number.MAX_SAFE_INTEGER;
  let max = 0;

  prices.forEach((p) => {
    min = Math.min(min, p);
    max = Math.max(max, p - min);
  });

  return max;
};

export default maxProfit;