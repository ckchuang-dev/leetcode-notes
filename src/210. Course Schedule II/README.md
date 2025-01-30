# [M] 210. 課程安排 II (Course Schedule II)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/course-schedule-ii)
- **主題**：Graph, Topological Sort
- **難度**：Medium

## 題目描述

你需要修習總共 `numCourses` 門課程，這些課程的編號從 `0` 到 `numCourses - 1`。

給定一個二維陣列 `prerequisites`，其中 `prerequisites[i] = [ai, bi]` 表示如果你想修習課程 `ai`，那麼你必須先修習課程 `bi`。例如，`[0, 1]` 表示要修習課程 `0`，你需要先修習課程 `1`。

請返回一個可行的修課順序，使得能完成所有課程。如果有多種可行順序，則返回其中任意一種。如果無法完成所有課程，則返回空陣列。

### 範例 1

```
輸入：numCourses = 2, prerequisites = [[1,0]]
輸出：[0,1]
說明：總共有 2 門課程。要修習課程 1，你需要先修習課程 0。因此，正確的修課順序為 [0,1]。
```

### 範例 2

```
輸入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
輸出：[0,2,1,3]
說明：總共有 4 門課程。要修習課程 3，你需要先完成課程 1 和 2。而課程 1 和 2 必須在完成課程 0 之後修習。
因此，一種正確的修課順序是 [0,1,2,3]，另一種可能的順序是 [0,2,1,3]。
```

### 範例 3

```
輸入：numCourses = 1, prerequisites = []
輸出：[0]
```

### 限制條件

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- `ai != bi`
- 所有 `prerequisites[i]` 的元素是唯一的。

## 提出思路

打鐵趁熱在解完 207 後來看第二題，但發現其實只是差在這次需要返回其中一組解，因此就拿[昨天的版本](../207.%20Course%20Schedule)把計數改成存 ordering 陣列就能完成了。

## 實作

小改了幾個地方：

- 拿掉一開始的邊界判斷
- 把原本的計數改成 `ordering` 陣列，在每次 dequeue 時去儲存頂點順序
- 最後的回傳條件比較要注意的是如果修不完的話，需要回傳空陣列

```ts
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  // 宣告目前的 in-degrees 數量、out-degree 對應的點、已完成的修課數
  const inDegrees = Array(numCourses).fill(0);
  const outDegreeNodes: Set<number>[] = Array.from(
    { length: numCourses },
    () => new Set()
  );
  const ordering: number[] = [];

  // 根據 prerequisites 跑迴圈，去計算每個節點的 in-degree、out-degree 對應的點
  for (let [course, preCourse] of prerequisites) {
    inDegrees[course]++;
    outDegreeNodes[preCourse].add(course);
  }

  // 初始化一個 queue 存放當前 in-degree 為 0 的節點
  const queue = inDegrees.reduce<number[]>((accu, curr, index) => {
    if (curr === 0) {
      accu.push(index);
    }
    return accu;
  }, []);

  // 跑一個 while 迴圈直到 queue 為空
  while (queue.length > 0) {
    // dequeue 當前節點並紀錄當前課程順序
    const currentNode = queue.shift() as number;

    ordering.push(currentNode);

    // 對當前節點對應的 out-degree 的點去做入度減一，並在減完後將入度為 0 者推入 queue 中
    for (let neighbor of outDegreeNodes[currentNode]) {
      inDegrees[neighbor]--;

      if (inDegrees[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // 當能修完所有課程才回傳順序
  return ordering.length === numCourses ? ordering : [];
}
```
