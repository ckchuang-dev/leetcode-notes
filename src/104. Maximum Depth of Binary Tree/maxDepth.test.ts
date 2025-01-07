import { TreeNode } from '@/types/tree';
import { maxDepthByStack, maxDepthByRecursion } from './maxDepth';

describe('Maximum Depth of Binary Tree', () => {
  it('should return correct max depth - example 1', () => {
    const root = new TreeNode(
      3,
      new TreeNode(9),
      new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );
    const result = maxDepthByRecursion(root);

    expect(result).toEqual(3);
  });

  it('should return correct max depth - example 2', () => {
    const root = new TreeNode(1, null, new TreeNode(2));
    const result = maxDepthByRecursion(root);

    expect(result).toEqual(2);
  });

  it('should return 0 when null', () => {
    const result = maxDepthByRecursion(null);

    expect(result).toEqual(0);
  });

  it('should handle a large tree - recursion', () => {
    const root = new TreeNode(1);
    let current = root;
    const nodeCount = 10000;

    for (let i = 2; i <= nodeCount; i++) {
      current.left = new TreeNode(i);
      current = current.left;
    }

    const result = maxDepthByRecursion(root);
    expect(result).toEqual(nodeCount);
  });

  it('should handle a large tree - stack', () => {
    const root = new TreeNode(1);
    let current = root;
    const nodeCount = 100000;

    for (let i = 2; i <= nodeCount; i++) {
      current.left = new TreeNode(i);
      current = current.left;
    }

    const result = maxDepthByStack(root);
    expect(result).toEqual(nodeCount);
  });
});
