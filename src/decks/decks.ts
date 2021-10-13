import { GameModes } from '../Game';

export interface Card {
  suite: 'joker' | 'jack' | 'spades' | 'hearts' | 'clubs' | 'diamonds',
  number: number
};

const Decks: Record<keyof typeof GameModes, Card[]> = {
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

export default Decks;
