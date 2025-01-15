import { longestPalindrome } from './longestPalindrome';

describe('Longest Palindrome', () => {
  test.each([
    ['abccccdd', 7],
    ['a', 1],
    ['abc', 1],
    ['aaa', 3],
    ['abb', 3],
    ['abba', 4]
  ])('longestPalindrome("%s") returns %i', (input, expected) => {
    expect(longestPalindrome(input)).toBe(expected);
  });
})
