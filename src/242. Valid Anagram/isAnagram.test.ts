import isAnagram from './isAnagram';

describe('isAnagram', () => {
  test.each([
    ['anagram', 'nagaram', true],
    ['rat', 'car', false]
  ])('should return %s for isAnagram("%s", "%s")', (s, t, expected) => {
    expect(isAnagram(s, t)).toBe(expected);
  });
});
