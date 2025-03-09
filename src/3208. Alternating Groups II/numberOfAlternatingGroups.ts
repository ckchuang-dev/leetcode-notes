function numberOfAlternatingGroups(colors: number[], k: number): number {
  // 擴展陣列以處理環狀問題
  const linearColors = [...colors];

  for (let i = 0; i < k - 1; i++) {
    linearColors.push(colors[i]);
  }

  const len = linearColors.length;
  let count = 0;

  // Sliding Window 的初始左右邊界
  let left = 0;
  let right = 1;

  while (right < len) {
    // 如果當前顏色與前一個顏色相同，則移動初始窗口
    if (linearColors[right] === linearColors[right - 1]) {
      left = right;
      right += 1;
      continue;
    }

    right += 1;

    // 當窗口大小小於 k，則跳過此次迴圈
    if (right - left < k) {
      continue;
    }

    // 當窗口大小 >= k，則找到一個有效的交替群組
    count += 1;

    // 縮小窗口的左邊界，以尋找更多可能的組合
    left += 1;
  }

  return count;
}
