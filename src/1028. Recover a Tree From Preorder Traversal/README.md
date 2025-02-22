# [H] 1028. 從先序遍歷還原二叉樹 (Recover a Tree From Preorder Traversal)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/recover-a-tree-from-preorder-traversal/)
- **主題**：Binary Tree, DFS, String
- **難度**：Hard (Rating: 1797)
- **Daily**: 2025-02-22

## 題目描述

我們對一棵二叉樹的根節點執行**先序深度優先搜索 (Preorder DFS)**。

在遍歷過程中，每個節點的輸出格式如下：

- 以 `D` 個 `-`（短橫線）表示該節點的深度 `D`
- 接著輸出該節點的值

若某個節點的深度為 `D`，則其**直接子節點**的深度一定為 `D + 1`。 根節點的深度為 `0`。

此外，**若節點只有一個子節點，則該子節點必定是左子節點**。

根據這樣的遍歷輸出，請**還原這棵樹並返回其根節點**。

## 範例

### 範例 1

```plain
輸入：
traversal = "1-2--3--4-5--6--7"

輸出：
[1,2,5,3,4,6,7]

解釋：
還原出的二叉樹如下：
        1
       / \
      2   5
     / \  / \
    3   4 6  7
```

---

### 範例 2

```plain
輸入：
traversal = "1-2--3---4-5--6---7"

輸出：
[1,2,5,3,null,6,null,4,null,7]

解釋：
還原出的二叉樹如下：
        1
       / \
      2   5
     /   /
    3   6
   /     \
  4       7
```

---

### 範例 3

```plain
輸入：
traversal = "1-401--349---90--88"

輸出：
[1,401,null,349,88,90]

解釋：
還原出的二叉樹如下：

        1
       /
      401
     /   \
    349   88
   /
  90
```

---

## 限制條件

- 樹的節點數量在 `[1, 1000]` 範圍內
- `1 <= Node.val <= 10^9`

---

## 解題思路

一開始看到 DFS 的遍歷，原本直覺是想用遞迴做，但寫到一半有點卡住，後來參考了下官方解答中有個使用 stack 來存當前深度的做法蠻簡潔的，以下附上參考的筆記：

```ts
function recoverFromPreorder(traversal: string): TreeNode | null {
  if (traversal === '') return null;

  // 宣告一個 stack 來方便在 DFS 過程中找到當前父節點
  const stack: TreeNode[] = [];
  let index = 0;

  while (index < traversal.length) {
    // 定位當前深度
    let depth = 0;

    while (traversal[index] === '-') {
      depth++;
      index++;
    }

    // 找到目前要塞入的新值
    let numberStr = '';

    while (index < traversal.length && traversal[index] !== '-') {
      numberStr += traversal[index];
      index++;
    }

    let node = new TreeNode(parseInt(numberStr));

    // 根據當前深度調整到與 stack 一致，為了找到塞入的父節點
    while (stack.length > depth) {
      stack.pop();
    }

    // 根據當前父節點來確認左右節點是否能塞新值
    if (stack.length > 0) {
      const parent = stack[stack.length - 1];

      if (!parent.left) {
        parent.left = node;
      } else {
        parent.right = node;
      }
    }

    stack.push(node);
  }

  return stack[0];
}
```

複雜度如果 `n` 代表輸入字串長度：

- 時間複雜度：在一個迴圈內完成所以為 `O(n)`
- 空間複雜度：主要會根據樹高的 h 來決定另外宣告的 stack 的空間複雜度，當今天最差狀況下 h 接近於 n，也就是 skewed tree 的狀況時，就會接近 `O(n)`
