import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlayCard } from '../decks/PlayCard';
import { shuffleArray } from '../utils';

export interface DeckState {
  room: [IPlayCard?, IPlayCard?, IPlayCard?, IPlayCard?];
  dungeon: IPlayCard[];
  justRan: boolean;
}

const initialState: DeckState = {
  room: [],
  dungeon: [],
  justRan: false,
};

const deckSlice = createSlice({
  initialState,
  name: 'deck',
  reducers: {
    dealRoom(state, action: PayloadAction<{ didRun?: boolean }>) {
      const unplayedCards = state.room.filter((c) => !c?.played);
      state.dungeon = state.dungeon.concat((unplayedCards as IPlayCard[]));
      state.room = state.dungeon.splice(0, 4) as DeckState['room'];
      state.justRan = !!action.payload.didRun;
    },
    shuffleDeck(state, action: PayloadAction<IPlayCard[]>) {
      const shuffledCards = shuffleArray(action.payload);
      const [a, b, c, d, ...rest] = shuffledCards;
      state.room = [a, b, c, d];
      state.dungeon = rest;
    },
  },
});

export const { dealRoom, shuffleDeck } = deckSlice.actions;
export default deckSlice.reducer;
