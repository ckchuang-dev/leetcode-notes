export function insertInterval(
  intervals: number[][],
  newInterval: number[]
): number[][] {
  // declare the left and right intervals
  const left: number[][] = [];
  const right: number[][] = [];
  let [start, end] = newInterval;

  // run a for loop for intervals to compare bound and do merging
  for (let interval of intervals) {
    const [currentStart, currentEnd] = interval;

    if (start > currentEnd) {
      left.push(interval);
    } else if (end < currentStart) {
      right.push(interval);
    } else {
      start = Math.min(start, currentStart);
      end = Math.max(end, currentEnd);
    }
  }

  // return merged intervals
  return [...left, [start, end], ...right];
}
