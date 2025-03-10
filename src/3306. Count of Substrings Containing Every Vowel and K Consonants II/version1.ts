const isVowel = (c: string): boolean => {
  return ['a', 'e', 'i', 'o', 'u'].includes(c);
};

const countOfSubstrings = (word: string, k: number): number => {
  let numValidSubstrings = 0;
  let start = 0;
  let end = 0;
  let vowelCount = new Map<string, number>();
  let consonantCount = 0;
  let nextConsonant: number[] = Array.from({ length: word.length }, () => 0);
  let nextConsonantIndex = word.length;

  // Compute next consonant index for all indices
  for (let i = word.length - 1; i >= 0; i--) {
    nextConsonant[i] = nextConsonantIndex;
    if (!isVowel(word[i])) {
      nextConsonantIndex = i;
    }
  }

  while (end < word.length) {
    let newLetter = word[end];
    if (isVowel(newLetter)) {
      vowelCount.set(newLetter, (vowelCount.get(newLetter) || 0) + 1);
    } else {
      consonantCount++;
    }

    // Shrink window if too many consonants are present
    while (consonantCount > k) {
      let startLetter = word[start];
      if (isVowel(startLetter)) {
        vowelCount.set(startLetter, (vowelCount.get(startLetter) || 0) - 1);
        if (vowelCount.get(startLetter) === 0) {
          vowelCount.delete(startLetter);
        }
      } else {
        consonantCount--;
      }
      start++;
    }

    // Try to shrink if window is valid
    while (
      start < word.length &&
      vowelCount.size === 5 &&
      consonantCount === k
    ) {
      numValidSubstrings += nextConsonant[end] - end;
      let startLetter = word[start];
      if (isVowel(startLetter)) {
        vowelCount.set(startLetter, (vowelCount.get(startLetter) || 0) - 1);
        if (vowelCount.get(startLetter) === 0) {
          vowelCount.delete(startLetter);
        }
      } else {
        consonantCount--;
      }
      start++;
    }
    end++;
  }

  return numValidSubstrings;
};
