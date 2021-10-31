import Decks from '../../decks/decks';
import { IPlayCard } from '../../decks/PlayCard';
import reducer, { DeckState, dealRoom, shuffleDeck } from '../deckSlice';

describe('deckSlice', () => {
  let initialState: DeckState;
  
  let oneOfClubs: IPlayCard;
  let twoOfClubs: IPlayCard;
  let threeOfClubs: IPlayCard;
  let fourOfClubs: IPlayCard;
  let fiveOfClubs: IPlayCard;
  let sixOfClubs: IPlayCard;
  let sevenOfClubs: IPlayCard;
  let eightOfClubs: IPlayCard;
  let nineOfClubs: IPlayCard;

  beforeEach(() => {
    oneOfClubs = { suit: 'clubs', rank: 1 };
    twoOfClubs = { suit: 'clubs', rank: 2 };
    threeOfClubs = { suit: 'clubs', rank: 3 };
    fourOfClubs = { suit: 'clubs', rank: 4 };
    fiveOfClubs = { suit: 'clubs', rank: 5 };
    sixOfClubs = { suit: 'clubs', rank: 6 };
    sevenOfClubs = { suit: 'clubs', rank: 7 };
    eightOfClubs = { suit: 'clubs', rank: 8 };
    nineOfClubs = { suit: 'clubs', rank: 9 };

    initialState = {
      room: [
        oneOfClubs,
        twoOfClubs,
        threeOfClubs,
        fourOfClubs,
      ],
      dungeon: [
        fiveOfClubs,
        sixOfClubs,
        sevenOfClubs,
        eightOfClubs,
        nineOfClubs,
      ],
    };
  });

  describe('shuffleDeck', () => {
    it('can shuffle a standard deck', () => {
      const newState = reducer(initialState, shuffleDeck(Decks.Standard));
      expect(newState).not.toEqual(initialState);
      expect(newState.room).toHaveLength(4);
      expect(newState.dungeon).toHaveLength(Decks.Standard.length - 4);
    });
  });

  describe('dealRoom', () => {
    it('can deal another room', () => {
      const newState = reducer(initialState, dealRoom());
      expect(newState).toEqual(expect.objectContaining({
        room: [
          fiveOfClubs,
          sixOfClubs,
          sevenOfClubs,
          eightOfClubs,
        ],
      }));
    });

    it('puts the unplayed cards in the room back in the deck', () => {
      initialState.room[1]!.played = true;
      const newState = reducer(initialState, dealRoom());
      expect(newState).toEqual(expect.objectContaining({
        dungeon: [
          nineOfClubs,
          oneOfClubs,
          threeOfClubs,
          fourOfClubs,
        ],
      }));
    });
  });
});
