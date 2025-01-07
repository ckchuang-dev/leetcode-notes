import { TreeNode } from '@/types/tree';

type Stack = {
  node: TreeNode | null;
  depth: number;
};

function maxDepthByRecursion(root: TreeNode | null): number {
  // if root is null, return 0
  if (root === null) {
    return 0;
  }

  // recursively calculate max depth of each sub tree
  // return max depth
  return (
    1 +
    Math.max(maxDepthByRecursion(root.left), maxDepthByRecursion(root.right))
  );
}

function maxDepthByStack(root: TreeNode | null): number {
  // if root is null, return 0
  if (root === null) {
    return 0;
  }

  // declare max depth
  let maxDepth = 0;

  // declare a stack with current node and current depth
  const stack: Stack[] = [
    {
      node: root,
      depth: 1
    }
  ];

  // run a while loop until stack is empty
  while (stack.length > 0) {
    // pop current node and depth
    const { node, depth } = stack.pop() as Stack;

    if (node) {
      // compare depth with max depth
      maxDepth = Math.max(maxDepth, depth);
      // push left and right node into stack
      stack.push(
        {
          node: node.left,
          depth: depth + 1
        },
        {
          node: node.right,
          depth: depth + 1
        }
      );
    }
  }

  // return max depth
  return maxDepth;
}

export { maxDepthByRecursion, maxDepthByStack };
