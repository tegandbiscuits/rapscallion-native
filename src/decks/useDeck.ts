import { useCallback, useState } from 'react';
import { GameModes } from '../Game';
import Decks from './decks';
import { IPlayCard } from './PlayCard';
import { shuffleArray } from '../utils';

type Dealt = [IPlayCard?, IPlayCard?, IPlayCard?, IPlayCard?];

type UseDeal = (mode: keyof typeof GameModes) => {
  dealt: Dealt,
  deal: () => void;
};

const sliceAmount = 4;
const useDeck: UseDeal = (mode) => {
  const [deck, setDeck] = useState<IPlayCard[]>(shuffleArray(Decks[mode]));

  const deal = useCallback(() => {
    const newDeck = deck.slice(sliceAmount);
    setDeck(newDeck);
  }, [setDeck, deck]);

  return {
    deal,
    dealt: deck.slice(0, sliceAmount) as Dealt,
  };
};

export default useDeck;
