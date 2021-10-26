import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import PlayCard, { IPlayCard } from '../PlayCard';

type TableData = [
  IPlayCard['suit'],
  IPlayCard['rank'],
  string,
  boolean,
];

const testData: TableData[] = [
  ['hearts', 5, 'Potion', true],
  ['diamonds', 5, 'Shield', true],
  ['joker', 5, 'Demon', false],
  ['jack', 5, 'Demon', false],
  ['spades', 5, 'Demon', false],
  ['clubs', 5, 'Demon', false],
];

describe.each(testData)('PlayCard', (suit, rank, expectedKind, isPositive) => {
  let component: RenderAPI;
  let pressEvent: jest.Mock;

  beforeEach(() => {
    pressEvent = jest.fn();

    component = render(
      <PlayCard
        onPress={pressEvent}
        suit={suit}
        rank={rank}
      />,
    );
  });

  it('displays the rank and suit', () => {
    let expectedPoints: string;
    if (isPositive) {
      expectedPoints = `${rank}`;
    } else {
      expectedPoints = `-${rank}`;
    }

    expect(component.queryByText(expectedPoints)).toBeTruthy();
    expect(component.queryByText(suit)).toBeTruthy();
  });

  it('displays the kind in the game', () => {
    expect(component.queryByText(expectedKind)).toBeTruthy();
  });

  it('has some a11y', () => {
    const points = isPositive ? rank : -rank;
    const label = `${expectedKind} card, ${points} points`;

    expect(component.queryByA11yLabel(label)).toBeTruthy();
    // TODO: should this say like "Press to fight/heal/restore shield"
  });

  it('can do stuff when pressed', () => {
    fireEvent.press(component.getByText(expectedKind));
    expect(pressEvent).toHaveBeenCalledTimes(1);

    let expectedHpChange: number;
    if (suit === 'hearts') {
      expectedHpChange = rank;
    } else if (suit === 'diamonds') {
      expectedHpChange = 0;
    } else {
      expectedHpChange = -rank;
    }

    expect(pressEvent).toHaveBeenCalledWith(expectedHpChange);
  });
});
