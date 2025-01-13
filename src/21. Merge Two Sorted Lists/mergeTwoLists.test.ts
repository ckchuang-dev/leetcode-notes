import { createLinkedList, linkedListToArray } from '@/utils/list';
import { mergeTwoLists } from './mergeTwoLists';

describe('mergeTwoLists', () => {
  it('should merge two sorted lists (Example 1)', () => {
    const list1 = createLinkedList([1, 2, 4]);
    const list2 = createLinkedList([1, 3, 4]);
    const merged = mergeTwoLists(list1, list2);
    expect(linkedListToArray(merged)).toEqual([1, 1, 2, 3, 4, 4]);
  });

  it('should handle two empty lists (Example 2)', () => {
    const list1 = null;
    const list2 = null;
    expect(mergeTwoLists(list1, list2)).toEqual(null);
  });

  it('should handle one empty list (Example 3)', () => {
    const list1 = createLinkedList([]);
    const list2 = createLinkedList([0]);
    const merged = mergeTwoLists(list1, list2);
    expect(linkedListToArray(merged)).toEqual([0]);
  });

  it('should merge two 50-node lists', () => {
    const list1 = createLinkedList(Array.from({ length: 50 }, (_, i) => i * 2)); // [0, 2, 4, ..., 98]
    const list2 = createLinkedList(
      Array.from({ length: 50 }, (_, i) => i * 2 + 1)
    ); // [1, 3, 5, ..., 99]
    const merged = mergeTwoLists(list1, list2);
    expect(linkedListToArray(merged)).toEqual(
      Array.from({ length: 100 }, (_, i) => i)
    );
  });
});
