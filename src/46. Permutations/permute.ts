export function permute(nums: number[]): number[][] {
  // base case for nums length = 1
  if (nums.length === 1) {
    return [[...nums]];
  }

  // declare result array
  const result: number[][] = [];

  // run a loop for each num as initial value
  for (let num of nums) {
    // do recursion to get deeper permutations
    const permutations = permute(nums.filter((n) => n !== num));

    // run a loop to push result with current num and result permutations
    for (let permutation of permutations) {
      result.push([num].concat(permutation));
    }
  }

  // return result
  return result;
}
