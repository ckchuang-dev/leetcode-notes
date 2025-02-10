export function clearDigits(s: string): string {
  const res: string[] = [];

  for (let c of s) {
    if (Number.isNaN(Number(c))) {
      res.push(c);
    } else {
      res.pop();
    }
  }

  return res.join('');
}
