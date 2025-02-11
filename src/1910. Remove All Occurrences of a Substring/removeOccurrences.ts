// method 1: iteration
export function removeOccurrences(s: string, part: string): string {
  let newStr = s;

  while (newStr.includes(part)) {
    newStr = newStr.replace(part, '');
  }

  return newStr;
}

export function removeOccurrences2(s: string, part: string): string {
  let newStr = s;

  while (newStr.includes(part)) {
    const index = newStr.indexOf(part);
    newStr = `${newStr.slice(0, index)}${newStr.slice(index + part.length)}`;
  }

  return newStr;
}

// method 2: stack simulation
function checkMatch(stack: string[], part: string, partLength: number): boolean {
  for (let i = 0; i < partLength; i++) {
      if (stack[stack.length - partLength + i] !== part[i]) {
          return false;
      }
  }
  return true;
}

export function removeOccurrencesStack(s: string, part: string): string {
  const stack: string[] = [];
  const partLength = part.length;

  for (const char of s) {
      stack.push(char);

      // 當 stack 長度大於等於 part 長度時，檢查是否與 part 匹配
      if (stack.length >= partLength && checkMatch(stack, part, partLength)) {
          stack.splice(stack.length - partLength, partLength);
      }
  }

  return stack.join('');
}