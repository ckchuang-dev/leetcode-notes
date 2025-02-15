function findPartitions(num: number): number[][] {
  const res: number[][] = [];
  const strNum = num.toString();

  // 依照數字字串從左至右遞迴尋找剩餘可分割組合
  function findRemaining(index: number, memo: number[]) {
    if (index === strNum.length) {
      res.push([...memo]);
      return;
    }

    let currentNum = 0;
    for (let i = index; i < strNum.length; i++) {
      currentNum = currentNum * 10 + Number(strNum[i]);
      findRemaining(i + 1, [...memo, currentNum]);
    }
  }

  // 從數字的最左邊一位開始找，第二個參數為當前 memo 的組合
  findRemaining(0, []);

  return res;
}

function punishmentNumber(n: number): number {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    const square = i * i;

    // 找出所有的分割組合
    const partitions = findPartitions(square);

    // 確認每個分割組合加總是否與 i 相等，若相等則將 square 加進 sum
    for (let partition of partitions) {
      const partitionSum = partition.reduce((a, c) => a + c, 0);

      if (partitionSum === i) {
        sum += square;
        break;
      }
    }
  }

  return sum;
}
