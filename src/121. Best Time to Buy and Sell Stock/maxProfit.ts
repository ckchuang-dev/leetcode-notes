export function maxProfit(prices: number[]): number {
  // declare min price
  let min = Number.MAX_SAFE_INTEGER;
  // declare max profit value
  let max = 0;

  // run a for loop for prices to calculate max profit
  for (let price of prices) {
    min = Math.min(min, price);
    max = Math.max(max, price - min);
  }

  // return max profit
  return max;
}
