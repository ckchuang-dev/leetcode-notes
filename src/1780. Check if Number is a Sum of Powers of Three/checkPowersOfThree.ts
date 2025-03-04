function checkPowersOfThree(n: number): boolean {
  // apply backtracking algo. to check all cases for powers of three
  const backtrack = (power: number, sum: number): boolean => {
    if (sum === n) {
      return true;
    }
    if (Math.pow(3, power) > n) {
      return false;
    }

    const addCurrent = backtrack(power + 1, sum + Math.pow(3, power));
    const skipCurrent = backtrack(power + 1, sum);

    return addCurrent || skipCurrent;
  };

  return backtrack(0, 0);
}

function checkPowersOfThree2(n: number): boolean {
  let power = 0;
  let num = n;

  // find the largest power closed to n
  while (3 ** power <= n) {
    power++;
  }

  while (num > 0) {
    if (num >= 3 ** power) {
      num -= 3 ** power;
    }
    // check the same power appear only once
    if (num >= 3 ** power) {
      return false;
    }

    power--;
  }

  return true;
}

function checkPowersOfThree3(n: number): boolean {
  let num = n;

  while (num > 0) {
    if (num % 3 === 2) {
      return false;
    }
    num = Math.floor(num / 3);
  }

  return true;
}
