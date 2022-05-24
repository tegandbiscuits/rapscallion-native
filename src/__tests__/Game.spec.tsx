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

  describe('potion cards', () => {
    beforeEach(() => {
      component = renderGame([
        { suit: 'clubs', rank: 10 },
        { suit: 'clubs', rank: 5 },
        { suit: 'hearts', rank: 2 },
        { suit: 'hearts', rank: 3 },
        { suit: 'hearts', rank: 4 },
      ]);

      fireEvent.press(component.getByA11yLabel('Demon card, -10 points'));
    });

    it('is able to add to HP', () => {
      expect(component.queryByText(/HP: 11/)).toBeTruthy();
      expect(component.queryByText(/HP: 13/)).toBeFalsy();

      fireEvent.press(component.getByA11yLabel('Potion card, 2 points'));

      expect(component.queryByText(/HP: 11/)).toBeFalsy();
      expect(component.queryByText(/HP: 13/)).toBeTruthy();
    });

    it('only adds the first HP card', () => {
      fireEvent.press(component.getByA11yLabel('Potion card, 2 points'));
      expect(component.queryByText(/HP: 13/)).toBeTruthy();

      fireEvent.press(component.getByA11yLabel('Potion card, 3 points'));
      expect(component.queryByText(/HP: 16/)).toBeFalsy();
      expect(component.queryByText(/HP: 13/)).toBeTruthy();
    });

    it('can fight a monster after taking a potion', () => {
      fireEvent.press(component.getByA11yLabel('Potion card, 2 points'));
      expect(component.queryByText(/HP: 13/)).toBeTruthy();

      fireEvent.press(component.getByA11yLabel('Demon card, -5 points'));
      expect(component.queryByText(/HP: 8/)).toBeTruthy();
    });

    it('can add additional potion cards in the next room', () => {
      fireEvent.press(component.getByA11yLabel('Demon card, -5 points'));
      fireEvent.press(component.getByA11yLabel('Potion card, 2 points'));

      expect(component.queryByText(/HP: 8/)).toBeTruthy();
      expect(component.queryByA11yLabel('Potion card, 4 points')).toBeFalsy();
      fireEvent.press(component.getByText('Next Room'));
      expect(component.queryByA11yLabel('Potion card, 4 points')).toBeTruthy();

      expect(component.queryByText(/HP: 12/)).toBeFalsy();
      fireEvent.press(component.getByA11yLabel('Potion card, 4 points'));
      expect(component.queryByText(/HP: 12/)).toBeTruthy();
    });
  });

  describe('shield cards', () => {
    it.todo('separates active shield cards');
  });

  // TODO: learn how shield rank works
});
