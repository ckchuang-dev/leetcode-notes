import { lengthOfLongestSubstring } from './lengthOfLongestSubstring';

describe('lengthOfLongestSubstring', () => {
  test.each([
    ['abcabcbb', 3],
    ['bbbbb', 1],
    ['pwwkew', 3],
    ['', 0],
    ['aA1! aA', 5],
    ['!@#$%^&*()', 10],
    ['AaBbCc', 6]
  ])("input '%s' should return %i", (input, expected) => {
    expect(lengthOfLongestSubstring(input)).toBe(expected);
  });
});
