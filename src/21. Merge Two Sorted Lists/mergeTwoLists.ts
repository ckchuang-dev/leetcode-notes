import { ListNode } from '@/types/list';

const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null) => {
  // check if one of input list is empty
  if (list1 === null) {
    return list2;
  }
  if (list2 === null) {
    return list1;
  }
  // declare result list and current pivot
  const result = new ListNode(0);
  let pivot = result;

  // run a while loop until one of list is empty
  while (list1 !== null && list2 !== null) {
    // compare current values for two list
    // concat target node at the tail of the result list
    if (list1.val < list2.val) {
      pivot.next = list1;
      list1 = list1.next;
    } else {
      pivot.next = list2;
      list2 = list2.next;
    }

    // move pivot to the tail of the result list
    pivot = pivot.next;
  }

  // check if remaining nodes from two lists
  if (list1 !== null) {
    pivot.next = list1;
  } else {
    pivot.next = list2;
  }
  // return result list head
  return result.next;
};

export { mergeTwoLists };
