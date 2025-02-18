function smallestNumber(pattern: string): string {
  // 宣告一個長度 10 的 boolean 陣列，存當前數字是否被用過，從 0~9 第一位不用
  const NUMBER_COUNT = 10;
  const usedNums = Array.from({ length: NUMBER_COUNT }, () => false);
  let result = '';

  // 實作一個 backtracking 遞迴函式
  const findMin = (depth: number, currentStr: string) => {
    if (depth === pattern.length + 1) {
      if (result === '' || currentStr < result) {
        result = currentStr;
      }
      return;
    }

    const prevNum =
      currentStr.length > 0
        ? parseInt(currentStr[currentStr.length - 1])
        : null;

    for (let i = 1; i <= 9; i++) {
      if (usedNums[i]) continue;

      // 確保符合 `I` 和 `D` 條件
      if (prevNum !== null) {
        if (pattern[depth - 1] === 'I' && prevNum >= i) continue;
        if (pattern[depth - 1] === 'D' && prevNum <= i) continue;
      }

      usedNums[i] = true;
      findMin(depth + 1, currentStr + i);
      usedNums[i] = false;
    }
  };

  // 從空字串觸發該函式
  findMin(0, '');

  // 回傳最佳解
  return result;
}

// Time: O(n)
function smallestNumberStack(pattern: string): string {
  let result = '';
  const stack: number[] = [];

  for (let i = 0; i <= pattern.length; i++) {
    stack.push(i + 1);
    if (i === pattern.length || pattern[i] === 'I') {
      while (stack.length > 0) {
        result += stack.pop();
      }
    }
  }

  return result;
}
