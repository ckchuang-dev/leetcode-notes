import { ListNode } from '@/types/list';

export function hasCycle(head: ListNode | null): boolean {
  // edge case: head = null, return false
  if (head === null) {
    return false;
  }

  // declare a value map for check cycle
  const seen = new Set<ListNode>();
  let current = head;

  // run a while loop to check whether next is null or not
  while (current.next !== null) {
    // check current.next hit the map or not
    if (seen.has(current.next)) {
      return true;
    } else {
      // record value into map
      seen.add(current);
      current = current.next;
    }
  }

  return false;
}

export function hasCycleWithTwoPointers(head: ListNode | null): boolean {
  if (head === null) {
    return false;
  }
  let slow: ListNode | null = head;
  let fast: ListNode | null = head.next;

  while (slow !== fast) {
    if (fast === null || fast.next === null) {
      return false;
    }
    slow = slow?.next ?? null;
    fast = fast.next.next;
  }
  return true;
}
