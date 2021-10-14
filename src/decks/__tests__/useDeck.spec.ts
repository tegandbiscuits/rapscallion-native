import { renderHook } from '@testing-library/react-hooks';
import { GameModes } from '../../Game';
import Decks from '../decks';
import useDeck from '../useDeck';

jest.mock('../../utils', () => ({
  shuffleArray: (arr: any[]) => arr,
}));

describe(useDeck, () => {
  beforeEach(() => {
    Decks.Standard = [
      { suite: 'clubs', number: 1 },
      { suite: 'clubs', number: 2 },
      { suite: 'clubs', number: 3 },
      { suite: 'clubs', number: 4 },
      { suite: 'clubs', number: 5 },
      { suite: 'clubs', number: 6 },
      { suite: 'clubs', number: 7 },
      { suite: 'clubs', number: 8 },
    ];
  });

  it('deals the first 4 cards of the deck', () => {
    const { result } = renderHook(() => useDeck(GameModes.Standard));
    const { dealt } = result.current;
    expect(dealt).toHaveLength(4);
    expect(dealt.map((c) => c!.number)).toEqual([1, 2, 3, 4])
  });

  it.todo('does not include the dealt cards in the deck');

  it.todo('can deal the next 4 cards');

  describe('when the deck is less than 4', () => {
    it.todo('deals a smaller amount of cards');

    it.todo('has an empty deck');

    it.todo('does not throw an error trying to deal again');
  });
});
