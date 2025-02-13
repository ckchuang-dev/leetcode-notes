import { MinHeap } from '@/types/Heap';

export function minOperations(nums: number[], k: number): number {
  // handle edge case
  if (nums.length < 2) {
    return -1;
  }

  // declare new nums array
  const heap = new MinHeap<number>();

  for (let num of nums) {
    heap.push(num);
  }

  let count = 0;
  // run while loop until array length smaller than h
  // check whether all new nums larger or equal to k
  while (heap.size() >= 2 && heap.peek()! < k) {
    const x = heap.pop()!;
    const y = heap.pop()!;
    const newNum = Math.min(x, y) * 2 + Math.max(x, y);

    heap.push(newNum);
    count++;
  }

  // return minimum operation count
  return heap.peek()! < k ? -1 : count;
}
