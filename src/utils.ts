import clone from 'clone';

export function shuffleArray<T = any>(arr: T[]): T[] {
  const copy = clone(arr);

  for (let counter = copy.length; counter > 0; counter--) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = copy[counter];
    copy[counter] = copy[index];
    copy[index] = temp;
  }

  return copy;
}

