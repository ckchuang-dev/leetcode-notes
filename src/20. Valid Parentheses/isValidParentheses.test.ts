import isValidParentheses from './isValidParentheses';

describe('Valid Parentheses', () => {
  test.each([
    ['()', true],
    ['()[]{}', true],
    ['(]', false],
    ['([])', true],
    ['(', false]
  ])('Given "%s" as input, should return %s', (input, expected) => {
    expect(isValidParentheses(input)).toBe(expected);
  });
});
