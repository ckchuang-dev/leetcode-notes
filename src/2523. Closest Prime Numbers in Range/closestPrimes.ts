// find primes with Sieve of Eratosthenes algo.
function findPrimes(min: number, max: number): number[] {
  if (max < 2) return [];

  const isPrimeArr = Array.from({ length: max + 1 }, () => true);

  isPrimeArr[0] = false;
  isPrimeArr[1] = false;

  for (let i = 2; i <= Math.sqrt(max); i++) {
    if (isPrimeArr[i]) {
      for (let j = 2; i * j <= max; j++) {
        isPrimeArr[i * j] = false;
      }
    }
  }

  return isPrimeArr.reduce<number[]>((accu, curr, index) => {
    if (curr && index >= min) {
      accu.push(index);
    }
    return accu;
  }, []);
}

function closestPrimes(left: number, right: number): number[] {
  const primes = findPrimes(left, right);

  if (primes.length < 2) {
    return [-1, -1];
  }

  let minDiff = Infinity;
  let [num1, num2] = [-1, -1];

  for (let i = 1; i < primes.length; i++) {
    const newDiff = primes[i] - primes[i - 1];
    if (newDiff < minDiff) {
      minDiff = newDiff;
      [num1, num2] = [primes[i - 1], primes[i]];
    }

    if (newDiff === 2) {
      break;
    }
  }

  return [num1, num2];
}
