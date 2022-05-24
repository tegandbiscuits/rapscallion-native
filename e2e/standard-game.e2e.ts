import { device, expect } from 'detox';
import { IPlayCard } from '../src/decks/PlayCard';

const startGame = async (deck: IPlayCard[]) => {
  const deckParam = encodeURI(JSON.stringify(deck));
  const url = `rapscallion://game?deck=${deckParam}`;
  await device.openURL({ url });
};

describe('Standard game', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await startGame([
      { suit: 'clubs', rank: 1 },
      { suit: 'clubs', rank: 2 },
      { suit: 'hearts', rank: 2 },
      { suit: 'hearts', rank: 3 },
      { suit: 'clubs', rank: 5 },
    ]);
  });

  it('can go directly to a new game', async () => {
    await expect(element(by.text('Progress: 44'))).toBeVisible();

    await expect(element(by.label('Demon card, -1 points'))).toBeVisible();
    await expect(element(by.label('Demon card, -2 points'))).toBeVisible();
    await expect(element(by.label('Potion card, 2 points'))).toBeVisible();
    await expect(element(by.label('Potion card, 3 points'))).toBeVisible();
  });
});
