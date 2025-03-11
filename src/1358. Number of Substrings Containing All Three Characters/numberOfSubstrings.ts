function numberOfSubstrings(s: string): number {
  // declare hash map
  const charMap: Record<string, number> = {
    a: 0,
    b: 0,
    c: 0
  };
  // declare sliding window left and right pointer
  // declare accumulator
  let left = 0,
    res = 0;

  // for loop for right pointer
  for (let right = 0; right < s.length; right++) {
    charMap[s[right]]++;

    // when match condition, sum up and shrink left pointer
    while (charMap.a > 0 && charMap.b > 0 && charMap.c > 0) {
      res += s.length - right;
      charMap[s[left]]--;
      left++;
    }
  }

  // return result
  return res;
}
