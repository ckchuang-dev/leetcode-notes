# [M] 207. 修課安排 (Course Schedule)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/course-schedule)
- **主題**：Graph
- **難度**：Medium

## 題目描述

你需要修習總共 `numCourses` 門課程，這些課程的編號從 0 到 `numCourses - 1`。

給定一個二維陣列 `prerequisites`，其中 `prerequisites[i] = [ai, bi]` 表示如果你想修習課程 `ai`，那麼你必須先修習課程 `bi`。例如，`[0, 1]` 表示要修習課程 0，你需要先修習課程 1。

請返回 `true` 如果你可以修完所有課程，否則返回 `false`。

### 範例 1

```plain
輸入：numCourses = 2, prerequisites = [[1,0]]
輸出：true
說明：總共有 2 門課程。要修習課程 1，你需要先修習課程 0。所以可以完成所有課程。
```

### 範例 2

```plain
輸入：numCourses = 2, prerequisites = [[1,0],[0,1]]
輸出：false
說明：總共有 2 門課程。要修習課程 1，你需要先修習課程 0，並且要修習課程 0，你也需要先修習課程 1。所以無法完成所有課程。
```

### 限制條件

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- 所有 `prerequisites[i]` 的元素是唯一的。

---

## 問題釐清

- 從限制條件來看，當課程數小於等於 1 或擋修陣列長度小於等於 1，應該都代表一定能修完？
- 確認`[0, 1]` 的意思是指 `1 → 0` 這樣的擋修順序？

## 提出測試案例

- 能通過兩個範例
- 設計較複雜的 DAG 案例，應回傳 true
- 設計有環圖，應回傳 false

## 提出思路

這題是經典的拓樸排序練習題，在 LeetCode 官方教學的討論區上找到 WilliamFiset 這個關於 Topological Sort 及 Kahn's Algorithm 的[推薦教學影片](https://www.youtube.com/watch?v=cIBFEhD77b4)，看完後可以用這個演算法來實作。(關於這個演算法筆記之後另寫一篇文章補上)

使用 Kahn's Algorithm 來實作的話主要會是以下的思路：

- 如果課程間的擋修關係是一個有向圖的話，依照課程數量與擋修規則去初始化兩個陣列
  - `inDegrees`：計算指向每個頂點的箭頭數量
  - `outDegreeNodes`：存入以每個頂點出發的對應頂點
- 用一個 queue 存放目前 in degree 為 0 的點，在過程中計算完課數量，反覆對該節點對應的 out degree node 去減 1、放入 queue，直到 queue 為空
- 最後確認完課數量是否與課程數相等即能確認是否能修完

以註解表示完整思路：

```ts
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // 處理邊界條件，某些狀況一定可以修完直接回傳 true

  // 宣告目前的 in-degrees 數量、out-degree 對應的點、已完成的修課數
  // 根據 prerequisites 跑迴圈，去計算每個節點的 in-degree、out-degree 對應的點
  // 初始化一個 queue 存放當前 in-degree 為 0 的節點

  // 跑一個 while 迴圈直到 queue 為空
    // dequeue 當前節點並對完成修課數量計數
    // 對當前節點對應的 out-degree 的點去做入度減一，並在減完後將入度為 0 者推入 queue 中

  // 確認完成修課數量是否與課程數量相等，「是」則代表能完成所有課程
}
```

## 實作

```ts
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // 處理邊界條件，某些狀況一定可以修完直接回傳 true
  if (numCourses <= 1 || prerequisites.length <= 1) {
    return true;
  }

  // 宣告目前的 in-degrees 數量、out-degree 對應的點、已完成的修課數
  const inDegrees = Array(numCourses).fill(0);
  const outDegreeNodes: Set<number>[] = Array.from(
    { length: numCourses },
    () => new Set()
  );
  let finishCount = 0;

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
    // dequeue 當前節點並對完成修課數量計數
    const currentNode = queue.shift() as number;
    finishCount++;

    // 對當前節點對應的 out-degree 的點去做入度減一，並在減完後將入度為 0 者推入 queue 中
    for (let neighbor of outDegreeNodes[currentNode]) {
      inDegrees[neighbor]--;

      if (inDegrees[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // 確認完成修課數量是否與課程數量相等，「是」則代表能完成所有課程
  return finishCount === numCourses;
}
```

## 撰寫測試

```ts
const testCases = [
  {
    numCourses: 2,
    prerequisites: [[1, 0]],
    expected: true
  },
  {
    numCourses: 2,
    prerequisites: [
      [1, 0],
      [0, 1]
    ],
    expected: false
  },
  // DAG 無環
  {
    numCourses: 5,
    prerequisites: [
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3]
    ],
    expected: true
  },
  // 有環
  {
    numCourses: 4,
    prerequisites: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 1]
    ],
    expected: false
  },
  {
    numCourses: 1,
    prerequisites: [],
    expected: true
  },
  {
    numCourses: 20,
    prerequisites: [[0, 1]],
    expected: true
  }
];

describe('Course Schedule', () => {
  test.each(testCases)(
    'should return $expected for numCourses = $numCourses and prerequisites = $prerequisites',
    ({ numCourses, prerequisites, expected }) => {
      expect(canFinish(numCourses, prerequisites)).toBe(expected);
    }
  );
});
```

## 複雜度分析

- 時間複雜度：
  - 若 `prerequisites` 的長度代表 `E`，即有向圖的邊數，而 `numCourses` 代表頂點的數量 `V`
  - 一開始對 `prerequisites` 算出入度、出度資料複雜度為 `O(E)`
  - 初始化 queue 時最差的複雜度為 `O(V)`
  - 做拓樸排序時的 while 迴圈中，每個頂點至少會被 dequeue 一次且每個出度邊會被計算一次，因此為 `O(V + E)`
  - 因此總時間複雜度為 `O(V + E)`
- 空間複雜度：
  - inDegrees：`O(V)`
  - outDegreeNodes：最多存邊數，因此為 `O(E)`
  - queue：最壞狀況下所有點都同時入列，因此為 `O(V)`
  - 因此總空間複雜度為 `O(V + E)`
