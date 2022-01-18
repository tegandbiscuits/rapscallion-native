import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './gameSlice';

export const rootReducers = {
  game: gameSlice,
};

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
