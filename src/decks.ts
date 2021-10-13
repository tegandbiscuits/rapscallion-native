import clone from 'clone';
import { useCallback, useState } from 'react';
import { GameModes } from './Game';

interface Card {
  suite: 'joker' | 'jack' | 'spades' | 'hearts' | 'clubs' | 'diamonds',
  number: number
};

const decks: Record<keyof typeof GameModes, Card[]> = {
  Standard: [
    {suite: 'joker', number: 21},{suite: 'jack', number: 21},{suite: 'spades', number: 2},{suite: 'spades', number: 3},{suite: 'spades', number: 4},{suite: 'spades', number: 5},{suite: 'spades', number: 6},{suite: 'spades', number: 7},{suite: 'spades', number: 8},{suite: 'spades', number: 9},{suite: 'spades', number: 10},{suite: 'spades', number: 11},{suite: 'spades', number: 12},{suite: 'spades', number: 13},{suite: 'spades', number: 14},{suite: 'hearts', number: 2},{suite: 'hearts', number: 3},{suite: 'hearts', number: 4},{suite: 'hearts', number: 5},{suite: 'hearts', number: 6},{suite: 'hearts', number: 7},{suite: 'hearts', number: 8},{suite: 'hearts', number: 9},{suite: 'hearts', number: 10},{suite: 'hearts', number: 11},{suite: 'diamonds', number: 2},{suite: 'diamonds', number: 3},{suite: 'diamonds', number: 4},{suite: 'diamonds', number: 5},{suite: 'diamonds', number: 6},{suite: 'diamonds', number: 7},{suite: 'diamonds', number: 8},{suite: 'diamonds', number: 9},{suite: 'diamonds', number: 10},{suite: 'diamonds', number: 11},{suite: 'clubs', number: 2},{suite: 'clubs', number: 3},{suite: 'clubs', number: 4},{suite: 'clubs', number: 5},{suite: 'clubs', number: 6},{suite: 'clubs', number: 7},{suite: 'clubs', number: 8},{suite: 'clubs', number: 9},{suite: 'clubs', number: 10},{suite: 'clubs', number: 11},{suite: 'clubs', number: 12},{suite: 'clubs', number: 13},{suite: 'clubs', number: 14}
  ],
  // nohearts: [
  //   {suite: 'joker', number: 21},{suite: 'jack', number: 21},{suite: 'spades', number: 2},{suite: 'spades', number: 3},{suite: 'spades', number: 4},{suite: 'spades', number: 5},{suite: 'spades', number: 6},{suite: 'spades', number: 7},{suite: 'spades', number: 8},{suite: 'spades', number: 9},{suite: 'spades', number: 10},{suite: 'spades', number: 11},{suite: 'spades', number: 12},{suite: 'spades', number: 13},{suite: 'spades', number: 14},{suite: 'diamonds', number: 2},{suite: 'diamonds', number: 3},{suite: 'diamonds', number: 4},{suite: 'diamonds', number: 5},{suite: 'diamonds', number: 6},{suite: 'diamonds', number: 7},{suite: 'diamonds', number: 8},{suite: 'diamonds', number: 9},{suite: 'diamonds', number: 10},{suite: 'diamonds', number: 11},{suite: 'clubs', number: 2},{suite: 'clubs', number: 3},{suite: 'clubs', number: 4},{suite: 'clubs', number: 5},{suite: 'clubs', number: 6},{suite: 'clubs', number: 7},{suite: 'clubs', number: 8},{suite: 'clubs', number: 9},{suite: 'clubs', number: 10},{suite: 'clubs', number: 11},{suite: 'clubs', number: 12},{suite: 'clubs', number: 13},{suite: 'clubs', number: 14}
  // ],
  // noshields: [
  //   {suite: 'joker', number: 21},{suite: 'jack', number: 21},{suite: 'spades', number: 2},{suite: 'spades', number: 3},{suite: 'spades', number: 4},{suite: 'spades', number: 5},{suite: 'spades', number: 6},{suite: 'spades', number: 7},{suite: 'spades', number: 8},{suite: 'spades', number: 9},{suite: 'spades', number: 10},{suite: 'spades', number: 11},{suite: 'spades', number: 12},{suite: 'spades', number: 13},{suite: 'spades', number: 14},{suite: 'hearts', number: 2},{suite: 'hearts', number: 3},{suite: 'hearts', number: 4},{suite: 'hearts', number: 5},{suite: 'hearts', number: 6},{suite: 'hearts', number: 7},{suite: 'hearts', number: 8},{suite: 'hearts', number: 9},{suite: 'hearts', number: 10},{suite: 'hearts', number: 11},{suite: 'clubs', number: 2},{suite: 'clubs', number: 3},{suite: 'clubs', number: 4},{suite: 'clubs', number: 5},{suite: 'clubs', number: 6},{suite: 'clubs', number: 7},{suite: 'clubs', number: 8},{suite: 'clubs', number: 9},{suite: 'clubs', number: 10},{suite: 'clubs', number: 11},{suite: 'clubs', number: 12},{suite: 'clubs', number: 13},{suite: 'clubs', number: 14}
  // ]
};

function shuffleArray<T = any>(arr: T[]): T[] {
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

type Dealt = [Card?, Card?, Card?, Card?];
type UseDeal = (mode: keyof typeof GameModes) => {
  deck: Card[],
  dealt: Dealt,
  deal: () => void;
}

export const useDeck: UseDeal = (mode) => {
  const [deck, setDeck] = useState<Card[]>(shuffleArray(decks[mode]));

  const deal = useCallback(() => {
    console.log('dealing cards');
    const sliceAmount = deck.length >= 4 ? 4 : deck.length;
    const newDeck = deck.slice(sliceAmount);
    setDeck(newDeck);
  }, [setDeck, deck]);

  console.log('hook running');

  const sliceAmount = deck.length >= 4 ? 4 : deck.length;

  return {
    deal,
    dealt: deck.slice(0, sliceAmount) as Dealt,
    deck: deck.slice(sliceAmount),
  };
};
