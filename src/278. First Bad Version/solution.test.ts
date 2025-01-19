import { solution } from './solution';

describe('First Bad Version Solution', () => {
  it('should return the first bad version', () => {
    const isBadVersion = vi.fn((version: number) => version >= 4);
    const findFirstBadVersion = solution(isBadVersion);

    expect(findFirstBadVersion(5)).toBe(4);
    expect(isBadVersion).toHaveBeenCalledTimes(2);
  });

  it('should handle the case where the first version is bad', () => {
    const isBadVersion = vi.fn((version: number) => version >= 1);
    const findFirstBadVersion = solution(isBadVersion);

    expect(findFirstBadVersion(1)).toBe(1);
    expect(isBadVersion).toHaveBeenCalledTimes(0);
  });

  it('should handle the case where all versions are good except the last', () => {
    const isBadVersion = vi.fn((version: number) => version >= 10);
    const findFirstBadVersion = solution(isBadVersion);

    expect(findFirstBadVersion(10)).toBe(10);
    expect(isBadVersion).toHaveBeenCalledTimes(3);
  });

  it('should handle large input efficiently', () => {
    const bad = 500000;
    const isBadVersion = vi.fn((version: number) => version >= bad);
    const findFirstBadVersion = solution(isBadVersion);

    expect(findFirstBadVersion(1000000)).toBe(bad);
    expect(isBadVersion).toHaveBeenCalledTimes(19);
  });
});
