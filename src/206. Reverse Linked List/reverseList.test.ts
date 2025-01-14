import { reverseListRecursively, reverseListIteratively } from './reverseList';
import { createLinkedList, linkedListToArray } from '@/utils/list';

function runReverseListTests(
  methodName: 'Recursion' | 'Iteration',
  reverseFunction: typeof reverseListIteratively,
  stressTestSize: number
) {
  describe(`Reverse Linked List - ${methodName}`, () => {
    test.each([
      { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
      { input: [1, 2], expected: [2, 1] },
      { input: [], expected: [] }
    ])(
      `should correctly reverse the list %j using ${methodName}`,
      ({ input, expected }) => {
        const head = createLinkedList(input);
        const reversedHead = reverseFunction(head);
        const result = linkedListToArray(reversedHead);
        expect(result).toEqual(expected);
      }
    );

    test(`Stress Test: Reversing a list with ${stressTestSize} nodes using ${methodName}`, () => {
      const inputArray = Array.from(
        { length: stressTestSize },
        (_, i) => i + 1
      );
      const head = createLinkedList(inputArray);
      const reversedHead = reverseFunction(head);
      const result = linkedListToArray(reversedHead);
      const expectedArray = inputArray.reverse();
      expect(result).toEqual(expectedArray);
    });
  });
}

runReverseListTests('Recursion', reverseListRecursively, 5000);
runReverseListTests('Iteration', reverseListIteratively, 1000000);
