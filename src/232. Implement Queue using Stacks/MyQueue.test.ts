import { MyQueue } from './MyQueue';

describe('MyQueue', () => {
  it('should initialize an empty queue', () => {
    const queue = new MyQueue();
    expect(queue.empty()).toBe(true);
  });

  it('should push elements and peek the front element', () => {
    const queue = new MyQueue();
    queue.push(1);
    queue.push(2);

    expect(queue.peek()).toBe(1);
    expect(queue.empty()).toBe(false);
  });

  it('should pop elements in FIFO order', () => {
    const queue = new MyQueue();
    queue.push(1);
    queue.push(2);
    queue.push(3);

    expect(queue.pop()).toBe(1);
    expect(queue.pop()).toBe(2);
    expect(queue.empty()).toBe(false);
    expect(queue.pop()).toBe(3);
    expect(queue.empty()).toBe(true);
  });

  it('should return null for pop and peek when queue is empty', () => {
    const queue = new MyQueue();
    expect(queue.pop()).toBe(null);
    expect(queue.peek()).toBe(null);
  });

  it('should handle mixed operations', () => {
    const queue = new MyQueue();
    queue.push(5);
    queue.push(10);

    expect(queue.pop()).toBe(5);
    queue.push(15);
    expect(queue.peek()).toBe(10);
    expect(queue.pop()).toBe(10);
    expect(queue.pop()).toBe(15);
    expect(queue.empty()).toBe(true);
  });
});
