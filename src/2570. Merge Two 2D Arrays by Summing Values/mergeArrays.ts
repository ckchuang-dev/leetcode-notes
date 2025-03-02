function mergeArrays(nums1: number[][], nums2: number[][]): number[][] {
  const hashMap = new Map<number, number>();

  for (let [k, v] of nums1) {
    hashMap.set(k, v);
  }

  for (let [k, v] of nums2) {
    if (hashMap.has(k)) {
      hashMap.set(k, hashMap.get(k)! + v);
    } else {
      hashMap.set(k, v);
    }
  }

  return Array.from(hashMap).sort((a, b) => a[0] - b[0]);
}

function mergeArraysTwoPointer(
  nums1: number[][],
  nums2: number[][]
): number[][] {
  let res: number[][] = [];
  let i = 0;
  let j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i][0] === nums2[j][0]) {
      res.push([nums1[i][0], nums1[i][1] + nums2[j][1]]);
      i++;
      j++;
    } else if (nums1[i][0] < nums2[j][0]) {
      res.push([nums1[i][0], nums1[i][1]]);
      i++;
    } else {
      res.push([nums2[j][0], nums2[j][1]]);
      j++;
    }
  }

  if (i < nums1.length) {
    res = res.concat(nums1.slice(i, nums1.length));
  } else {
    res = res.concat(nums2.slice(j, nums2.length));
  }

  return res;
}
