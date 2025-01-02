# 733. Flood Fill

- [Question link](https://leetcode.com/problems/flood-fill)
- Topic: Graph
- Easy

## 題目描述

你被給予一個用 `m x n` 二維整數陣列 `image` 表示的圖像，其中 `image[i][j]` 代表圖像中的像素值。同時，你還會得到三個整數 `sr`、`sc` 和 `color`。你的任務是對該圖像從像素 `image[sr][sc]` 開始執行「泛洪填充」操作。

## 執行泛洪填充的步驟：

1. 從起始像素開始，將其顏色改為目標顏色 `color`。
2. 對每個與起始像素直接相鄰的像素（與起始像素共享一條邊，水平或垂直相鄰）進行相同的處理，前提是該像素的顏色與起始像素的顏色相同。
3. 重複此過程，檢查已更新像素的鄰近像素，若其顏色與起始像素的原始顏色相同，則將其顏色更新為目標顏色。
4. 當沒有更多相鄰像素符合條件（顏色與起始像素原始顏色相同）時，結束該過程。

最後，返回經過泛洪填充操作後修改過的圖像。

---

## 範例

### 範例 1：

**輸入：**
`image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2`
**輸出：**
`[[2,2,2],[2,2,0],[2,0,1]]`

![](./flood-grid.jpg)

**解釋：**
從圖像中心位置 `(sr, sc) = (1, 1)`（紅色像素）開始，所有與其顏色相同且可以通過水平或垂直連接的像素（藍色像素）都被填充為新的顏色 2。
注意，右下角的像素並未被填充為 2，因為它與起始像素並非水平或垂直相連。

---

### 範例 2：

**輸入：**
`image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0`
**輸出：**
`[[0,0,0],[0,0,0]]`

**解釋：**
起始像素的顏色已經是 0，與目標顏色相同。因此圖像未進行任何修改。

---

## 限制條件

- `m == image.length`
- `n == image[i].length`
- `1 <= m, n <= 50`
- `0 <= image[i][j], color < 216`
- `0 <= sr < m`
- `0 <= sc < n`

## 問題釐清

- 輸入的 `image` 是否不一定為方陣，也就是 `m` 不一定等於 `n`？
- 如果 `color` 與 `image[sr][sc]` 相等，因為不需改變，是否直接 return 原本的 `image` 即可？

## 提出測試案例

- 範例一： 基本測資
- 範例二： `color` 與 `image[sr][sc]` 相等，結果值應該與原 `image` 相同
- edge case：
  - 50x50 方陣
  - 1x1 方陣

## 提出思路

- 定義輸出結果陣列
- 紀錄 `image[sr][sc]` 值為 `target`
- 先檢查 `color` 與 `target` 是否相等，若是則直接返回
- 直覺可以用遞迴來解，以 `(sr, sc)` 為起點，檢查相鄰邊值是否相等，若相等則改其值為 color，並以該新值為中心點做遞迴
  - 實作一個遞迴函式，以 x, y 為輸入
  - 檢查該點的值是否與 target 相等，若是則改值並遞迴檢查相鄰邊
  - 若超出邊界或值不相等則返回

以註解表示的話會像這樣：

```ts
function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
  // declare result array
  // record original color for image[sr][sc]

  // check whether color === original color
    // return the same image array when true

  // implement a recursive function to check each adjacent pixel
    // when current color equal to original color, modify its value
    // recursively check each adjacent pixel

  // return result
};
```

## 實作

```ts
function floodFill(
  image: number[][],
  sr: number,
  sc: number,
  color: number
): number[][] {
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
    // check exclusive conditions, outside boundary and not equal to originalColor
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
}
```
