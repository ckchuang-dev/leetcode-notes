import isBalanced, { TreeNode } from './isBalanced';

describe('Balanced Binary Tree', () => {
  it('should return true for a balanced binary tree - example 1', () => {
    const root = new TreeNode(
      3,
      new TreeNode(9),
      new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );
    const result = isBalanced(root);

    expect(result).toBe(true);
  });

  it('should return false for an unbalanced binary tree - example 2', () => {
    const root = new TreeNode(
      1,
      new TreeNode(
        2,
        new TreeNode(3, new TreeNode(4), new TreeNode(4)),
        new TreeNode(3)
      ),
      new TreeNode(2)
    );
    const result = isBalanced(root);

    expect(result).toBe(false);
  });

  it('should return true for an empty tree - example 3', () => {
    const root: TreeNode | null = null;
    const result = isBalanced(root);

    expect(result).toBe(true);
  });

  it('should return false for a tree where the first layer is balanced but the second layer is not', () => {
    // 範例結構：
    //          1
    //         / \
    //        2   2
    //       /    / \
    //      3    4   5
    //     / \
    //    4   4
    const root = new TreeNode(
      1,
      new TreeNode(2, new TreeNode(3, new TreeNode(4), new TreeNode(4))),
      new TreeNode(2, new TreeNode(4), new TreeNode(5))
    );
    const result = isBalanced(root);

    expect(result).toBe(false);
  });
});
