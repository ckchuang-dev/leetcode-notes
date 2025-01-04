# 110. 平衡二元樹 (Balanced Binary Tree)

## **題目**

- [LeetCode 連結](https://leetcode.com/problems/balanced-binary-tree)
- 主題：Binary Tree
- 難度：Easy

## 題目描述

給定一個二元樹，判斷它是否是 **高度平衡** 的二元樹。

**高度平衡** 的二元樹定義為：\
一個二元樹中，每個節點的兩個子樹的深度相差不超過 `1`。

### 範例

#### 範例 1：

![bbt-1.jpg](./bbt-1.jpg)

```
輸入：root = [3,9,20,null,null,15,7]
輸出：true
```

#### 範例 2：

![bbt-2.jpg](./bbt-2.jpg)

```
輸入：root = [1,2,2,3,3,null,null,4,4]
輸出：false
```

#### 範例 3：

```
輸入：root = []
輸出：true
```

### 限制條件

- 樹中節點的數量範圍為 `[0, 5000]`
- 節點的值範圍為 `-10^4 <= Node.val <= 10^4`

## 問題釐清

- 從範例一看起來子樹高度差為 2 - 1，所以為 true；範例二看起來子樹高度差是 3 - 1，所以為 false。這樣理解題意是正確的？
- 高度平衡的意思是每個子樹的高度差都需要在 1 以內？以範例二為例的話就是要去檢查左邊的 2、3 這些子節點

## **提出測試案例**

- 能通過範例一、範例二
- edge case
  - 空樹為 true
  - 設計一個第一層平衡，但第二層不平衡的測資

先撰寫測試如下：

```ts
describe('Balanced Binary Tree', () => {
  it('should return true for a balanced binary tree - example 1', () => {
    const root = new TreeNode(
      3,
      new TreeNode(9),
      new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );
    const result = isBalanced(root);

    expect(result).toBe(true);
  });

  it('should return false for an unbalanced binary tree - example 2', () => {
    const root = new TreeNode(
      1,
      new TreeNode(
        2,
        new TreeNode(3, new TreeNode(4), new TreeNode(4)),
        new TreeNode(3)
      ),
      new TreeNode(2)
    );
    const result = isBalanced(root);

    expect(result).toBe(false);
  });

  it('should return true for an empty tree - example 3', () => {
    const root: TreeNode | null = null;
    const result = isBalanced(root);

    expect(result).toBe(true);
  });

  it('should return false for a tree where the first layer is balanced but the second layer is not', () => {
    // 範例結構：
    //          1
    //         / \
    //        2   2
    //       /    / \
    //      3    4   5
    //     / \
    //    4   4
    const root = new TreeNode(
      1,
      new TreeNode(2, new TreeNode(3, new TreeNode(4), new TreeNode(4))),
      new TreeNode(2, new TreeNode(4), new TreeNode(5))
    );
    const result = isBalanced(root);

    expect(result).toBe(false);
  });
});
```

## 提出思路

- 用遞迴的方式實作一個算樹高的函式 `getTreeHeight`：
  - 輸入 TreeNode
  - 判斷 TreeNode 是 null 時，則返回 0
  - 否則遞迴去算左右子樹高
- `isBalanced` 主函式
  - 若輸入 TreeNode 為空，則返回 true
  - 否則引用 `getTreeHeight` 分別計算左右子樹高度差
  - 確認高度差是否小於 1，並且遞迴計算左右子樹也平衡

以註解表示：

```ts
// implement a getTreeHeight function
// input a tree node
// if tree node null, return 0
// or recursively calculate max left and right tree height

const isBalanced = (root: TreeNode | null): boolean => {
  // if root is null, return true
  // or calculate current left and right tree height
  // recursively check deeper left and right tree are balanced or note
};
```

## 實作

```ts
// implement a getTreeHeight function
const getTreeHeight = (root: TreeNode | null): number => {
  // if tree node null, return 0
  if (!root) {
    return 0;
  }

  // or recursively calculate max left and right tree height
  return 1 + Math.max(getTreeHeight(root.left), getTreeHeight(root.right));
};

const isBalanced = (root: TreeNode | null): boolean => {
  // if root is null, return true
  if (!root) {
    return true;
  }
  // or calculate current left and right tree height
  const leftTreeHeight = getTreeHeight(root.left);
  const rightTreeHeight = getTreeHeight(root.right);

  // recursively check deeper left and right tree are balanced or note
  return (
    Math.abs(leftTreeHeight - rightTreeHeight) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
};
```

這裡可以試著把 `isBalanced` 中的遞迴拿掉確認第四個測資通過與否來確認效果。
