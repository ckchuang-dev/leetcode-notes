function topKFrequentSorting(nums: number[], k: number): number[] {
  const numCountMap = new Map<number, number>();
  const res: number[] = [];

  for (let num of nums) {
    numCountMap.set(num, (numCountMap.get(num) ?? 0) + 1);
  }

  const sortedMap = Array.from(numCountMap.entries()).sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < k; i++) {
    const maxSet = sortedMap.pop();

    res.push(maxSet!.[0]);
  }

  return res;
};
