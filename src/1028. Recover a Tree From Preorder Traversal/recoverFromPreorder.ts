import { TreeNode } from '@/types/tree';

function recoverFromPreorder(traversal: string): TreeNode | null {
  if (traversal === '') return null;

  // 宣告一個 stack 來方便在 DFS 過程中找到當前父節點
  const stack: TreeNode[] = [];
  let index = 0;

  while (index < traversal.length) {
    // 定位當前深度
    let depth = 0;

    while (traversal[index] === '-') {
      depth++;
      index++;
    }

    // 找到目前要塞入的新值
    let numberStr = '';

    while (index < traversal.length && traversal[index] !== '-') {
      numberStr += traversal[index];
      index++;
    }

    let node = new TreeNode(parseInt(numberStr));

    // 根據當前深度調整到與 stack 一致，為了找到塞入的父節點
    while (stack.length > depth) {
      stack.pop();
    }

    // 根據當前父節點來確認左右節點是否能塞新值
    if (stack.length > 0) {
      const parent = stack[stack.length - 1];

      if (!parent.left) {
        parent.left = node;
      } else {
        parent.right = node;
      }
    }

    stack.push(node);
  }

  return stack[0];
}
