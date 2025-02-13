import { MinHeap } from '@/types/Heap';

function makePrefSumNonNegative(nums: number[]): number {
  let operationCount = 0;
  let prefixSum = 0;
  const heap = new MinHeap<number>();

  for (let num of nums) {
    if (num < 0) {
      heap.push(num);
    }

    // accumulate each num
    prefixSum += num;

    if (prefixSum < 0 && heap.size() > 0) {
      // subtract min value
      prefixSum -= heap.pop()!;
      operationCount++;
    }
  }

  return operationCount;
}
