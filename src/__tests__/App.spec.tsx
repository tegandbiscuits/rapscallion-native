import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import App from '../App';

describe(App, () => {
  let component: RenderAPI;

  beforeEach(() => {
    component = render(<App />);
  });

  it('has a title', () => {
    expect(component.queryByText('rapscallion')).toBeTruthy();
  });

  it('can start a game', () => {
    const label = /\w card, -?\d+ points/
    expect(component.queryAllByA11yLabel(label)).toHaveLength(0);
    fireEvent.press(component.getByText('Standard'));
    expect(component.queryAllByA11yLabel(label)).toHaveLength(4);
  });
});
