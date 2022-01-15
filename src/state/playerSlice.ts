import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayerState {
  progress: number;
  hp: number;
  shield: number;
  shieldRank: number;
  xp: number;
  potionSickness: number;
}

const initialState: PlayerState = {
  progress: 44,
  hp: 21,
  shield: 0,
  shieldRank: 0,
  xp: 0,
  potionSickness: 0,
};

const playerSlice = createSlice({
  initialState,
  name: 'player',
  reducers: {
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

export const { addHealth } = playerSlice.actions;
export default playerSlice.reducer;
