function numOfSubarrays(arr: number[]): number {
  const MOD = 1e9 + 7;
  const n = arr.length;
  const tmpArray = [...arr];

  // 將所有數依照奇偶性轉成 1 或 0
  for (let i = 0; i < n; i++) {
    tmpArray[i] %= 2;
  }

  // dpEven[i] 代表以索引 i 結尾且當前總和為「偶數」的所有子陣列數目
  // dpOdd[i] 代表以索引 i 結尾且當前總和為「奇數」的所有子陣列數目
  const dpEven = Array.from({ length: n }, () => 0);
  const dpOdd = Array.from({ length: n }, () => 0);

  // 初始化第一個數的奇偶性
  if (tmpArray[0] === 1) {
    dpOdd[0] = 1;
  } else {
    dpEven[0] = 1;
  }

  // 從倒數第 2 個元素開始跑迴圈
  for (let i = 1; i < n; i++) {
    if (tmpArray[i] === 1) {
      // 當前數值為奇數時，需要找偶數累加、加上自己為新的奇數總和個數
      dpOdd[i] = (dpEven[i - 1] + 1) % MOD;
      // 總和要是偶數，需找前面為奇數累加數才會是
      dpEven[i] = dpOdd[i - 1];
    } else {
      dpEven[i] = (dpEven[i - 1] + 1) % MOD;
      dpOdd[i] = dpOdd[i - 1];
    }
  }

  // 加總所有奇數個數並作餘數處理
  return dpOdd.reduce((sum, count) => (sum + count) % MOD, 0);
}
