import { useCallback, useState } from 'react';
import { GameModes } from '../Game';
import Decks, { Card } from './decks';
import { shuffleArray } from '../utils';

type Dealt = [Card?, Card?, Card?, Card?];

type UseDeal = (mode: keyof typeof GameModes) => {
  deck: Card[],
  dealt: Dealt,
  deal: () => void;
}

const useDeck: UseDeal = (mode) => {
  const [deck, setDeck] = useState<Card[]>(shuffleArray(Decks[mode]));
  const sliceAmount = deck.length >= 4 ? 4 : deck.length;

  const deal = useCallback(() => {
    console.log('dealing cards');
    const newDeck = deck.slice(sliceAmount);
    setDeck(newDeck);
  }, [setDeck, deck]);

  console.log('hook running');


  return {
    deal,
    dealt: deck.slice(0, sliceAmount) as Dealt,
    deck: deck.slice(sliceAmount),
  };
};

export default useDeck;
