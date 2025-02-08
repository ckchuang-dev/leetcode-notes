# [M] 2349. Design a Number Container System

## 題目

- [LeetCode 連結](https://leetcode.com/problems/design-a-number-container-system)
- **主題**：Hash Table, Heap (Priority Queue)
- **難度**：Medium

## 題目描述

設計一個數字容器系統，該系統需要支持以下操作：

1. **在指定索引插入或替換數字**。
2. **查詢系統內某個數字的最小索引**。

請實作 `NumberContainers` 類別：

- `NumberContainers()`：初始化數字容器系統。
- `void change(int index, int number)`：在 `index` 位置填入 `number`。如果該索引已經存在數字，則替換為 `number`。
- `int find(int number)`：回傳系統內該數字的最小索引，如果系統內沒有該數字，則回傳 `-1`。

### 範例 1

```
輸入：
["NumberContainers", "find", "change", "change", "change", "change", "find", "change", "find"]
[[], [10], [2, 10], [1, 10], [3, 10], [5, 10], [10], [1, 20], [10]]

輸出：
[null, -1, null, null, null, null, 1, null, 2]

解釋：
NumberContainers nc = new NumberContainers();
nc.find(10);  // 系統內沒有數字 10，回傳 -1。
nc.change(2, 10);  // 在索引 2 放入數字 10。
nc.change(1, 10);  // 在索引 1 放入數字 10。
nc.change(3, 10);  // 在索引 3 放入數字 10。
nc.change(5, 10);  // 在索引 5 放入數字 10。
nc.find(10);  // 數字 10 存在於索引 1, 2, 3, 5，最小索引為 1，回傳 1。
nc.change(1, 20);  // 替換索引 1 的數字為 20（原來是 10）。
nc.find(10);  // 數字 10 現在只剩在索引 2, 3, 5，最小索引為 2，回傳 2。
```

### 限制條件

- `1 <= index, number <= 10^9`
- `change` 和 `find` 方法的總呼叫次數最多為 `10^5`。

## 問題釐清

- 理解題意
  - `change(index, number)` 操作若 `index` 位置已有數字，應**直接替換**。
  - `find(number)` 需返回該數字的**最小索引**，若數字**不存在**則回傳 `-1`。
- 測資中的總呼叫次數最多為 `10^5`，所以可能要採用更有效率的尋找最小索引的方式？或可以先用比較直覺的方式實作一版再優化？

## 提出思路

最直覺的做法是利用一個 map 存值，以 index 為 key、number 為 value，這樣在 change 時可以直接覆蓋即可。但在 find 時就會需要跑一個迴圈去尋找含有該 number 的 index 找最小值。

預估複雜度：

- change
  - time：`O(1)`
  - space：`O(n)`，若 n 代表 map 的長度，也就是最差狀況下進行 n 次操作且 index 都不同
- find
  - time：`O(n)`，使用一個迴圈查找最小值
  - space：`O(1)`，沒有使用額外大空間

## 實作

```ts
class NumberContainers {
  private numberMap: Map<number, number>;

  constructor() {
    this.numberMap = new Map();
  }

  change(index: number, number: number): void {
    this.numberMap.set(index, number);
  }

  find(number: number): number {
    let min = Infinity;

    // 對 map 跑一個迴圈尋找最小值
    for (let [k, v] of this.numberMap) {
      if (v === number) {
        min = Math.min(min, k);
      }
    }

    return min === Infinity ? -1 : min;
  }
}
```

基礎測資通過，但 submit 後果然 TLE 了 (`37 / 45` testcases passed)，看來 `find` 需要比 `O(n)` 更快，只好來嘗試用空間換時間，在 `change` 時多做一些判斷。

## 改良做法

後來看了官方教學後，嘗試了不使用 min-heap 的各種方式，都還是會 TLE，後來發現有人有一版 AC 的 TypeScript 解，是用一個單純的數字陣列存 `indexToNumber` 的資料，搭配 `splice` 在每次 `change` 時去找對應位置插入，讓 `find` 能直接取第一位為最小值：

```ts
class NumberContainers {
  private numbers: number[];
  private numberToIndices: Map<number, number[]>;

  constructor() {
    this.numbers = [];
    this.numberToIndices = new Map();
  }

  change(index: number, newNum: number): void {
    const oldNum = this.numbers[index];

    // handle old number
    if (oldNum !== undefined) {
      const oldIndices = this.numberToIndices.get(oldNum) || [];
      const removeIndex = oldIndices.indexOf(index);
      if (removeIndex !== -1) {
        oldIndices.splice(removeIndex, 1);
      }
    }

    // handle new number
    this.numbers[index] = newNum;
    const indices = this.numberToIndices.get(newNum) || [];

    // find sorted position for current index
    const insertPos = indices.findIndex((i) => i > index);
    indices.splice(insertPos === -1 ? indices.length : insertPos, 0, index);
    this.numberToIndices.set(newNum, indices);
  }

  find(number: number): number {
    return this.numberToIndices.get(number)?.[0] ?? -1;
  }
}
```

雖然嘗試 submit 後過是過了，但這個 runtime beats 0% 的結果蠻好笑的：

![result](./2349-result.png)

看來之後還是得找時間來把 priority queue 的觀念給補上武器才夠用呀…，今天不小心卡太久時間不夠該去做正事了。
