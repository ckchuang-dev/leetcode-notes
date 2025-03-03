function pivotArray(nums: number[], pivot: number): number[] {
  const preNums: number[] = [];
  let equalCount = 0;
  const postNums: number[] = [];

  for (let num of nums) {
    if (num === pivot) {
      equalCount++;
    } else if (num > pivot) {
      postNums.push(num);
    } else {
      preNums.push(num);
    }
  }

  return [
    ...preNums,
    ...Array.from({ length: equalCount }, () => pivot),
    ...postNums
  ];
}

function pivotArrayTwoPointer(nums: number[], pivot: number): number[] {
  const ans: number[] = new Array(nums.length).fill(0);
  let lessIndex = 0;
  let greaterIndex = nums.length - 1;

  for (let i = 0, j = nums.length - 1; i < nums.length; i++, j--) {
    if (nums[i] < pivot) {
      ans[lessIndex] = nums[i];
      lessIndex++;
    }
    if (nums[j] > pivot) {
      ans[greaterIndex] = nums[j];
      greaterIndex--;
    }
  }

  while (lessIndex <= greaterIndex) {
    ans[lessIndex] = pivot;
    lessIndex++;
  }

  return ans;
}
