export function constructDistancedSequence(n: number): number[] {
  // 依照 n 初始化目標陣列
  const length = 2 * n - 1;
  const resultSequence = Array.from({ length }, () => 0);
  const isNumberUsed = Array.from({ length: n + 1 }, () => false);

  // 利用 backtracking 來尋找最大字典序列
  function findSequence(currentIndex: number): boolean {
    // base case：已經找到最後一位且都能正確填滿，則完成
    if (currentIndex === length) {
      return true;
    }
    // 當前位置被佔用，尋找下一位
    if (resultSequence[currentIndex] !== 0) {
      return findSequence(currentIndex + 1);
    }

    // 從 n 開始往下填，直接就能是最大字典序列
    for (let num = n; num >= 1; num--) {
      if (isNumberUsed[num]) {
        continue;
      }

      // num = 1 時只出現一次
      if (num === 1) {
        resultSequence[currentIndex] = 1;
        isNumberUsed[1] = true;

        // 確認剩餘位置能被正確填入，否則重置
        if (findSequence(currentIndex + 1)) {
          return true;
        }

        resultSequence[currentIndex] = 0;
        isNumberUsed[1] = false;
      } else {
        const secondIndex = currentIndex + num;

        // 確認第二的數位置在邊界內，且還沒被佔用
        if (secondIndex < length && resultSequence[secondIndex] === 0) {
          resultSequence[currentIndex] = num;
          resultSequence[secondIndex] = num;
          isNumberUsed[num] = true;

          // 確認剩餘位置能被正確填入，否則重置
          if (findSequence(currentIndex + 1)) {
            return true;
          }

          resultSequence[currentIndex] = 0;
          resultSequence[secondIndex] = 0;
          isNumberUsed[num] = false;
        }
      }
    }

    return false;
  }

  findSequence(0);

  return resultSequence;
}
