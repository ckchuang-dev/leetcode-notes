const floodFill = (
  image: number[][],
  sr: number,
  sc: number,
  color: number
): number[][] => {
  // declare result array
  const result: number[][] = structuredClone(image);
  // record original color for image[sr][sc]
  const originalColor = image[sr][sc];

  // check whether color === original color
  if (originalColor === color) {
    // return the same image array when true
    return result;
  }

  // implement a recursive function to check each adjacent pixel
  const checkPixel = (x: number, y: number) => {
    // check exclusive conditions
    if (
      x < 0 ||
      x >= image.length ||
      y < 0 ||
      y >= image[0].length ||
      result[x][y] !== originalColor
    ) {
      return;
    }

    // when current color equal to original color, modify its value
    result[x][y] = color;

    // recursively check each adjacent pixel
    checkPixel(x, y - 1); // up
    checkPixel(x, y + 1); // down
    checkPixel(x - 1, y); // left
    checkPixel(x + 1, y); // right
  };

  checkPixel(sr, sc);

  // return result
  return result;
};

export default floodFill;
