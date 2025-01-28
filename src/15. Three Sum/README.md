# [M] 15. 三數之和 (3Sum)

## 題目

- [LeetCode 連結](https://leetcode.com/problems/3sum)
- **主題**：Array, Two Pointers, Sorting
- **難度**：Medium

## 題目描述

給定一個整數陣列 `nums`，請返回所有的三元組 `[nums[i], nums[j], nums[k]]`，使得：

- `i != j`，`i != k`，且 `j != k`
- 且 `nums[i] + nums[j] + nums[k] == 0`

注意：解集合中不得包含重複的三元組。

### 範例 1

```plain
輸入：nums = [-1,0,1,2,-1,-4]
輸出：[[-1,-1,2],[-1,0,1]]
說明：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0
唯一的三元組為 [-1,0,1] 和 [-1,-1,2]
注意輸出中的順序以及三元組內的順序可以不同。
```

### 範例 2

```plain
輸入：nums = [0,1,1]
輸出：[]
說明：唯一可能的三元組總和並不等於 0。
```

### 範例 3

```plain
輸入：nums = [0,0,0]
輸出：[[0,0,0]]
說明：唯一可能的三元組總和等於 0。
```

### 限制條件

- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`

## 問題釐清

- 若 `nums` 小於 3 個數，也回傳空陣列？
- 當找不到解時，則回傳空陣列？
- `nums` 看起來可能是非排序過的陣列？且陣列中元素可能重複？
- 輸出的每個三元組陣列順序可以不同？
- 經過這個函式後是否不能改變 `nums` 的內容？

## 提出測試案例

- 三個範例能通過
- 兩個數的 `nums`
- 差距較大的正負數組合
- 確認經過此函式後 `nums` 沒有被改變

## 提出思路

因為題目像是 [Two Sum](https://www.codefarmer.tw/topic/leetcode/1-two-sum) 的延伸題，這裡在想是否也可以先嘗試用類似概念來解。在 Two Sum 中，是去找到一個陣列中的兩數和為 target，同理，換個角度想也就是要找 `X + Y = -Z`。因此應該能用一個迴圈依序讓每個當前值做為 `Z`，來解兩數之和為 `-Z` 的問題。

把以上的做法先依序列下來：

- 處理邊界條件，當陣列長度小於 2 則回傳空陣列
- 對 `nums` 排序
- 對排序後陣列做迴圈
  - 固定一個數字作為 `Z`，在剩下的數字中找到兩數 `X` 和 `Y`，使得 `X + Y = -Z`
  - 用 two sum 的 hash map 做法來找到剩下的 `X`、`Y`
  - 另外因為要避免重複答案，所以 `Z` 會略過與前一數字相同的組合

以註解表示以上的思路：

```ts
// 用 hash map 版本的 two sum 並排除重複結果
function twoSum(nums: number[], target: number): number[][] {}

function threeSum(nums: number[]): number[][] {
  // handle edge case
  // sort nums with new array
  // declare result

  // for X + Y = -Z, run a for loop to handle each Z
    // when current Z is same as previous one, skip
    // handle two sum for X, Y

  // return final result
}
```

## 實作

```ts
// 用 hash map 版本的 two sum 並排除重複結果
function twoSum(nums: number[], target: number): number[][] {
  const hashMap = new Map<number, number>();
  const resultMap = new Map<number, number[]>();

  for (let i = 0; i < nums.length; i++) {
    // find pair with difference
    const diff = target - nums[i];

    if (hashMap.has(diff) && !resultMap.has(diff)) {
      resultMap.set(diff, [diff, nums[i]]);
    } else {
      hashMap.set(nums[i], i);
    }
  }

  return Array.from(resultMap.values());
}

function threeSum(nums: number[]): number[][] {
  // handle edge case
  if (nums.length < 3) {
    return [];
  }
  // sort nums with new array
  const sortedNums = [...nums].sort((a, b) => a - b);

  // declare result
  const result: number[][] = [];

  // for X + Y = -Z, run a for loop to handle each Z
  for (let i = 0; i < sortedNums.length - 2; i++) {
    const current = sortedNums[i];

    // when current Z is same as previous one, skip
    if (i !== 0 && current === sortedNums[i - 1]) {
      continue;
    }
    // handle two sum for X, Y
    const pairs = twoSum(sortedNums.slice(i + 1), -current);

    for (let pair of pairs) {
      result.push([current, ...pair]);
    }
  }

  // return final result
  return result;
}
```

實作時覺得對所有 `sortedNums` 傳進去做 two sum 應該還不是最佳解，因為畢竟都排序過了，如果三數都是正數，那之後的數其實都是不用檢查的。

## 撰寫測試

```ts
const testCases = [
  {
    nums: [-1, 0, 1, 2, -1, -4],
    expected: [
      [-1, -1, 2],
      [-1, 0, 1]
    ]
  },
  {
    nums: [0, 1, 1],
    expected: []
  },
  {
    nums: [0, 0, 0],
    expected: [[0, 0, 0]]
  },
  {
    nums: [1, -1],
    expected: []
  },
  {
    nums: [-100000, -99999, 199999, 1, 2, 3],
    expected: [[-100000, -99999, 199999]]
  },
  {
    nums: [1, 2, 3, 4, 5],
    expected: []
  },
  {
    nums: [0, 0, 0, 0],
    expected: [[0, 0, 0]]
  }
];

describe('Three Sum', () => {
  test.each(testCases)(
    'input $nums should return $expected',
    ({ nums, expected }) => {
      const result = threeSum(nums);

      expect(result).toEqual(
        expect.arrayContaining(
          expected.map((arr) => expect.arrayContaining(arr))
        )
      );

      expect(nums).toEqual([...nums]);
    }
  );
});
```

## 複雜度分析

- 時間複雜度：`O(n^2)`
  - 排序：`O(n log n)`
  - three sum 那迴圈內又執行 two sum function：`O(n^2)`
- 空間複雜度：`O(n^2)`
  - 排序與 two sum 中的切片：`O(n)`
  - 儲存結果的二維陣列：`O(n^2)`

## 進階挑戰或其他解法探索

看解法另外還可以用 two pointers 來做應該更簡潔，也有另一個 no-sort 的做法，之後回頭來做，除夕時間不太夠。
