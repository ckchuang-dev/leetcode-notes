import { middleNode } from './middleNode';
import { createLinkedList, linkedListToArray } from '@/utils/list';

const testCases = [
  {
    input: [1, 2, 3, 4, 5],
    expected: [3, 4, 5]
  },
  {
    input: [1, 2, 3, 4, 5, 6],
    expected: [4, 5, 6]
  },
  {
    input: [1],
    expected: [1]
  },
  {
    input: [1, 2],
    expected: [2]
  },
  {
    input: [],
    expected: []
  }
];

describe('Middle of the Linked List', () => {
  it.each(testCases)(
    'should return middle node as $expected for input $input',
    ({ input, expected }) => {
      const head = createLinkedList(input);
      const middle = middleNode(head);
      expect(linkedListToArray(middle)).toEqual(expected);
    }
  );
});
