import { TreeNode } from '@/types/tree';

const invertTree = (root: TreeNode | null): TreeNode | null => {
  // check if the root is null, if yes, return null
  if (!root) {
    return null;
  }

  // declare result tree
  const newRoot = new TreeNode(root.val);

  // recursively run invertTree function to swap left and right node
  newRoot.left = invertTree(root.right);
  newRoot.right = invertTree(root.left);

  // return result
  return newRoot;
};

export default invertTree;
