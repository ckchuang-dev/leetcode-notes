# 104. 二元樹的最大深度 (Maximum Depth of Binary Tree)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/maximum-depth-of-binary-tree)
- 主題：Binary Tree
- 難度：Easy

## 題目描述

給定一個二元樹的根節點 `root`，返回其最大深度。二元樹的最大深度是從根節點到最遠 leaf node 的最長路徑上的節點數量。

**註：** leaf node 是指沒有子節點的節點。

### 範例 1

![104.jpg](<./104.%20二元樹的最大深度%20(Maximum%20Depth%20of%20Binary%20Tree)-assets/104.jpg>)

```plain
輸入：root = [3,9,20,null,null,15,7]
輸出：3
```

### 範例 2

```plain
輸入：root = [1,null,2]
輸出：2
```

### 限制條件

- 樹中節點的數量範圍為 `[0, 10^4]`
- `-100 <= Node.val <= 100`

## 問題釐清

- 輸入為 TreeNode 或 null，輸出為 number？應不需要處理不合法輸入？
- 最大深度從範例一看起來會包含 root 這層？
- 若空樹則回傳 0 即可？
- 樹的節點數可能達到一萬個，是否需考慮極度傾斜樹的狀況？

## 提出測試案例

- 能通過範例一、二
- 傳入空樹時回傳 0
- 一萬個節點的左傾樹確認不會 stack overflow

## 提出思路

因為跟深度有關，直覺用 DFS 來解比較單純，而 DFS 的實作可以有兩種方式：

- 遞迴
  - 好處：程式碼簡潔
  - 壞處：在樹過深時有可能有 stack overflow 問題
- stack 搭迴圈
  - 好處：避免 stack overflow 問題
  - 壞處：程式碼稍微複雜些

如果先以遞迴來解題的話以註解表示：

```ts
export default function maxDepth(root: TreeNode | null): number {
  // if root is null, return 0
  // declare max depth
  // recursively calculate max depth of each sub tree
  // return max depth
}
```

## 實作

結果發現遞迴版本意外單純：

```ts
export default function maxDepth(root: TreeNode | null): number {
  // if root is null, return 0
  if (root === null) {
    return 0;
  }

  // recursively calculate max depth of each sub tree
  // return max depth
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

## 撰寫測試

先來把上面的測試案例實作成單元測試確認是否通過：

```ts
describe('Maximum Depth of Binary Tree', () => {
  it('should return correct max depth - example 1', () => {
    const root = new TreeNode(
      3,
      new TreeNode(9),
      new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );
    const result = maxDepth(root);

    expect(result).toEqual(3);
  });

  it('should return correct max depth - example 2', () => {
    const root = new TreeNode(1, null, new TreeNode(2));
    const result = maxDepth(root);

    expect(result).toEqual(2);
  });

  it('should return 0 when null', () => {
    const result = maxDepth(null);

    expect(result).toEqual(0);
  });

  it('should handle a large tree', () => {
    const root = new TreeNode(1);
    let current = root;

    for (let i = 2; i <= 10000; i++) {
      current.left = new TreeNode(i);
      current = current.left;
    }

    const result = maxDepth(root);
    expect(result).toEqual(10000);
  });
});
```

試著在最後一個測試調整參數做一下壓測，發現在開 `pool: ‘threads'` 時，`10^4` 是可以正常運作的，但到 `10^5` 就 stack overflow 了，好奇來試試 stack 的解法是否可解決。

## 其他解法：stack 搭迴圈版

試試 stack 搭迴圈版，註解版本：

```ts
function maxDepthByStack(root: TreeNode | null): number {
  // if root is null, return 0
  // declare max depth
  // declare a stack with current node and current depth
  // run a while loop until stack is empty
  // pop current node and depth
  // compare depth with max depth
  // push left and right node into stack
  // return max depth
}
```

實作：

```ts
function maxDepthByStack(root: TreeNode | null): number {
  // if root is null, return 0
  if (root === null) {
    return 0;
  }

  // declare max depth
  let maxDepth = 0;

  // declare a stack with current node and current depth
  const stack: Stack[] = [
    {
      node: root,
      depth: 1
    }
  ];

  // run a while loop until stack is empty
  while (stack.length > 0) {
    // pop current node and depth
    const { node, depth } = stack.pop() as Stack;

    if (node) {
      // compare depth with max depth
      maxDepth = Math.max(maxDepth, depth);
      // push left and right node into stack
      stack.push(
        {
          node: node.left,
          depth: depth + 1
        },
        {
          node: node.right,
          depth: depth + 1
        }
      );
    }
  }

  // return max depth
  return maxDepth;
}
```

再次用 `10^5` 個節點的測試實測能正確通過，一直加節點到 `10^7` 才開始出現卡頓感。
