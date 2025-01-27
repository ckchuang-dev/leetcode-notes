import { ListNode } from '@/types/list';

const duplicateLinkedList = (list: ListNode | null): ListNode | null => {
  if (list === null) {
    return null;
  }

  return new ListNode(list.val, duplicateLinkedList(list.next));
};

const createLinkedList = (arr: number[]): ListNode | null => {
  if (arr.length === 0) {
    return null;
  }

  let head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
};

const linkedListToArray = (head: ListNode | null): number[] => {
  const result: number[] = [];

  while (head !== null) {
    result.push(head.val);
    head = head.next;
  }

  return result;
};

const createLinkedListWithCycle = (values: number[], pos: number) => {
  const head = createLinkedList(values);
  if (pos === -1 || !head) return head;

  let tail = head;
  let cycleNode = null;
  let index = 0;

  while (tail.next !== null) {
    if (index === pos) {
      cycleNode = tail;
    }
    tail = tail.next;
    index++;
  }
  if (cycleNode) tail.next = cycleNode;

  return head;
};

export {
  duplicateLinkedList,
  createLinkedList,
  linkedListToArray,
  createLinkedListWithCycle
};
