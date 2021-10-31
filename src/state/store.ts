import { configureStore } from '@reduxjs/toolkit';
import deckSlice from './deckSlice';
import playerSlice from './playerSlice';

export const store = configureStore({
  reducer: {
    deck: deckSlice,
    player: playerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
