// Method 1. Recursively generate binary string
// time complexity: O((2^n) * n)
// space complexity: O(n)
function findDifferentBinaryStringRecursive(nums: string[]): string {
    // edge case handling
    if (nums.length === 0) {
        return '';
    }

    // get n
    const numLength = nums[0].length;

    let matchedStr = '';
    let found = false;

    // find any match string and early return
    const findMatchStr = (len: number, currentStr: string) => {
        if (found) {
            return;
        }
        if (currentStr.length === numLength && !nums.includes(currentStr)) {
            matchedStr = currentStr;
            found = true;
            return;
        }

        if (currentStr.length < numLength) {
            findMatchStr(len + 1, currentStr + '0');
            findMatchStr(len + 1, currentStr + '1');
        }
    }

    // recursively gen pair
    findMatchStr(0, '');

    return matchedStr;
};

// Method 2. Convert to number Set
// time complexity: O(n^2)
// space complexity: O(n)
function findDifferentBinaryString(nums: string[]): string {
  const integers = new Set<number>();

  // 轉換 nums 裡的二進位字串為數字，存入 Set
  for (const num of nums) {
    integers.add(parseInt(num, 2));
  }

  const n = nums.length;

  // 遍歷從 0 到 n，找出不在 Set 中的數字
  for (let num = 0; num <= n; num++) {
    if (!integers.has(num)) {
      // 轉成二進位
      let ans = num.toString(2);

      // 確保長度為 n，補零
      return ans.padStart(n, '0');
    }
  }

  return '';
}

// Method 3. Cantor's Diagonal Argument
// time complexity: O(n)
// space complexity: O(1)
function findDifferentBinaryStringCantor(nums: string[]): string {
  const len = nums.length;
  const ans = Array.from({length: len}, () => '');

  for (let i = 0; i < nums.length; i++) {
      ans[i] = nums[i][i] === '0' ? '1' : '0';
  }

  return ans.join('');
}