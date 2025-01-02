/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
  // 創建一個 HashMap 來儲存數字和它的索引
  const hashMap = {};

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const complement = target - currentNum;

    // 檢查是否已經存在一個數字可以和當前數字相加等於 target
    if (complement in hashMap) {
      return [hashMap[complement], i];
    }

    // 如果不存在，將當前數字和索引存入 HashMap
    hashMap[currentNum] = i;
  }
};

export default twoSum;
