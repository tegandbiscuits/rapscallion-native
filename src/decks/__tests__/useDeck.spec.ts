import { renderHook, act, RenderResult } from '@testing-library/react-hooks';
import { GameModes } from '../../Game';
import Decks from '../decks';
import useDeck from '../useDeck';

jest.mock('../../utils', () => ({
  shuffleArray: (arr: any[]) => arr,
}));

describe(useDeck, () => {
  beforeEach(() => {
    Decks.Standard = [
      { suit: 'clubs', rank: 1 },
      { suit: 'clubs', rank: 2 },
      { suit: 'clubs', rank: 3 },
      { suit: 'clubs', rank: 4 },
      { suit: 'clubs', rank: 5 },
      { suit: 'clubs', rank: 6 },
      { suit: 'clubs', rank: 7 },
      { suit: 'clubs', rank: 8 },
      { suit: 'clubs', rank: 9 },
    ];
  });

  it('deals the first 4 cards of the deck', () => {
    const { result } = renderHook(() => useDeck(GameModes.Standard));
    const { dealt } = result.current;
    expect(dealt).toHaveLength(4);
    expect(dealt.map((c) => c!.rank)).toEqual([1, 2, 3, 4]);
  });

  it('can deal the next 4 cards', () => {
    const { result } = renderHook(() => useDeck(GameModes.Standard));
    const { deal } = result.current;

    act(() => deal());

    expect(result.current.dealt.map((c) => c!.rank)).toEqual([5, 6, 7, 8]);
  });

  describe('when the deck is less than 4', () => {
    let result: RenderResult<ReturnType<typeof useDeck>>; 

    beforeEach(() => {
      result = renderHook(() => useDeck(GameModes.Standard)).result;
      act(() => result.current.deal());
    });

    it('deals a smaller amount of cards', () => {
      act(() => result.current.deal());
      expect(result.current.dealt.map((c) => c!.rank)).toEqual([9]);
    });

    it('has an empty deck', () => {
      act(() => result.current.deal());
      act(() => result.current.deal());
      expect(result.current.dealt).toEqual([]);
    });

    it('does not throw an error trying to deal again', () => {
      act(() => result.current.deal());
      act(() => result.current.deal());

      expect(() => {
        act(() => result.current.deal());
      }).not.toThrowError();
      expect(result.current.dealt).toEqual([]);
    });
  });
});
