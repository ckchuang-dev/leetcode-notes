export function canFinish(
  numCourses: number,
  prerequisites: number[][]
): boolean {
  // 處理邊界條件，某些狀況一定可以修完直接回傳 true
  if (numCourses <= 1 || prerequisites.length <= 1) {
    return true;
  }

  // 宣告目前的 in-degrees 數量、out-degree 對應的點、已完成的修課數
  const inDegrees = Array(numCourses).fill(0);
  const outDegreeNodes: Set<number>[] = Array.from(
    { length: numCourses },
    () => new Set()
  );
  let finishCount = 0;

  // 根據 prerequisites 跑迴圈，去計算每個節點的 in-degree、out-degree 對應的點
  for (let [course, preCourse] of prerequisites) {
    inDegrees[course]++;
    outDegreeNodes[preCourse].add(course);
  }

  // 初始化一個 queue 存放當前 in-degree 為 0 的節點
  const queue = inDegrees.reduce<number[]>((accu, curr, index) => {
    if (curr === 0) {
      accu.push(index);
    }
    return accu;
  }, []);

  // 跑一個 while 迴圈直到 queue 為空
  while (queue.length > 0) {
    // dequeue 當前節點並對完成修課數量計數
    const currentNode = queue.shift() as number;
    finishCount++;

    // 對當前節點對應的 out-degree 的點去做入度減一，並在減完後將入度為 0 者推入 queue 中
    for (let neighbor of outDegreeNodes[currentNode]) {
      inDegrees[neighbor]--;

      if (inDegrees[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // 確認完成修課數量是否與課程數量相等，「是」則代表能完成所有課程
  return finishCount === numCourses;
}
