export function areAlmostEqual(s1: string, s2: string): boolean {
  // edge case
  if (s1.length !== s2.length) return false;
  if (s1 === s2) return true;

  // hash map to calculate char frequencies
  const map1 = new Map<string, number>();
  const map2 = new Map<string, number>();
  let diffCount = 0;

  // for loop to check diff count and char frequencies
  for (let i = 0; i < s1.length; i++) {
    const char1 = s1[i];
    const char2 = s2[i];

    if (char1 !== char2) {
      diffCount++;
    }
    // early return because cannot be swapped than once
    if (diffCount > 2) {
      return false;
    }

    map1.set(char1, map1.has(char1) ? map1.get(char1)! + 1 : 1);
    map2.set(char2, map2.has(char2) ? map2.get(char2)! + 1 : 1);
  }

  // check char count
  for (let [k, v] of map1) {
    if (v !== map2.get(k)) {
      return false;
    }
  }

  return true;
}

export function areAlmostEqual2(s1: string, s2: string): boolean {
  if (s1 === s2) return true;

  // 紀錄不同的 index
  let diffIndices: number[] = [];

  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      diffIndices.push(i);

      if (diffIndices.length > 2) return false;
    }
  }

  const [i, j] = diffIndices;

  // 只比較不同的兩個字母是否能互換為相等
  return s1[i] === s2[j] && s1[j] === s2[i];
}
