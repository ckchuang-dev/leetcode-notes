function minimumRecolors(blocks: string, k: number): number {
  // apply a sliding window with size k
  // calculate current min operations by current window
  let currentOperations = blocks
    .slice(0, k)
    .split('')
    .reduce((sum, char) => sum + (char === 'W' ? 1 : 0), 0);
  let minOperations = currentOperations;

  // run a loop to move window and get min operations
  for (let i = k; i < blocks.length; i++) {
    if (blocks[i - k] === 'W') {
      currentOperations--;
    }
    if (blocks[i] === 'W') {
      currentOperations++;
    }
    minOperations = Math.min(minOperations, currentOperations);
  }

  // return min ops.
  return minOperations;
}
