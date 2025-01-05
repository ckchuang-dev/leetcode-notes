import { TreeNode } from '@/types/tree';

export function levelOrder(root: TreeNode | null): number[][] {
  // when root equal to null, return empty array
  if (root === null) {
    return [];
  }

  // declare result array
  const result: number[][] = [];

  // apply BFS to traverse tree
  // declare a queue to record each level
  const queue: TreeNode[] = [root];

  // use a while loop to traverse each level (loop until queue is empty)
  while (queue.length > 0) {
    const nodeLength = queue.length;
    const values: number[] = [];

    // use a for loop with nodes count for current level
    for (let i = 0; i < nodeLength; i++) {
      // dequeue current node's value
      const currentNode = queue.pop();

      if (currentNode) {
        values.push(currentNode.val);

        // enqueue left and right node for current node
        currentNode.left && queue.unshift(currentNode.left);
        currentNode.right && queue.unshift(currentNode.right);
      }
    }

    result.push(values);
  }

  // return result
  return result;
}
