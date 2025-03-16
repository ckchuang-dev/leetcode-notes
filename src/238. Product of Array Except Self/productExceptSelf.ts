function productExceptSelf(nums: number[]): number[] {
    const len = nums.length;
    const res = Array(len).fill(1);

    let prefix = 1;
    for (let i = 0; i < len; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = len - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }

    return res;
};