# 102. Binary Tree Level Order Traversal

- [Question link](https://leetcode.com/problems/binary-tree-level-order-traversal)
- Topic: Binary Tree
- Medium

## 題目描述

給定一個二元樹的根節點 `root`，返回其節點值的層次遍歷結果（即從左到右，逐層進行遍歷）。

### 範例 1

![102.jpg](./102.jpg)

```plain
輸入: root = [3,9,20,null,null,15,7]
輸出: [[3],[9,20],[15,7]]
```

### 範例 2

```plain
輸入: root = [1]
輸出: [[1]]
```

### 範例 3

```plain
輸入: root = []
輸出: []
```

### 限制條件

1. 節點數量範圍為 `[0, 2000]`。
2. 節點值的範圍為 `-1000 <= Node.val <= 1000`。

## 問題釐清

- 理解題目的意思是希望逐層由左至右將節點的值作為一個二維陣列輸出對吧？
- 輸出的二維陣列中，只需要回傳該節點的 value 即可？
- 若該層的節點不存在，從範例一的輸出看起來是不需要補 null 的沒錯吧？

## **提出測試案例**

- 能通過三個範例的測試
- 不確定節點數量超出範圍的邊界條件是否需要對實作函式來做壓測

## 提出思路

因為是 level order 的遍歷，直覺可以用類似 BFS 的演算法來找值，整個程式邏輯會像這樣：

- 當 root 為 null，則回傳空陣列
- 宣告輸出陣列
- 實作 BFS
   - 宣告一個 queue 來紀錄每一層的節點，初始化塞入 root 的節點
   - 用 while loop 直到 queue 為空
      - 用一個 for loop 來對當前 queue 的數量做 dequeue 取值
      - 將每個節點的左右節點在推入 queue 中
- 回傳結果陣列

以註解表示：

```ts
function levelOrder(root: TreeNode | null): number[][] {
  // when root equal to null, return empty array
  // declare result array

  // apply BFS to traverse tree
    // declare a queue to record each level
    // use a while loop to traverse each level (loop until queue is empty)
      // use a for loop with nodes count for current level
      // dequeue current node's value
      // enqueue left and right node for current node

  // return result
}
```

## 實作

```ts
function levelOrder(root: TreeNode | null): number[][] {
  // when root equal to null, return empty array
  if (root === null) {
    return [];
  }

  // declare result array
  const result: number[][] = [];

  // apply BFS to traverse tree
  // declare a queue to record each level
  const queue: TreeNode[] = [root];

  // use a while loop to traverse each level (loop until queue is empty)
  while (queue.length > 0) {
    const nodeLength = queue.length;
    const values: number[] = [];

    // use a for loop with nodes count for current level
    for (let i = 0; i < nodeLength; i++) {
      // dequeue current node's value
      const currentNode = queue.pop();

      if (currentNode) {
        values.push(currentNode.val);

        // enqueue left and right node for current node
        currentNode.left && queue.unshift(currentNode.left);
        currentNode.right && queue.unshift(currentNode.right);
      }
    }

    result.push(values);
  }

  // return result
  return result;
}
```

最後補上測試：

```ts
describe('Binary Tree Level Order Traversal', () => {
  it('should return correct level order - example 1', () => {
    const root = new TreeNode(
      3,
      new TreeNode(9),
      new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );
    const result = levelOrder(root);

    expect(result).toEqual([[3], [9, 20], [15, 7]]);
  });

  it('should return correct level order - example 2', () => {
    const root = new TreeNode(1);
    const result = levelOrder(root);

    expect(result).toEqual([[1]]);
  });

  it('should return empty array when null - example 3', () => {
    const result = levelOrder(null);

    expect(result).toEqual([]);
  });

  it('should handle a large tree', () => {
    const root = new TreeNode(1);
    let current = root;

    for (let i = 2; i <= 10000; i++) {
      current.right = new TreeNode(i);
      current = current.right;
    }

    const result = levelOrder(root);
    expect(result.length).toEqual(10000);
    expect(result[9999]).toEqual([10000]);
  });
});
```