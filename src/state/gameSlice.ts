import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlayCard } from '../decks/PlayCard';
import { shuffleArray } from '../utils';

export interface GameState {
  room: [IPlayCard?, IPlayCard?, IPlayCard?, IPlayCard?];
  dungeon: IPlayCard[];
  justRan: boolean;
  progress: number;
  hp: number;
  shield: number;
  shieldRank: number;
  xp: number;
  potionSickness: number;
}

const initialState: GameState = {
  room: [],
  dungeon: [],
  justRan: false,
  progress: 44,
  hp: 21,
  shield: 0,
  shieldRank: 0,
  xp: 0,
  potionSickness: 0,
};

const gameSlice = createSlice({
  initialState,
  name: 'game',
  reducers: {
    playCard(state, action: PayloadAction<IPlayCard>) {
      const index = state.room.findIndex((c) => {
        if (!c) {
          return false;
        }

        return c.suit === action.payload.suit && c.rank === action.payload.rank;
      });

      const card = state.room[index];
      if (index === -1 || !card) {
        // eslint-disable-next-line no-console
        console.warn('Trying to play a card that is not currently in the room');
        return;
      }

      card.played = true;
    },

    dealRoom(state, action: PayloadAction<{ didRun?: boolean }>) {
      const unplayedCards = state.room.filter((c) => !c?.played);
      state.dungeon = state.dungeon.concat((unplayedCards as IPlayCard[]));
      state.room = state.dungeon.splice(0, 4) as GameState['room'];
      state.justRan = !!action.payload.didRun;
      state.potionSickness = 0;
    },

    dealGame(state, action: PayloadAction<{ deck: IPlayCard[], shuffle: boolean }>) {
      let cards = action.payload.deck;
      if (action.payload.shuffle) {
        cards = shuffleArray(action.payload.deck);
      }

      const [a, b, c, d, ...rest] = cards;
      state.room = [a, b, c, d];
      state.dungeon = rest;
    },

    addHealth(state, action: PayloadAction<number>) {
      const isPotionCard = action.payload > 0;
      if (isPotionCard && state.potionSickness > 0) {
        return;
      }

      const desiredHp = state.hp + action.payload;
      let newHp = desiredHp;

      if (desiredHp > 21) {
        newHp = 21;
      } else if (desiredHp < 0) {
        newHp = 0;
      }

      state.hp = newHp;

      if (action.payload > 0) {
        state.potionSickness += 1;
      }
    },
  },
});

export const {
  dealRoom,
  dealGame,
  playCard,
  addHealth,
} = gameSlice.actions;
export default gameSlice.reducer;
