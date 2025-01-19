type IsBadVersionFunction = (version: number) => boolean;

const solution = (isBadVersion: IsBadVersionFunction) => {
  return function firstBadVersion(n: number): number {
    // declare left and right
    let left = 1;
    let right = n;

    // while loop to check with API
    while (left < right) {
      // divide and check
      const mid = left + Math.floor((right - left) / 2);

      // move left or right position
      if (isBadVersion(mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    // return first bad position
    return left;
  };
};

export { solution };
