import { useCallback, useState } from 'react';
import { GameModes } from '../Game';
import Decks from './decks';
import { ICard } from './Card';
import { shuffleArray } from '../utils';

type Dealt = [ICard?, ICard?, ICard?, ICard?];

type UseDeal = (mode: keyof typeof GameModes) => {
  // deck: ICard[],
  dealt: Dealt,
  // deal: () => void;
}

const useDeck: UseDeal = (mode) => {
  const [deck, setDeck] = useState<ICard[]>(shuffleArray(Decks[mode]));
  const sliceAmount = deck.length >= 4 ? 4 : deck.length;

  // const deal = useCallback(() => {
  //   console.log('dealing cards');
  //   const newDeck = deck.slice(sliceAmount);
  //   setDeck(newDeck);
  // }, [setDeck, deck]);

  // console.log('hook running');


  return {
    // deal,
    dealt: deck.slice(0, sliceAmount) as Dealt,
    // deck: deck.slice(sliceAmount),
  };
};

export default useDeck;
