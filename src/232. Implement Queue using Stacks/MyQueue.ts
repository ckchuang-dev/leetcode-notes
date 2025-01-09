export class MyQueue {
  // declare head and tail stack arrays
  private head: number[];
  private tail: number[];

  constructor() {
    this.head = [];
    this.tail = [];
  }

  push(x: number): void {
    // push x into tail directly
    this.tail.push(x);
  }

  // implement a private method to manipulate two stack for `dequeue` adn `peek`
  private swapStack(): void {
    // check and swap values from tail to head
    const { head, tail } = this;

    if (head.length === 0) {
      while (tail.length !== 0) {
        head.push(tail.pop() as number);
      }
    }
  }

  pop(): number | null {
    // check empty status, if true, return null
    if (this.empty()) {
      return null;
    }
    // do swapCheck
    this.swapStack();

    // return and pop value from head
    const headValue = this.head.pop() as number;

    return headValue;
  }

  peek(): number | null {
    // check empty status, if true, return null
    if (this.empty()) {
      return null;
    }
    // do swapCheck
    this.swapStack();

    // return value from head
    return this.head[this.head.length - 1];
  }

  empty(): boolean {
    // check if two stack are all empty
    return this.head.length === 0 && this.tail.length === 0;
  }
}
