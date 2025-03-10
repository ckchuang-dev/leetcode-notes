// 判斷字元是否為母音
const isVowel = (c: string): boolean => {
  return ['a', 'e', 'i', 'o', 'u'].includes(c);
};

// 計算至少 k 個子音的子字串數量
const atLeastK = (word: string, k: number): number => {
  const wordLen = word.length;
  let numValidSubstrings = 0;
  let start = 0;
  let end = 0;
  let vowelCount = new Map<string, number>();
  let consonantCount = 0;

  while (end < wordLen) {
    let newChar = word[end];

    // 更新母音或子音計數
    if (isVowel(newChar)) {
      vowelCount.set(newChar, (vowelCount.get(newChar) || 0) + 1);
    } else {
      consonantCount++;
    }

    // 當包含所有母音且子音數量 >= k 時，計算有效子字串數量
    while (vowelCount.size === 5 && consonantCount >= k) {
      // 計算所有包含當前子字串的所有解數量
      numValidSubstrings += wordLen - end;

      let startLetter = word[start];

      // 依序移除窗口左側的字元，調整母音、子音計數，直到當前窗口的解不合法，則開始找下一組解
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

const countOfSubstrings = (word: string, k: number): number => {
  // 剛好 k 個子音解數量 = 至少 k 個子音數量 - 至少 k + 1 個子音數量
  return atLeastK(word, k) - atLeastK(word, k + 1);
};
