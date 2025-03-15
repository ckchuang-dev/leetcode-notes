function groupAnagramsSorting(strs: string[]): string[][] {
  const hashMap = new Map<string, string[]>();

  for (let str of strs) {
    const key = str.split('').sort().join();

    if (hashMap.has(key)) {
      hashMap.set(key, [...hashMap.get(key)!, str]);
    } else {
      hashMap.set(key, [str]);
    }
  }

  return Array.from(hashMap.values());
};

function getKeyByCharCount(str: string): string {
  const countArr = Array(26).fill(0);

  for (let c of str) {
    countArr[c.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  return countArr.join('#');
}

function groupAnagramsCount(strs: string[]): string[][] {
  // early return for edge cases
  if (strs.length === 0) {
    return [];
  }

  const hashMap = new Map<string, string[]>();

  for (let str of strs) {
    const key = getKeyByCharCount(str);

    if (hashMap.has(key)) {
      hashMap.set(key, [...hashMap.get(key)!, str]);
    } else {
      hashMap.set(key, [str]);
    }
  }

  return Array.from(hashMap.values());
}