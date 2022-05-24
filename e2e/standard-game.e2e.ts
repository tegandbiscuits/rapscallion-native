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

  describe('playing cards', () => {
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

    it('has to play three cards to go to the next room', async () => {
      const firstDemon = element(by.label('Demon card, -1 points'));
      const secondDemon = element(by.label('Demon card, -2 points'));
      const firstPotion = element(by.label('Potion card, 2 points'));
      const secondPotion = element(by.label('Potion card, 3 points'));
      const thirdDemon = element(by.label('Demon card, -5 points'));

      await expect(firstDemon).toBeVisible();
      await expect(secondDemon).toBeVisible();
      await expect(firstPotion).toBeVisible();
      await expect(secondPotion).toBeVisible();
      await expect(thirdDemon).not.toBeVisible();

      const nextRoomButton = element(by.text('NEXT ROOM'));
      await nextRoomButton.tap();

      await expect(firstDemon).toBeVisible();
      await expect(secondDemon).toBeVisible();
      await expect(firstPotion).toBeVisible();
      await expect(secondPotion).toBeVisible();
      await expect(thirdDemon).not.toBeVisible();

      await firstDemon.tap();
      await secondDemon.tap();
      await firstPotion.tap();
      await nextRoomButton.tap();

      await expect(firstDemon).not.toBeVisible();
      await expect(secondDemon).not.toBeVisible();
      await expect(firstPotion).not.toBeVisible();
      await expect(secondPotion).toBeVisible();
      await expect(thirdDemon).toBeVisible();
    });

    it('can not play cards multiple times', async () => {
      const demonCard = element(by.label('Demon card, -1 points'));

      await expect(element(by.text('HP: 21'))).toBeVisible();
      await expect(element(by.text('HP: 20'))).not.toBeVisible();
      await demonCard.tap();
      await expect(element(by.text('HP: 21'))).not.toBeVisible();
      await expect(element(by.text('HP: 20'))).toBeVisible();

      await demonCard.tap();
      await expect(element(by.text('HP: 19'))).not.toBeVisible();
      await expect(element(by.text('HP: 20'))).toBeVisible();
    });

    it.todo('ends the game when the player runs out of HP');

    it.todo('ends the game when there are no unplayed cards');

    it.todo('track progress remaining');
  });
});
