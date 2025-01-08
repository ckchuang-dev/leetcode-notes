// declare parentheses map
const PARENTHESES_MAP: Record<string, string> = {
  ')': '(',
  ']': '[',
  '}': '{'
};

export default function isValidParentheses(s: string): boolean {
  // declare a stack array to store parentheses
  const stack: string[] = [];
  // run a for loop for each char
  for (let c of s) {
    const target = PARENTHESES_MAP[c];
    // check current char map to any value with parentheses map or note
    if (target) {
      // yes, pop stack value to check if equal
      const value = stack.pop();

      if (value !== target) {
        return false;
      }
    } else {
      // no, push current char into stack
      stack.push(c);
    }
  }

  return true;
}
