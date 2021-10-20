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
      { suite: 'clubs', number: 1 },
      { suite: 'clubs', number: 2 },
      { suite: 'clubs', number: 3 },
      { suite: 'clubs', number: 4 },
      { suite: 'clubs', number: 5 },
      { suite: 'clubs', number: 6 },
      { suite: 'clubs', number: 7 },
      { suite: 'clubs', number: 8 },
      { suite: 'clubs', number: 9 },
    ];
  });

  it('deals the first 4 cards of the deck', () => {
    const { result } = renderHook(() => useDeck(GameModes.Standard));
    const { dealt } = result.current;
    expect(dealt).toHaveLength(4);
    expect(dealt.map((c) => c!.number)).toEqual([1, 2, 3, 4])
  });

  it('can deal the next 4 cards', () => {
    const { result } = renderHook(() => useDeck(GameModes.Standard));
    const { deal } = result.current;

    act(() => deal());

    expect(result.current.dealt.map((c) => c!.number)).toEqual([5, 6, 7, 8])
  });

  describe('when the deck is less than 4', () => {
    let result: RenderResult<ReturnType<typeof useDeck>>; 

    beforeEach(() => {
      result = renderHook(() => useDeck(GameModes.Standard)).result;
      act(() => result.current.deal());
    });

    it('deals a smaller amount of cards', () => {
      act(() => result.current.deal())
      expect(result.current.dealt.map((c) => c!.number)).toEqual([9]);
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
