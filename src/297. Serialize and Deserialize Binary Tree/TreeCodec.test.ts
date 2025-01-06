import { TreeNode } from '@/types/tree';
import { TreeCodec } from './TreeCodec';

describe('Serialize and Deserialize Binary Tree', () => {
  const codec = new TreeCodec();

  it('should correctly serialize and deserialize for example 1', () => {
    const root = new TreeNode(
      1,
      new TreeNode(2),
      new TreeNode(3, new TreeNode(4), new TreeNode(5))
    );
    const serialized = codec.serialize(root);
    const deserialized = codec.deserialize(serialized);

    expect(serialized).toEqual('1,2,3,n,n,4,5');
    expect(deserialized).toEqual(root);
  });

  it('should handle empty tree for example 2', () => {
    const root = null;
    const serialized = codec.serialize(root);
    const deserialized = codec.deserialize(serialized);

    expect(serialized).toEqual('');
    expect(deserialized).toBeNull();
  });

  it('should handle tree with only leftmost node in the last level', () => {
    const root = new TreeNode(
      1,
      new TreeNode(2, new TreeNode(4)),
      new TreeNode(3)
    );
    const serialized = codec.serialize(root);

    expect(serialized).toEqual('1,2,3,4');
  });

  it('should handle tree with negative values', () => {
    const root = new TreeNode(
      -1,
      new TreeNode(-2),
      new TreeNode(-3, new TreeNode(-4), new TreeNode(-5))
    );
    const serialized = codec.serialize(root);
    const deserialized = codec.deserialize(serialized);

    expect(serialized).toEqual('-1,-2,-3,n,n,-4,-5');
    expect(deserialized).toEqual(root);
  });

  it('should handle tree with root value of 0', () => {
    const root = new TreeNode(0, new TreeNode(-1), new TreeNode(1));
    const serialized = codec.serialize(root);
    const deserialized = codec.deserialize(serialized);

    expect(serialized).toEqual('0,-1,1');
    expect(deserialized).toEqual(root);
  });

  it('should handle tree with 10000 nodes having only left children', () => {
    const root = new TreeNode(1);
    let current = root;

    for (let i = 2; i <= 10000; i++) {
      const newNode = new TreeNode(i);
      current.left = newNode;
      current = newNode;
    }

    const serialized = codec.serialize(root);
    const deserialized = codec.deserialize(serialized);

    expect(serialized.startsWith('1,2,n,3,n,4,n')).toBeTruthy();
    expect(deserialized).toEqual(root);
  });

  it('should handle a complete binary tree with lots of nodes', () => {
    const createCompleteBinaryTree = (n: number): TreeNode | null => {
      if (n === 0) return null;
      const nodes = Array.from({ length: n }, (_, i) => new TreeNode(i + 1));
      for (let i = 0; i < Math.floor(n / 2); i++) {
        if (2 * i + 1 < n) nodes[i].left = nodes[2 * i + 1];
        if (2 * i + 2 < n) nodes[i].right = nodes[2 * i + 2];
      }
      return nodes[0];
    };

    const root = createCompleteBinaryTree(10000);
    const serialized = codec.serialize(root);
    const deserialized = codec.deserialize(serialized);

    expect(deserialized).toEqual(root);
  });
});
