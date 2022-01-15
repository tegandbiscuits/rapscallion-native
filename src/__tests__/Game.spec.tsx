import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Game from '../Game';
import Decks from '../decks/decks';
import { IPlayCard } from '../decks/PlayCard';
import { shuffleDeck } from '../state/deckSlice';
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

  beforeEach(() => {
    component = renderGame(Decks.Standard);
  });

  it('can render', () => {
    const text = component.queryByText('Progress: 44');
    expect(text).toBeTruthy();
  });

  it('presents four cards', () => {
    const cards = component.queryAllByA11yLabel(/\w+ card, -?\d+ points/);
    expect(cards).toHaveLength(4);
  });

  it.todo('has to play three cards to go to the next room');

  it.todo('can not play cards multiple times');

  describe('running', () => {
    beforeEach(() => {
      component.unmount();
      component = renderGame([
        { suit: 'clubs', rank: 1 },
        { suit: 'clubs', rank: 2 },
        { suit: 'clubs', rank: 3 },
        { suit: 'clubs', rank: 4 },
        { suit: 'clubs', rank: 5 },
        { suit: 'clubs', rank: 6 },
        { suit: 'clubs', rank: 7 },
        { suit: 'clubs', rank: 8 },
        { suit: 'clubs', rank: 9 },
      ]);
    });

    it('presents four different cards', () => {
      expect(component.queryByA11yLabel('Demon card, -1 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -2 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -3 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -4 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -5 points')).toBeFalsy();
      expect(component.queryByA11yLabel('Demon card, -6 points')).toBeFalsy();
      expect(component.queryByA11yLabel('Demon card, -7 points')).toBeFalsy();
      expect(component.queryByA11yLabel('Demon card, -8 points')).toBeFalsy();

      fireEvent.press(component.getByText('Run'));

      expect(component.queryByA11yLabel('Demon card, -1 points')).toBeFalsy();
      expect(component.queryByA11yLabel('Demon card, -2 points')).toBeFalsy();
      expect(component.queryByA11yLabel('Demon card, -3 points')).toBeFalsy();
      expect(component.queryByA11yLabel('Demon card, -4 points')).toBeFalsy();
      expect(component.queryByA11yLabel('Demon card, -5 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -6 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -7 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -8 points')).toBeTruthy();
    });

    it.todo('can not run after playing a card');

    it('can not be done after already running', () => {
      expect(component.queryByA11yLabel('Demon card, -1 points')).toBeTruthy();

      fireEvent.press(component.getByText('Run'));

      expect(component.queryByA11yLabel('Demon card, -5 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -6 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -7 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -8 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -9 points')).toBeFalsy();

      fireEvent.press(component.getByText('Run'));

      expect(component.queryByA11yLabel('Demon card, -9 points')).toBeFalsy();
      expect(component.queryByA11yLabel('Demon card, -5 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -6 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -7 points')).toBeTruthy();
      expect(component.queryByA11yLabel('Demon card, -8 points')).toBeTruthy();
    });

    it.todo('can be done after not running a round');
  });

  describe('monster cards', () => {
    beforeEach(() => {
      component.unmount();
      component = renderGame([
        { suit: 'clubs', rank: 4 },
      ]);
    });

    it('subtracts HP when fighting without a sheild', () => {
      expect(component.queryByText(/HP: 21/)).toBeTruthy();
      expect(component.queryByText(/HP: 17/)).toBeFalsy();

      fireEvent.press(component.getByA11yLabel('Demon card, -4 points'));

      expect(component.queryByText(/HP: 21/)).toBeFalsy();
      expect(component.queryByText(/HP: 17/)).toBeTruthy();
    });
  });

  describe('potion cards', () => {
    beforeEach(() => {
      component.unmount();
      component = renderGame([
        { suit: 'clubs', rank: 10 },
        { suit: 'hearts', rank: 2 },
        { suit: 'hearts', rank: 3 },
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

    it.todo('can add additional potion cards in the next room');
  });

  describe('shield cards', () => {
    it.todo('separates active shield cards');
  });

  // TODO: learn how shield rank works
});
