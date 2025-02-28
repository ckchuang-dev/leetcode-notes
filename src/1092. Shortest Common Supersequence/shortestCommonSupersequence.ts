function shortestCommonSupersequence(str1: string, str2: string): string {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  // 先算出所有 LCS 長度
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        // 兩字元相等時，使用左上角 + 1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // 兩字元不相等時，取上方或左方較大值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // 利用 LCS 長度表右下角座標反著組出 SCS
  let i = m;
  let j = n;
  let scsChars: string[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && str1[i - 1] === str2[j - 1]) {
      // 當前兩字元相同時，推入該字元
      scsChars.push(str1[i - 1]);
      i--;
      j--;
    } else if (i > 0 && (j === 0 || dp[i - 1][j] >= dp[i][j - 1])) {
      // 左方 > 上方，並將座標左移，推入上方字元，
      scsChars.push(str1[i - 1]);
      i--;
    } else {
      // 上方 > 左方，並將座標上移，推入左方字元，
      scsChars.push(str2[j - 1]);
      j--;
    }
  }

  return scsChars.reverse().join('');
}
