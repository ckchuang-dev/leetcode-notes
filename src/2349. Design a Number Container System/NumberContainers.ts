// TLE version
export class NumberContainersBad {
  private numberMap: Map<number, number>;

  constructor() {
    this.numberMap = new Map();
  }

  change(index: number, number: number): void {
    this.numberMap.set(index, number);
  }

  find(number: number): number {
    let min = Infinity;

    for (let [k, v] of this.numberMap) {
      if (v === number) {
        min = Math.min(min, k);
      }
    }

    return min === Infinity ? -1 : min;
  }
}

// AC without min-heap for TS
export class NumberContainers {
  private numbers: number[];
  private numberToIndices: Map<number, number[]>;

  constructor() {
    this.numbers = [];
    this.numberToIndices = new Map();
  }

  change(index: number, newNum: number): void {
    const oldNum = this.numbers[index];

    // handle old number
    if (oldNum !== undefined) {
      const oldIndices = this.numberToIndices.get(oldNum) || [];
      const removeIndex = oldIndices.indexOf(index);
      if (removeIndex !== -1) {
        oldIndices.splice(removeIndex, 1);
      }
    }

    // handle new number
    this.numbers[index] = newNum;
    const indices = this.numberToIndices.get(newNum) || [];

    // find sorted position for current index
    const insertPos = indices.findIndex((i) => i > index);
    indices.splice(insertPos === -1 ? indices.length : insertPos, 0, index);
    this.numberToIndices.set(newNum, indices);
  }

  find(number: number): number {
    return this.numberToIndices.get(number)?.[0] ?? -1;
  }
}
