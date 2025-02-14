// array loop
// time complexity:
// - add: O(1);
// - getProduct: O(k);
// space complexity: O(n);
class ProductOfBasic {
  private nums: number[] = [];

  add(num: number): void {
    this.nums.push(num);
  }

  getProduct(k: number): number {
    let product = 1;

    for (let i = this.nums.length - 1; i >= this.nums.length - k; i--) {
      product *= this.nums[i];

      if (this.nums[i] === 0) return 0;
    }

    return product;
  }
}

// Better: prefix products
// time complexity:
// - add: O(1);
// - getProduct: O(1);
// space complexity: O(n);
class ProductOfNumbers {
  private prefix: number[] = [];

  add(num: number): void {
    if (num === 0) {
      // clean stack when meet zero
      this.prefix = [];
    } else if (this.prefix.length === 0) {
      this.prefix.push(num);
    } else {
      // add prefix product to stack
      this.prefix.push(this.prefix[this.prefix.length - 1] * num);
    }
  }

  getProduct(k: number): number {
    if (k > this.prefix.length) {
      return 0;
    }

    if (k === this.prefix.length) {
      return this.prefix[this.prefix.length - 1];
    }

    return (
      this.prefix[this.prefix.length - 1] /
      this.prefix[this.prefix.length - k - 1]
    );
  }
}
