export function updateMatrix(mat: number[][]): number[][] {
  const width = mat.length;
  const height = mat[0].length;

  // 宣告結果矩陣，使用 Infinity 順便確認沒有被造訪過
  const res = Array.from({ length: width }, () => Array(height).fill(Infinity));

  // 使用 queue 紀錄下一次要執行 BFS 擴展的座標
  const queue: [number, number][] = [];

  // 將所有值為 0 的座標放入 queue，並更新其結果陣列中的距離為 0
  for (let m = 0; m < width; m++) {
    for (let n = 0; n < height; n++) {
      if (mat[m][n] === 0) {
        res[m][n] = 0;
        queue.push([m, n]);
      }
    }
  }

  // 方向向量 (上, 下, 左, 右)
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  // 當 queue 不為空，跑 while 迴圈執行 BFS
  while (queue.length > 0) {
    const [x, y] = queue.shift()!;

    // 對當前座標 4 個方向去紀錄其與 0 的距離
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      // 確保每個方向的座標在邊界內
      if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
        // 確認新座標還沒被訪問過，因此一開始才要設 Infinity
        if (res[newX][newY] > res[x][y] + 1) {
          res[newX][newY] = res[x][y] + 1;

          // 把新座標加入 queue，進一步往外擴展並累加
          queue.push([newX, newY]);
        }
      }
    }
  }

  return res;
}
