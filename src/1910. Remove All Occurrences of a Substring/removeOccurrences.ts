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
