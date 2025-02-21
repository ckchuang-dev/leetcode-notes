# [M] 1261. 在受污染的二元樹中查找元素 (Find Elements in a Contaminated Binary Tree)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree)
- **主題**：Binary Tree, Hash Table
- **難度**：Medium (Rating: 1439)
- **Daily**: 2025-02-21

## 題目描述

給定一棵受污染的二元樹，該樹遵循以下規則：

- `root.val == 0`
- 對於任意節點 `treeNode`：
  - 若 `treeNode.val = x` 且 `treeNode.left != null`，則 `treeNode.left.val = 2 * x + 1`
  - 若 `treeNode.val = x` 且 `treeNode.right != null`，則 `treeNode.right.val = 2 * x + 2`

現在這棵二元樹已經受污染，所有 `treeNode.val` 的值都變為 `-1`。

請實作 `FindElements` 類別：

- `FindElements(TreeNode* root)`：用受污染的二元樹初始化物件並恢復其原始值。
- `bool find(int target)`：如果 `target` 存在於恢復後的二元樹中，則返回 `true`，否則返回 `false`。

### 範例 1

以下範例二元樹示意圖參考原題目連結。

```plain
輸入:
["FindElements","find","find"]
[[[-1,null,-1]],[1],[2]]

輸出:
[null,false,true]
```

**解釋：**

```plain
FindElements findElements = new FindElements([-1,null,-1]);
findElements.find(1); // 返回 False
findElements.find(2); // 返回 True
```

### 範例 2

```plain
輸入:
["FindElements","find","find","find"]
[[[-1,-1,-1,-1,-1]],[1],[3],[5]]

輸出:
[null,true,true,false]
```

**解釋：**

```plain
FindElements findElements = new FindElements([-1,-1,-1,-1,-1]);
findElements.find(1); // 返回 True
findElements.find(3); // 返回 True
findElements.find(5); // 返回 False
```

### 範例 3

```plain
輸入:
["FindElements","find","find","find","find"]
[[[-1,null,-1,-1,null,-1]],[2],[3],[4],[5]]

輸出:
[null,true,false,false,true]
```

**解釋：**

```plain
FindElements findElements = new FindElements([-1,null,-1,-1,null,-1]);
findElements.find(2); // 返回 True
findElements.find(3); // 返回 False
findElements.find(4); // 返回 False
findElements.find(5); // 返回 True
```

## 限制條件

- `TreeNode.val == -1`
- 二元樹的高度不超過 `20`
- 節點總數在 `[1, 10^4]` 範圍內
- `find()` 的總調用次數在 `[1, 10^4]` 範圍內
- `0 <= target <= 10^6`

---

## 解題思路

理解題意是想要把一顆全部值都是 `-1` 的 binary tree，在初始化後去依照規則填值，因為有限制數高在合理範圍內，直覺認為是可以用遞迴的方式來建立 recover 後的樹，而 `find` 的部份如果先不追求複雜度最佳解，可以另外用一個 number Set 來存建立過程中的值，然後用 `has` 確認目標值是否在陣列中即可。

## 實作

```ts
class FindElements {
  private tree: TreeNode | null;
  private seen: Set<number>;

  constructor(root: TreeNode | null) {
    this.seen = new Set();
    this.tree = this.recoverTree(root, 0);
  }

  private recoverTree(root: TreeNode | null, val: number): TreeNode | null {
    if (root === null) return null;

    const finalTree = new TreeNode();

    finalTree.val = val;
    this.seen.add(val);
    finalTree.left = this.recoverTree(root.left, 2 * val + 1);
    finalTree.right = this.recoverTree(root.right, 2 * val + 2);

    return finalTree;
  }

  find(target: number): boolean {
    return this.seen.has(target);
  }
}
```

這裡有個稍微需要想一下的地方是每個左子樹、右子樹的值該怎麼指定，想到比較直覺的做法是用另一個參數去傳。

複雜度分析，如果樹高為 `h`，節點數為 `n`：

- `recoverTree`
  - 時間複雜度：
    - 每個節點都只被處理一次，所以應為 `O(n)`
  - 空間複雜度：`O(n+h)`
    - 遞迴深度為 `O(h)`
    - tree 的空間為 `O(n)`
- `find`
  - 時間複雜度：因為是用 Set 來查值，確認是否存在為 `O(1)`
  - 空間複雜度：另外用一個長度 n 的 Set 存，`O(n)`

## 其他解法

看了下官方教學，上面遞迴的做法是 DFS，而其實也可以在建立 tree 時利用 queue 的方式來做 BFS：

```ts
class FindElementsBFS {
  private tree: TreeNode | null;
  private seen: Set<number>;

  constructor(root: TreeNode | null) {
    this.seen = new Set();
    this.tree = this.recoverTree(root, 0);
  }

  private recoverTree(root: TreeNode | null, val: number): TreeNode | null {
    if (root === null) return null;

    const queue = [root];
    root.val = 0;

    while (queue.length > 0) {
      const { left, right, val } = queue.shift()!;

      if (left) {
        left.val = 2 * val + 1;
        queue.push(left);
      }
      if (right) {
        right.val = 2 * val + 2;
        queue.push(right);
      }
    }

    return root;
  }

  find(target: number): boolean {
    return this.seen.has(target);
  }
}
```

複雜度上雖然與 DFS 的做法會是一樣的，但可以避免當樹高過深時會有 stack overflow 的問題。
