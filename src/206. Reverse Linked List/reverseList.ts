import { ListNode } from '@/types/list';

function reverseListRecursively(head: ListNode | null): ListNode | null {
  // recursive function base cases, if head or head.next is null, return head
  if (head === null || head.next === null) {
    return head;
  }

  // declare a new list to reverse remaining list nodes recursively
  const newList = reverseListRecursively(head.next);

  // reverse the pointer for current node
  head.next.next = head;
  head.next = null;

  // return new list
  return newList;
}

function reverseListIteratively(head: ListNode | null): ListNode | null {
  // if head is null, return null
  if (head === null) {
    return null;
  }

  // declare two pointer to record prev node and curr node
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;

  // run a while loop until curr === null
  while (curr !== null) {
    const tmpNext: ListNode | null = curr.next;

    curr.next = prev;
    prev = curr;
    curr = tmpNext;
  }

  // return prev node as head of new list
  return prev;
}

export { reverseListRecursively, reverseListIteratively };
