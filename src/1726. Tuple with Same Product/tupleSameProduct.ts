export function tupleSameProduct(nums: number[]): number {
  // handle edge cases
  if (nums.length < 4) {
    return 0;
  }
  // declare hash map
  const hashMap = new Map<number, number[][]>();
  let tupleCount = 0;

  // two-level loop to filled up hash map
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const key = nums[i] * nums[j];
      const target = hashMap.get(key) || [];

      target.push([i, j]);
      hashMap.set(key, target);
    }
  }

  // one loop for hash map keys to find tuples num
  for (let [_, sets] of hashMap) {
    const len = sets.length;

    // 解的組數大於一組，組合數為 (n - 1) + ... + 2 + 1，算出後再乘於 8
    tupleCount += len > 1 ? ((len * (len - 1)) / 2) * 8 : 0;
  }
  // return result
  return tupleCount;
}

// 嘗試改善的寫法
export function tupleSameProductBetter(nums: number[]): number {
  // edge cases
  if (nums.length < 4) {
    return 0;
  }

  const productCount = new Map<number, number>();
  let tupleCount = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const product = nums[i] * nums[j];
      const count = productCount.get(product) || 0;

      // 若該乘積已經出現過 count 次，則代表有 count 個不同的數對
      // 可與當前數對 (nums[i], nums[j]) 配對成 8 個有效元組
      tupleCount += count * 8;

      // 更新該乘積的出現次數
      productCount.set(product, count + 1);
    }
  }

  return tupleCount;
}
