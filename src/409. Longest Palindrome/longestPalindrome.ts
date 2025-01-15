export function longestPalindrome(s: string): number {
  // return edge case
  if (s.length < 2) {
    return s.length;
  }

  const charCountMap: Record<string, number> = {};

  // calculate each char count in loop
  for (let c of s) {
    charCountMap[c] = (charCountMap[c] ?? 0) + 1;
  }

  // check each char for summing up max len
  const maxLen = Object.values(charCountMap).reduce((sum, curr) => {
    if (curr % 2 === 0) {
      // even: sum all len
      return sum + curr;
    } else {
      // odd: sum len - 1
      return sum + curr - 1;
    }
  }, 0);

  // check if s.length > max len
  return s.length > maxLen ? maxLen + 1 : maxLen;
}
