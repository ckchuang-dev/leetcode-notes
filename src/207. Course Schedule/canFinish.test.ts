import { canFinish } from './canFinish';

const testCases = [
  {
    numCourses: 2,
    prerequisites: [[1, 0]],
    expected: true
  },
  {
    numCourses: 2,
    prerequisites: [
      [1, 0],
      [0, 1]
    ],
    expected: false
  },
  // DAG 無環
  {
    numCourses: 5,
    prerequisites: [
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3]
    ],
    expected: true
  },
  // 有環
  {
    numCourses: 4,
    prerequisites: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 1]
    ],
    expected: false
  },
  {
    numCourses: 1,
    prerequisites: [],
    expected: true
  },
  {
    numCourses: 20,
    prerequisites: [[0, 1]],
    expected: true
  }
];

describe('Course Schedule', () => {
  test.each(testCases)(
    'should return $expected for numCourses = $numCourses and prerequisites = $prerequisites',
    ({ numCourses, prerequisites, expected }) => {
      expect(canFinish(numCourses, prerequisites)).toBe(expected);
    }
  );
});
