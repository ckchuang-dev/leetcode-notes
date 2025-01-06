import { TreeNode } from '@/types/tree';

// declare a TreeCodec class including following two functions
export class TreeCodec {
  /*
   * Encodes a tree to a single string.
   */
  serialize(root: TreeNode | null): string {
    // if root is null, return empty string
    if (root === null) {
      return '';
    }

    // declare a result string array
    const result: string[] = [];

    // declare a queue to do level order traversal, init with root value
    const queue: (TreeNode | null)[] = [root];

    // run a while loop when queue is not empty
    while (queue.length > 0) {
      // dequeue to get current node
      const currentNode = queue.shift();

      // if current node not null
      if (currentNode) {
        // push value into result
        result.push(currentNode.val.toString());
        // enqueue left node and right node
        queue.push(currentNode.left);
        queue.push(currentNode.right);
      } else {
        result.push('n');
      }
    }

    // remove redundant null value at tail
    while (result[result.length - 1] === 'n') {
      result.pop();
    }

    // return serialized string by joining with `,`
    return result.join(',');
  }

  /*
   * Decodes your encoded data to tree.
   */
  deserialize(data: string): TreeNode | null {
    // if data is empty string, return null
    if (data === '') {
      return null;
    }

    // split string by `,`
    // transform each value to null or number
    const values = data.split(',').map((v) => (v === 'n' ? null : Number(v)));

    // preventing wrong data format with empty root value
    if (typeof values[0] !== 'number') {
      throw new Error('wrong input data');
    }

    // declare result tree
    const root = new TreeNode(values[0]);
    // declare a queue, init with first node
    const queue = [root];
    let currentIndex = 1;

    // run a while loop when queue is not empty
    while (queue.length > 0) {
      // dequeue current node
      const node = queue.shift() as TreeNode;
      // assign next value as left node if it's not null
      if (typeof values[currentIndex] === 'number') {
        node.left = new TreeNode(values[currentIndex]!);
        queue.push(node.left);
      }
      currentIndex++;

      // assign next value as right node if it's not null
      if (typeof values[currentIndex] === 'number') {
        node.right = new TreeNode(values[currentIndex]!);
        queue.push(node.right);
      }
      currentIndex++;
    }

    // return result tree
    return root;
  }
}
