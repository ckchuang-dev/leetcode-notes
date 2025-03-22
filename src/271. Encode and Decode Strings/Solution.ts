/**
 * Encodes a list of strings to a single string.
 */
function encode(strs: string[]): string {
  let str = '';

  for (let s of strs) {
    str += s.length + '#' + s;
  }

  return str;
};

/**
* Decodes a single string to a list of strings.
*/
function decode(s: string): string[] {
  const res = [];
  let start = 0;

  while (start < s.length) {
    let end = start;

    while (s[end] !== '#') {
      end++;
    }
    const strLen = Number(s.substring(start, end));
    start = end + 1;
    const currentStr = s.substring(start, start + strLen);

    res.push(currentStr);
    start += strLen;
  }

  return res;
};

/**
* Your functions will be called as such:
* decode(encode(strs));
*/