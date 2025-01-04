class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// implement a getTreeHeight function
const getTreeHeight = (root: TreeNode | null): number => {
  // if tree node null, return 0
  if (!root) {
    return 0;
  }

  // or recursively calculate max left and right tree height
  return 1 + Math.max(getTreeHeight(root.left), getTreeHeight(root.right));
};

const isBalanced = (root: TreeNode | null): boolean => {
  // if root is null, return true
  if (!root) {
    return true;
  }
  // or calculate current left and right tree height
  const leftTreeHeight = getTreeHeight(root.left);
  const rightTreeHeight = getTreeHeight(root.right);

  // recursively check deeper left and right tree are balanced or note
  return (
    Math.abs(leftTreeHeight - rightTreeHeight) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
};

export { isBalanced as default, TreeNode };
