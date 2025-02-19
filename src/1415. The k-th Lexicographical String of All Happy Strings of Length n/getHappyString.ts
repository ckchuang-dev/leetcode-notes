function getHappyString(n: number, k: number): string {
  // declare target array
  const arr: string[] = [];

  // implement a recursive function to gen happy strings
  const genHappyStr = (len: number, str: string) => {
    // early return when exceeding boundary
    if (arr.length >= k) {
      return;
    }

    // base case
    if (len === 1) {
      arr.push(str);
      return;
    }

    if (str[str.length - 1] !== 'a') genHappyStr(len - 1, str + 'a');
    if (str[str.length - 1] !== 'b') genHappyStr(len - 1, str + 'b');
    if (str[str.length - 1] !== 'c') genHappyStr(len - 1, str + 'c');
  };

  genHappyStr(n, 'a');
  genHappyStr(n, 'b');
  genHappyStr(n, 'c');

  // return target element with k or empty string
  return arr[k - 1] || '';
}
