import { hasCycle, hasCycleWithTwoPointers } from './hasCycle';
import { createLinkedListWithCycle } from '@/utils/list';

const testCases = [
  {
    input: { values: [3, 2, 0, -4], pos: 1 },
    expected: true
  },
  {
    input: { values: [1, 2], pos: 0 },
    expected: true
  },
  {
    input: { values: [1], pos: -1 },
    expected: false
  },
  {
    input: { values: [], pos: -1 },
    expected: false
  },
  {
    input: {
      values: [
        -21, 10, 17, 8, 4, 26, 5, 35, 33, -7, -16, 27, -12, 6, 29, -12, 5, 9,
        20, 14, 14, 2, 13, -24, 21, 23, -21, 5
      ],
      pos: -1
    },
    expected: false
  }
];

describe('Linked List Cycle', () => {
  it.each(testCases)(
    'should detect cycle for input $input',
    ({ input, expected }) => {
      const head = createLinkedListWithCycle(input.values, input.pos);
      expect(hasCycle(head)).toBe(expected);
    }
  );

  it('Stress Test: should handle a list with less than 10^4 nodes with a cycle', () => {
    const inputArray = Array.from({ length: 10 ** 4 }, (_, i) => i + 1);
    const head = createLinkedListWithCycle(inputArray, 0);
    expect(hasCycle(head)).toBe(true);
  });
});

describe('Linked List Cycle - two pointers', () => {
  it.each(testCases)(
    'should detect cycle for input $input',
    ({ input, expected }) => {
      const head = createLinkedListWithCycle(input.values, input.pos);
      expect(hasCycleWithTwoPointers(head)).toBe(expected);
    }
  );

  it('Stress Test: should handle a list with less than 10^4 nodes with a cycle', () => {
    const inputArray = Array.from({ length: 10 ** 4 }, (_, i) => i + 1);
    const head = createLinkedListWithCycle(inputArray, 0);
    expect(hasCycleWithTwoPointers(head)).toBe(true);
  });
});
