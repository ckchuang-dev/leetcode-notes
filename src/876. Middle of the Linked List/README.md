# [E] 876. 鏈結串列的中間節點 (Middle of the Linked List)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/middle-of-the-linked-list)
- **主題**：Linked List
- **難度**：Easy

## 題目描述

給定一個單向鏈結串列的 `head`，請返回該鏈結串列的**中間節點**。如果有兩個中間節點，則返回**第二個中間節點**。

### 範例 1

![876-1.jpg](../../../../../../Downloads/Heptabase-Export-2025-01-29T06-32-41-598Z/876-1.jpg)

```
輸入：head = [1,2,3,4,5]
輸出：[3,4,5]
說明：鏈結串列的中間節點是節點 3。
```

### 範例 2

![876-2.jpg](../../../../../../Downloads/Heptabase-Export-2025-01-29T06-32-41-598Z/876-2.jpg)

```
輸入：head = [1,2,3,4,5,6]
輸出：[4,5,6]
說明：鏈結串列有兩個中間節點，值為 3 和 4，根據規則返回第二個中間節點 4。
```

### 限制條件

- 鏈結串列的節點數量範圍為 `[1, 100]`。
- `1 <= Node.val <= 100`。

## 問題釐清

- 確認如果節點數是偶數，則返回中間的第二個節點
- 若是空串列，則回傳 null？

## 提出測試案例

- 能通過題目範例
- 空串列則回傳 null

## 提出思路

沒想到太特別的解法，所以在想可以比較偏暴力解去用個 while 迴圈把 linked list 轉成陣列的形式，算出陣列長度並回傳中間的節點即完成，這樣的時間與空間複雜度應分別都是 `O(n)`。

以註解表示以上的思路：

```ts
function middleNode(head: ListNode | null): ListNode | null {
  // return null when head is null
  // declare a array
  // run a while loop to turn list into array
  // return middle node
}
```

## 實作

```ts
function middleNode(head: ListNode | null): ListNode | null {
  // return null when head is null
  if (head === null) {
    return null;
  }
  // declare a array
  const nodeArray: ListNode[] = [];
  let currentNode = head;

  // run a while loop to turn list into array
  while (currentNode.next !== null) {
    nodeArray.push(currentNode);
    currentNode = currentNode.next;
  }

  // push last node
  nodeArray.push(currentNode);

  // return middle node
  return nodeArray[Math.floor(nodeArray.length / 2)];
}
```

## 撰寫測試

```ts
const testCases = [
  {
    input: [1, 2, 3, 4, 5],
    expected: [3, 4, 5]
  },
  {
    input: [1, 2, 3, 4, 5, 6],
    expected: [4, 5, 6]
  },
  {
    input: [1],
    expected: [1]
  },
  {
    input: [1, 2],
    expected: [2]
  },
  {
    input: [],
    expected: []
  }
];

describe('Middle of the Linked List', () => {
  it.each(testCases)(
    'should return middle node as $expected for input $input',
    ({ input, expected }) => {
      const head = createLinkedList(input);
      const middle = middleNode(head);
      expect(linkedListToArray(middle)).toEqual(expected);
    }
  );
});
```

## 複雜度分析

- 時間複雜度：`O(n)`
- 空間複雜度：`O(n)`

## 進階挑戰或其他解法探索

看了 LeetCode 教學後發現空間複雜度還可以再降低到 `O(1)`，是利用快慢指標的方式，之後回頭來複習下，今天大年初一去多陪陪家人就先這樣吧。
