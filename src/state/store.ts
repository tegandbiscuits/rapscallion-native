import { configureStore } from '@reduxjs/toolkit';
import deckSlice from './deckSlice';
import playerSlice from './playerSlice';

export const rootReducers = {
  deck: deckSlice,
  player: playerSlice,
};

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
