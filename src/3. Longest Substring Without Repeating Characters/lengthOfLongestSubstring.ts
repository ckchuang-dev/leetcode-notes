export function lengthOfLongestSubstring(s: string): number {
  // if empty string, return 0
  if (s.length === 0) {
    return 0;
  }

  // declare max length
  let maxLength = 0;

  // run nested 2 loop to calculate max length of each substrings
  for (let i = 0; i < s.length; i++) {
    const seenChar = new Set<string>();

    for (let j = i; j < s.length; j++) {
      if (seenChar.has(s[j])) {
        break;
      }

      maxLength = Math.max(maxLength, j - i + 1);
      seenChar.add(s[j]);
    }
  }

  // return result
  return maxLength;
}
