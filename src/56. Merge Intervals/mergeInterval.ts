export function mergeInterval(intervals: number[][]): number[][] {
  if (intervals.length === 0) {
    return [];
  }

  // declare result intervals
  const result: number[][] = [];

  // sorted intervals with new array
  const sortedIntervals = [...intervals].sort((a, b) => a[0] - b[0]);
  // declare current interval
  let [start, end] = sortedIntervals[0];

  // run a for loop for sorted intervals
  for (let i = 1; i < sortedIntervals.length; i++) {
    const [currentStart, currentEnd] = sortedIntervals[i];

    if (currentStart <= end) {
      start = Math.min(start, currentStart);
      end = Math.max(end, currentEnd);
    } else {
      result.push([start, end]);
      start = currentStart;
      end = currentEnd;
    }
  }

  if (result.length === 0 || start !== result[result.length - 1][0]) {
    result.push([start, end]);
  }

  // return result
  return result;
}
