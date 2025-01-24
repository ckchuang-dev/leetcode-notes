import { canConstruct } from './canConstruct';

describe('Ransom Note', () => {
  test.each([
    ['a', 'b', false],
    ['aa', 'ab', false],
    ['aa', 'aab', true],
    ['', 'a', true],
    ['', '', true],
    ['a', '', false],
    ['abc', 'a', false],
    ['abc', 'abc', true]
  ])(
    '%s for ransomNote and %s for magazine, result should be %s',
    (ransomNote, magazine, expected) => {
      expect(canConstruct(ransomNote, magazine)).toBe(expected);
    }
  );
});
