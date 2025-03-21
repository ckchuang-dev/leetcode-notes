# \[M\] 36. Valid Sudoku

## 題目

- [LeetCode 連結](https://leetcode.com/problems/valid-sudoku)
- **主題**：Array, Hash Table, Matrix
- **難度**：Medium

## 題目描述

判斷一個 9x9 的數獨棋盤是否有效。只需要根據以下規則驗證已填入的格子是否符合規範：

1. 每一列（row）只能出現一次 1-9 的數字。
2. 每一行（column）只能出現一次 1-9 的數字。
3. 每個 3x3 子方塊內只能出現一次 1-9 的數字。

**注意**：

- 數獨棋盤可能是部分填寫的，但只要目前的狀態符合規則，就算是有效的。
- 只需驗證已填寫的格子，不需要判斷是否可解。

### 範例 1

```plain
輸入：
board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
輸出：true
```

### 範例 2

```plain
輸入：
board =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
輸出：false
說明：左上角的 3x3 區塊出現了兩個 '8'，因此無效。
```

### 限制條件

- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` 是 `'1'` 到 `'9'` 的數字或 `'.'`

## 問題釐清

- 若無限制，確認數獨矩陣一定是長度 9 嗎？
- 如果全部都是 `.`，應該也算是合法的？

## 提出思路

人工檢查是否合法的話，就是分別去看 col、row、box 是否有重複的數，直覺可以分別各用一個 hash set 來做：

- 先宣告 3 個長度為 9 的 Set 陣列
- 跑雙層迴圈得到 row index 為 `i` 與 col index 為 `j`
- 對每個數來說去檢查：
  - 若為 `.` 則略過
  - col set 或 row set 裡有找到該值，馬上回傳 false
- box 稍微麻煩一點，要去找座標對應的規則，畫圖後推導可以得到這樣的公式：
  - 求出在第幾行的 box：`r = Math.ceil((i + 1) / 3)`
  - 求出在第幾列的 box：`c = Math.ceil((j + 1) / 3)`
  - 推導公式得到 box index：`3 * (r - 1) + c - 1`
- 迴圈跑完沒重複則回傳 true

## 實作

雖然題目限制矩陣長度固定為 9，但這裡讓程式通用一點仍有計算 len：

```ts
function isValidSudoku(board: string[][]): boolean {
    const len = board.length;
    const rowSet = Array.from({ length: len }, () => new Set<string>());
    const colSet = Array.from({ length: len }, () => new Set<string>());
    const boxSet = Array.from({ length: len }, () => new Set<string>());

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            const val = board[i][j];

            if (val === '.') continue;
            if (rowSet[i].has(val) || colSet[j].has(val)) return false;

            const boxRow = Math.ceil((i + 1) / 3);
            const boxCol = Math.ceil((j + 1) / 3);
            const boxIndex = 3 * (boxRow - 1) + boxCol - 1;

            if (boxSet[boxIndex].has(val)) return false;

            rowSet[i].add(val);
            colSet[j].add(val);
            boxSet[boxIndex].add(val);
        }
    }

    return true;
};
```

## 複雜度分析

若矩陣為 `n * n`：

- 時間複雜度：`O(n^2)`，兩層迴圈確認每個數是否重複
- 空間複雜度：`O(n)`，額外使用 3 個長度 `n` 的 Set 陣列
