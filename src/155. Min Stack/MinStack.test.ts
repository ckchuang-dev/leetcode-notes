import { MinStack } from './MinStack';

describe('MinStack', () => {
  it('should pass the example scenario', () => {
    const minStack = new MinStack();
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    expect(minStack.getMin()).toBe(-3);
    minStack.pop();
    expect(minStack.top()).toBe(0);
    expect(minStack.getMin()).toBe(-2);
  });

  it('should return correct value with complex scenario', () => {
    const minStack = new MinStack();
    minStack.push(2);
    minStack.push(1);
    minStack.push(0);
    minStack.push(4);
    minStack.push(5);
    minStack.push(-1);
    expect(minStack.getMin()).toBe(-1);
    minStack.pop();
    expect(minStack.getMin()).toBe(0);
    expect(minStack.top()).toBe(5);
  });
});
