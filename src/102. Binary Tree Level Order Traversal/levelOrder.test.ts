import { TreeNode } from '@/types/tree';
import { levelOrder } from './levelOrder';

describe('Binary Tree Level Order Traversal', () => {
  it('should return correct level order - example 1', () => {
    const root = new TreeNode(
      3,
      new TreeNode(9),
      new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );
    const result = levelOrder(root);

    expect(result).toEqual([[3], [9, 20], [15, 7]]);
  });

  it('should return correct level order - example 2', () => {
    const root = new TreeNode(1);
    const result = levelOrder(root);

    expect(result).toEqual([[1]]);
  });

  it('should return empty array when null - example 3', () => {
    const result = levelOrder(null);

    expect(result).toEqual([]);
  });

  it('should handle a large tree', () => {
    const root = new TreeNode(1);
    let current = root;

    for (let i = 2; i <= 10000; i++) {
      current.right = new TreeNode(i);
      current = current.right;
    }

    const result = levelOrder(root);
    expect(result.length).toEqual(10000);
    expect(result[9999]).toEqual([10000]);
  });
});
