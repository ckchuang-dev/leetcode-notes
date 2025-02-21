import { TreeNode } from '@/types/tree';

// DFS
class FindElements {
  private tree: TreeNode | null;
  private seen: Set<number>;

  constructor(root: TreeNode | null) {
    this.seen = new Set();
    this.tree = this.recoverTree(root, 0);
  }

  private recoverTree(root: TreeNode | null, val: number): TreeNode | null {
    if (root === null) return null;

    const finalTree = new TreeNode();

    finalTree.val = val;
    this.seen.add(val);
    finalTree.left = this.recoverTree(root.left, 2 * val + 1);
    finalTree.right = this.recoverTree(root.right, 2 * val + 2);

    return finalTree;
  }

  find(target: number): boolean {
    return this.seen.has(target);
  }
}

// BFS
class FindElementsBFS {
  private tree: TreeNode | null;
  private seen: Set<number>;

  constructor(root: TreeNode | null) {
    this.seen = new Set();
    this.tree = this.recoverTree(root, 0);
  }

  private recoverTree(root: TreeNode | null, val: number): TreeNode | null {
    if (root === null) return null;

    const queue = [root];
    root.val = 0;
    this.seen.add(0);

    while (queue.length > 0) {
      const { left, right, val } = queue.shift()!;

      if (left) {
        left.val = 2 * val + 1;
        this.seen.add(2 * val + 1);
        queue.push(left);
      }
      if (right) {
        right.val = 2 * val + 2;
        this.seen.add(2 * val + 2);
        queue.push(right);
      }
    }

    return root;
  }

  find(target: number): boolean {
    return this.seen.has(target);
  }
}

/**
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */
