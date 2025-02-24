function mostProfitablePath(
  edges: number[][],
  bob: number,
  amount: number[]
): number {
  const n = amount.length;
  const tree: Set<number>[] = Array.from({ length: n }, () => new Set());
  const visited = Array.from({ length: n }, () => false);
  const bobNodeToTime = new Map<number, number>();
  let maxIncome = -Infinity;

  // 依照 edges 來找到每個鄰點
  for (const [u, v] of edges) {
    tree[u].add(v);
    tree[v].add(u);
  }

  // 用 DFS 遞迴來記錄 Bob 的路徑與到達時間
  function findBobPath(node: number, time: number): boolean {
    bobNodeToTime.set(node, time);
    visited[node] = true;

    if (node === 0) return true;

    // 沿著當前節點的每個鄰點前進去遞迴
    for (const neighbor of tree[node]) {
      if (!visited[neighbor] && findBobPath(neighbor, time + 1)) {
        return true;
      }
    }

    // 無法到達 node 0 或非最佳路徑
    bobNodeToTime.delete(node);
    return false;
  }

  findBobPath(bob, 0);

  // 用 DFS 計算 Alice 的最佳路徑
  function findAlicePath(node: number, time: number, income: number): void {
    visited[node] = true;
    let newIncome = income;

    if (!bobNodeToTime.has(node) || bobNodeToTime.get(node)! > time) {
      // Alice 先到，獲取全部
      newIncome += amount[node];
    } else if (bobNodeToTime.get(node) === time) {
      // 同時到達，平分收入
      newIncome += amount[node] / 2;
    }

    // 若是葉子節點，計算當前最大收入是否計入
    if (tree[node].size === 1 && node !== 0) {
      maxIncome = Math.max(maxIncome, newIncome);
    }

    // DFS 遞迴找到葉節點的路徑
    for (const neighbor of tree[node]) {
      if (!visited[neighbor]) {
        findAlicePath(neighbor, time + 1, newIncome);
      }
    }
  }

  // reset visited array 來做 Alice 的 DFS
  visited.fill(false);
  findAlicePath(0, 0, 0);

  return maxIncome;
}
