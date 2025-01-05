import { TreeNode } from '@/types/tree';
import invertTree from './invertTree';

// for checking tree node values
const treeToArray = (root: TreeNode | null): (number | null)[] => {
  if (!root) return [];
  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  while (result[result.length - 1] === null) {
    result.pop();
  }

  return result;
};

describe('invertTree', () => {
  it('should invert the binary tree - example 1', () => {
    const root = new TreeNode(
      4,
      new TreeNode(2, new TreeNode(1), new TreeNode(3)),
      new TreeNode(7, new TreeNode(6), new TreeNode(9))
    );
    const invertedRoot = invertTree(root);

    expect(treeToArray(invertedRoot)).toEqual([4, 7, 2, 9, 6, 3, 1]);
    expect(invertedRoot).not.toBe(root);
  });

  it('should invert the binary tree - example 2', () => {
    const root = new TreeNode(2, new TreeNode(1), new TreeNode(3));
    const invertedRoot = invertTree(root);

    expect(treeToArray(invertedRoot)).toEqual([2, 3, 1]);
    expect(invertedRoot).not.toBe(root);
  });

  it('should invert the binary tree - example 3 (empty tree)', () => {
    const root: TreeNode | null = null;
    const invertedRoot = invertTree(root);

    expect(invertedRoot).toBeNull;
  });
});
