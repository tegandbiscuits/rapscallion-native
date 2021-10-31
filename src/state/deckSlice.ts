import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlayCard } from '../decks/PlayCard';
import { shuffleArray } from '../utils';

export interface DeckState {
  room: [IPlayCard?, IPlayCard?, IPlayCard?, IPlayCard?];
  dungeon: IPlayCard[];
}

const initialState: DeckState = {
  room: [],
  dungeon: [],
};

const deckSlice = createSlice({
  initialState,
  name: 'deck',
  reducers: {
    dealRoom(state) {
      const unplayedCards = state.room.filter((c) => !c?.played);
      state.dungeon = state.dungeon.concat((unplayedCards as IPlayCard[]));
      state.room = state.dungeon.splice(0, 4) as DeckState['room'];
    },
    shuffleDeck(state, action: PayloadAction<IPlayCard[]>) {
      const shuffledCards = shuffleArray(action.payload);
      state.room = shuffledCards.splice(0, 4) as DeckState['room'];
      state.dungeon = shuffledCards;
    },
  },
});

export const { dealRoom, shuffleDeck } = deckSlice.actions;
export default deckSlice.reducer;
