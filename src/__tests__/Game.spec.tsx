import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Game from '../Game';
import { IPlayCard } from '../decks/PlayCard';
import { shuffleDeck } from '../state/gameSlice';
import { rootReducers } from '../state/store';

jest.mock('../utils', () => ({
  shuffleArray: (arr: any[]) => arr,
}));

const renderGame = (deck: IPlayCard[]): RenderAPI => {
  const store = configureStore({
    reducer: rootReducers,
  });
  store.dispatch(shuffleDeck(deck));

  return render((
    <ReduxProvider store={store}>
      <Game />
    </ReduxProvider>
  ));
};

describe(Game, () => {
  let component: RenderAPI;

  describe('shield cards', () => {
    it.todo('separates active shield cards');
  });

  // TODO: learn how shield rank works
});
