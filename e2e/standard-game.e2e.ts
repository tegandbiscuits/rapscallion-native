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

  describe('running', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
      await startGame([
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

    it('presents four different cards', async () => {
      await expect(element(by.label('Demon card, -1 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -2 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -3 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -4 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -5 points'))).not.toBeVisible();
      await expect(element(by.label('Demon card, -6 points'))).not.toBeVisible();
      await expect(element(by.label('Demon card, -7 points'))).not.toBeVisible();
      await expect(element(by.label('Demon card, -8 points'))).not.toBeVisible();

      await element(by.text('RUN')).tap();

      await expect(element(by.label('Demon card, -1 points'))).not.toBeVisible();
      await expect(element(by.label('Demon card, -2 points'))).not.toBeVisible();
      await expect(element(by.label('Demon card, -3 points'))).not.toBeVisible();
      await expect(element(by.label('Demon card, -4 points'))).not.toBeVisible();
      await expect(element(by.label('Demon card, -5 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -6 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -7 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -8 points'))).toBeVisible();
    });

    it('can not run after playing a card', async () => {
      await expect(element(by.label('Demon card, -1 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -2 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -3 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -4 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -5 points'))).not.toBeVisible();

      await element(by.label('Demon card, -1 points')).tap();
      await element(by.text('RUN')).tap();

      await expect(element(by.label('Demon card, -1 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -2 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -3 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -4 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -5 points'))).not.toBeVisible();
    });

    it('can not be done after already running', async () => {
      await expect(element(by.label('Demon card, -1 points'))).toBeVisible();

      await element(by.text('RUN')).tap();

      await expect(element(by.label('Demon card, -5 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -6 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -7 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -8 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -9 points'))).not.toBeVisible();

      await element(by.text('RUN')).tap();

      await expect(element(by.label('Demon card, -9 points'))).not.toBeVisible();
      await expect(element(by.label('Demon card, -5 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -6 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -7 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -8 points'))).toBeVisible();
    });

    it('can be done after not running a round', async () => {
      await expect(element(by.label('Demon card, -1 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -5 points'))).not.toBeVisible();

      await element(by.text('RUN')).tap();
      await expect(element(by.label('Demon card, -1 points'))).not.toBeVisible();
      await expect(element(by.label('Demon card, -5 points'))).toBeVisible();

      await element(by.text('RUN')).tap();
      await expect(element(by.label('Demon card, -5 points'))).toBeVisible();

      await element(by.label('Demon card, -5 points')).tap();
      await element(by.label('Demon card, -6 points')).tap();
      await element(by.label('Demon card, -7 points')).tap();
      await expect(element(by.label('Demon card, -9 points'))).not.toBeVisible();
      await element(by.text('NEXT ROOM')).tap();

      await expect(element(by.label('Demon card, -9 points'))).toBeVisible();
      await expect(element(by.label('Demon card, -4 points'))).not.toBeVisible();
      await element(by.text('RUN')).tap();
      await expect(element(by.label('Demon card, -4 points'))).toBeVisible();
    });
  });

  describe('monster cards', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
      await startGame([
        { suit: 'clubs', rank: 4 },
      ]);
    });

    it('subtracts HP when fighting without a sheild', async () => {
      await expect(element(by.text('HP: 21'))).toBeVisible();
      await expect(element(by.text('HP: 17'))).not.toBeVisible();

      await element(by.label('Demon card, -4 points')).tap();

      await expect(element(by.text('HP: 21'))).not.toBeVisible();
      await expect(element(by.text('HP: 17'))).toBeVisible();
    });
  });

  describe('potion cards', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
      await startGame([
        { suit: 'clubs', rank: 10 },
        { suit: 'clubs', rank: 5 },
        { suit: 'hearts', rank: 2 },
        { suit: 'hearts', rank: 3 },
        { suit: 'hearts', rank: 4 },
      ]);

      await element(by.label('Demon card, -10 points')).tap();
    });

    it('is able to add to HP', async () => {
      await expect(element(by.text('HP: 11'))).toBeVisible();
      await expect(element(by.text('HP: 13'))).not.toBeVisible();

      await element(by.label('Potion card, 2 points')).tap();

      await expect(element(by.text('HP: 11'))).not.toBeVisible();
      await expect(element(by.text('HP: 13'))).toBeVisible();
    });

    it('only adds the first HP card', async () => {
      await element(by.label('Potion card, 2 points')).tap();
      await expect(element(by.text('HP: 13'))).toBeVisible();

      await element(by.label('Potion card, 3 points')).tap();
      await expect(element(by.text('HP: 16'))).not.toBeVisible();
      await expect(element(by.text('HP: 13'))).toBeVisible();
    });

    it('can fight a monster after taking a potion', async () => {
      await element(by.label('Potion card, 2 points')).tap();
      await expect(element(by.text('HP: 13'))).toBeVisible();

      await element(by.label('Demon card, -5 points')).tap();
      await expect(element(by.text('HP: 8'))).toBeVisible();
    });

    it('can add additional potion cards in the next room', async () => {
      await element(by.label('Demon card, -5 points')).tap();
      await element(by.label('Potion card, 2 points')).tap();

      await expect(element(by.text('HP: 8'))).toBeVisible();
      await expect(element(by.label('Potion card, 4 points'))).not.toBeVisible();
      await element(by.text('NEXT ROOM')).tap();
      await expect(element(by.label('Potion card, 4 points'))).toBeVisible();

      await expect(element(by.text('HP: 12'))).not.toBeVisible();
      await element(by.label('Potion card, 4 points')).tap();
      await expect(element(by.text('HP: 12'))).toBeVisible();
    });
  });

  describe('shield cards', () => {
    it.todo('separates active shield cards');
  });

  // TODO: learn how shield rank works
});