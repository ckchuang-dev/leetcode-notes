import isValidParentheses from './isValidParentheses';

describe('Valid Parentheses', () => {
  test.each([
    ['()', true],
    ['()[]{}', true],
    ['(]', false],
    ['([])', true]
  ])('Given "%s" as input, should return %s', (input, expected) => {
    expect(isValidParentheses(input)).toBe(expected);
  });
});
