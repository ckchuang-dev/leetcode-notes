function findDifferentBinaryString(nums: string[]): string {
  // edge case handling
  if (nums.length === 0) {
    return '';
  }

  // get n
  const numLength = nums[0].length;

  let matchedStr = '';

  // early return flag
  let found = false;

  // find any match string and early return
  const findMatchStr = (len: number, currentStr: string) => {
    // early return when the first solution found
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
  };

  // recursively gen pair
  findMatchStr(0, '');

  return matchedStr;
}

function findDifferentBinaryStringNumber(nums: string[]): string {
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

// Cantor's Diagonal Argument
function findDifferentBinaryStringWow(nums: string[]): string {
  const len = nums.length;
  const ans = Array.from({ length: len }, () => '');

  for (let i = 0; i < nums.length; i++) {
    ans[i] = nums[i][i] === '0' ? '1' : '0';
  }

  return ans.join('');
}
