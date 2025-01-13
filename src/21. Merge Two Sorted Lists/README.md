# [E] 21. 合併兩個有序鏈結串列 (Merge Two Sorted Lists)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/merge-two-sorted-lists)
- **主題**：Linked List
- **難度**：Easy

## 題目描述

給定兩個已排序的鏈結串列 `list1` 和 `list2` 的頭節點。請將這兩個鏈結串列合併成一個新的有序鏈結串列，新的鏈結串列應由原本兩個串列的節點拼接而成。

回傳合併後的鏈結串列的頭節點。

### 範例 1:

![21.jpg](<./[E]%2021.%20合併兩個有序鏈結串列%20(Merge%20Two%20Sorted%20Lists)-assets/21.jpg>)

**輸入：** `list1 = [1,2,4]`, `list2 = [1,3,4]`
**輸出：** `[1,1,2,3,4,4]`

### 範例 2:

**輸入：** `list1 = []`, `list2 = []`
**輸出：** `[]`

### 範例 3:

**輸入：** `list1 = []`, `list2 = [0]`
**輸出：** `[0]`

### 限制條件：

- 兩個鏈結串列中的節點數量範圍為 `[0, 50]`
- `-100 <= Node.val <= 100`
- `list1` 和 `list2` 均以**非遞減順序**排序

## 問題釐清

- 從範例與限制中，兩個輸入的 list 都有可能為 null？
- 兩個輸入的 list 都會是以遞增順序做好排序的？可忽略未排序的輸入？
- 參考範例二，若兩個 list 皆空則回傳 null？
- 在經過此 function 的 merge 處理後，是否需維持原本 list1 與 list2 不變？
  - 題目提到直接做 merge 即可。

## **提出測試案例**

- 能通過範例測資
- 設計兩個 50 個節點的串列測資

## 提出思路

- 先判斷是否有其中一個 list 為空，若有則直接回傳另一個 list
- 宣告一個新的結果串列與 pivot 節點用來指向這個結果串列的尾端
- 跑迴圈去比較兩個串列的值，並依序接在後面，直到有任一個 list 為空後中斷
- 最後檢查是否兩個串列有剩餘的節點需要接在結果串列後面
- 回傳結果串列的 head node

以註解表示以上的思路：

```ts
const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null) => {
  // check if one of input list is empty

  // declare result list and current pivot

  // run a while loop until one of list is empty
    // compare current values for two list
    // concat target node at the tail of the result list
    // move pivot to the tail of the result list

  // check if remaining nodes from two lists

  // return result list head
};
```

## 實作

```ts
const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null) => {
  // check if one of input list is empty
  if (list1 === null) {
    return list2;
  }
  if (list2 === null) {
    return list1;
  }
  // declare result list and current pivot
  const result = new ListNode(0);
  let pivot = result;

  // run a while loop until one of list is empty
  while (list1 !== null && list2 !== null) {
    // compare current values for two list
    // concat target node at the tail of the result list
    if (list1.val < list2.val) {
      pivot.next = list1;
      list1 = list1.next;
    } else {
      pivot.next = list2;
      list2 = list2.next;
    }

    // move pivot to the tail of the result list
    pivot = pivot.next;
  }

  // check if remaining nodes from two lists
  if (list1 !== null) {
    pivot.next = list1;
  } else {
    pivot.next = list2;
  }
  // return result list head
  return result.next;
};
```

## 撰寫測試

這裡為了方便撰寫測試，參考題目上的範例表示法，多實作兩個 helper function 來做 linked list 與 array 之間的轉換：

```ts
// 將 number array 的格式轉成 linked list
const createLinkedList = (arr: number[]): ListNode | null => {
  if (arr.length === 0) {
    return null;
  }

  let head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
};

// 將 linked list 轉成 number array 的格式
const linkedListToArray = (head: ListNode | null): number[] => {
  const result: number[] = [];

  while (head !== null) {
    result.push(head.val);
    head = head.next;
  }

  return result;
};
```

接著就能根據前面提出的測試案例撰寫單元測試：

```ts
describe('mergeTwoLists', () => {
  it('should merge two sorted lists (Example 1)', () => {
    const list1 = createLinkedList([1, 2, 4]);
    const list2 = createLinkedList([1, 3, 4]);
    const merged = mergeTwoLists(list1, list2);
    expect(linkedListToArray(merged)).toEqual([1, 1, 2, 3, 4, 4]);
  });

  it('should handle two empty lists (Example 2)', () => {
    const list1 = null;
    const list2 = null;
    expect(mergeTwoLists(list1, list2)).toEqual(null);
  });

  it('should handle one empty list (Example 3)', () => {
    const list1 = createLinkedList([]);
    const list2 = createLinkedList([0]);
    const merged = mergeTwoLists(list1, list2);
    expect(linkedListToArray(merged)).toEqual([0]);
  });

  it('should merge two 50-node lists', () => {
    const list1 = createLinkedList(Array.from({ length: 50 }, (_, i) => i * 2)); // [0, 2, 4, ..., 98]
    const list2 = createLinkedList(
      Array.from({ length: 50 }, (_, i) => i * 2 + 1)
    ); // [1, 3, 5, ..., 99]
    const merged = mergeTwoLists(list1, list2);
    expect(linkedListToArray(merged)).toEqual(
      Array.from({ length: 100 }, (_, i) => i)
    );
  });
});
```
