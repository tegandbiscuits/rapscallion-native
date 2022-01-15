/* eslint-disable import/prefer-default-export */
import clone from 'clone';

export const shuffleArray = <T = any>(arr: T[]): T[] => {
  const copy = clone(arr);

  for (let counter = copy.length; counter > 0; counter -= 1) {
    const index = Math.floor(Math.random() * counter);
    counter -= 1;
    const temp = copy[counter];
    copy[counter] = copy[index];
    copy[index] = temp;
  }

  return copy;
};
