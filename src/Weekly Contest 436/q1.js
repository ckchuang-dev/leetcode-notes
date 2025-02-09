/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var sortMatrix = function (grid) {
  const n = grid.length;
  const diagonals = new Map();

  // collect all diagonals
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      const key = x - y;
      if (!diagonals.has(key)) {
        diagonals.set(key, []);
      }
      diagonals.get(key).push(grid[x][y]);
    }
  }

  // sort each diagonals
  for (let [k, v] of diagonals) {
    if (k >= 0) {
      v.sort((a, b) => b - a);
    } else {
      v.sort((a, b) => a - b);
    }
  }

  // refill grid with diagonals
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      const key = x - y;
      grid[x][y] = diagonals.get(key).shift();
    }
  }

  return grid;
};
