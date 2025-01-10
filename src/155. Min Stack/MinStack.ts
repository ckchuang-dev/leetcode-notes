export class MinStack {
  private min: number = Number.MAX_SAFE_INTEGER;
  private stack: number[] = [];

  push(val: number): void {
    // 檢查是否需要更新當前最小值
    if (val <= this.min) {
      // 若需要的話，將舊的最小值先推入 stack，再替換新的最小值
      this.stack.push(this.min);
      this.min = val;
    }
    // 將新值推入 stack
    this.stack.push(val);
  }

  pop(): void {
    // 檢查當前 pop 出來的值是否與最小值相等
    if (this.stack.pop() === this.min) {
      // 若是，則需要再 pop 前一個次小值到 min 中，才能維持最小值正確性
      this.min = this.stack.pop() as number;
    }
  }

  top(): number {
    // return the last value from stack
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    // return min value
    return this.min;
  }
}
