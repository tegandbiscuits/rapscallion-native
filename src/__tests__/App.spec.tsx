import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import { rootReducers } from '../state/store';

describe(App, () => {
  let component: RenderAPI;

  beforeEach(() => {
    const store = configureStore({
      reducer: rootReducers,
    });

    component = render((
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    ));
  });

  it('has a title', () => {
    expect(component.queryByText('rapscallion')).toBeTruthy();
  });

  it('can start a game', () => {
    const label = /\w card, -?\d+ points/;
    expect(component.queryAllByA11yLabel(label)).toHaveLength(0);
    fireEvent.press(component.getByText('Standard'));
    expect(component.queryAllByA11yLabel(label)).toHaveLength(4);
  });
});
