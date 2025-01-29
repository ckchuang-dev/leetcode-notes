import { ListNode } from '@/types/list';

export function middleNode(head: ListNode | null): ListNode | null {
  // return null when head is null
  if (head === null) {
    return null;
  }
  // declare a array
  const nodeArray: ListNode[] = [];
  let currentNode = head;

  // run a while loop to turn list into array
  while (currentNode.next !== null) {
    nodeArray.push(currentNode);
    currentNode = currentNode.next;
  }

  // push last node
  nodeArray.push(currentNode);

  // return middle node
  return nodeArray[Math.floor(nodeArray.length / 2)];
}
