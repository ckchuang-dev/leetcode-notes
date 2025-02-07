function queryResults(limit: number, queries: number[][]): number[] {
  // declare hash map (key: index, value: color)
  const ballColors = new Map<number, number>();
  // declare hash map (key: color, value: count)
  const colorCount = new Map<number, number>();
  const res: number[] = [];

  for (let [index, newColor] of queries) {
    // handle old color
    if (ballColors.has(index)) {
      const oldColor = ballColors.get(index)!;

      // If identical, early return
      if (oldColor === newColor) {
        res.push(colorCount.size);
        continue;
      }

      // reduce old color count
      colorCount.set(oldColor, colorCount.get(oldColor)! - 1);

      // remove old color key if zero
      if (colorCount.get(oldColor) === 0) {
        colorCount.delete(oldColor);
      }
    }

    // handle new color record
    ballColors.set(index, newColor);
    colorCount.set(newColor, (colorCount.get(newColor) || 0) + 1);

    res.push(colorCount.size);
  }

  // return result
  return res;
}
