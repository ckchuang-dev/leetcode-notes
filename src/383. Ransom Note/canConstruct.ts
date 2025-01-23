export function canConstruct(ransomNote: string, magazine: string): boolean {
  // return false when input are empty or ransomNote > magazine
  if (
    (ransomNote.length !== 0 && magazine.length === 0) ||
    ransomNote.length > magazine.length
  ) {
    return false;
  }

  // declare a hash table to count each char amount
  const charMap: Record<string, number> = {};

  for (let c of magazine) {
    if (charMap[c]) {
      charMap[c]++;
    } else {
      charMap[c] = 1;
    }
  }

  // run a for loop for ransomNote to check if each char amount are enough
  for (let c of ransomNote) {
    if (charMap?.[c] > 0) {
      charMap[c]--;
    } else {
      return false;
    }
  }
  // return true when pass
  return true;
}
