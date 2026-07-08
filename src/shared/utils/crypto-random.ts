/** cryptographically safe random integer in [0, max) */
export function secureRandom(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0]! % max;
}

/** cryptographically safe random float in [0, 1) */
export function secureRandomFloat(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0]! / (0xffffffff + 1);
}

/** cryptographically safe random ID segment */
export function secureRandomId(length = 9): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(36))
    .join('')
    .slice(0, length);
}
