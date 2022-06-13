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
      // await expect(element(by.text('Progress: 44'))).toBeVisible();

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

      await expect(element(by.label('HP: 21'))).toBeVisible();
      await expect(element(by.label('HP: 20'))).not.toBeVisible();
      await demonCard.tap();
      await expect(element(by.label('HP: 21'))).not.toBeVisible();
      await expect(element(by.label('HP: 20'))).toBeVisible();

      await expect(demonCard).not.toBeVisible();
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

    // TODO: double check this is the desired behavior
    it.todo('shuffles cards back into deck after running');

    it.todo('shuffles cards back into the deck when proceeding to the next room');
  });

  describe('monster cards', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
      await startGame([
        { suit: 'clubs', rank: 4 },
      ]);
    });

    it('subtracts HP when fighting without a sheild', async () => {
      await expect(element(by.label('HP: 21'))).toBeVisible();
      await expect(element(by.label('HP: 17'))).not.toBeVisible();

      await element(by.label('Demon card, -4 points')).tap();

      await expect(element(by.label('HP: 21'))).not.toBeVisible();
      await expect(element(by.label('HP: 17'))).toBeVisible();
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
      await expect(element(by.label('HP: 11'))).toBeVisible();
      await expect(element(by.label('HP: 13'))).not.toBeVisible();

      await element(by.label('Potion card, 2 points')).tap();

      await expect(element(by.label('HP: 11'))).not.toBeVisible();
      await expect(element(by.label('HP: 13'))).toBeVisible();
    });

    it('only adds the first HP card', async () => {
      await element(by.label('Potion card, 2 points')).tap();
      await expect(element(by.label('HP: 13'))).toBeVisible();

      await element(by.label('Potion card, 3 points')).tap();
      await expect(element(by.label('HP: 16'))).not.toBeVisible();
      await expect(element(by.label('HP: 13'))).toBeVisible();
    });

    it('can fight a monster after taking a potion', async () => {
      await element(by.label('Potion card, 2 points')).tap();
      await expect(element(by.label('HP: 13'))).toBeVisible();

      await element(by.label('Demon card, -5 points')).tap();
      await expect(element(by.label('HP: 8'))).toBeVisible();
    });

    it('can add additional potion cards in the next room', async () => {
      await element(by.label('Demon card, -5 points')).tap();
      await element(by.label('Potion card, 2 points')).tap();

      await expect(element(by.label('HP: 8'))).toBeVisible();
      await expect(element(by.label('Potion card, 4 points'))).not.toBeVisible();
      await element(by.text('NEXT ROOM')).tap();
      await expect(element(by.label('Potion card, 4 points'))).toBeVisible();

      await expect(element(by.label('HP: 12'))).not.toBeVisible();
      await element(by.label('Potion card, 4 points')).tap();
      await expect(element(by.label('HP: 12'))).toBeVisible();
    });
  });

  describe('shield cards', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
      await startGame([
        { suit: 'diamonds', rank: 8 },
        { suit: 'diamonds', rank: 5 },
        { suit: 'clubs', rank: 7 },
        { suit: 'clubs', rank: 6 },
        { suit: 'hearts', rank: 2 },
      ]);
    });

    describe('when a shield is selected', () => {
      it('indicates that it is selected', async () => {
        await expect(element(by.label('(Active) Shield card, 8 blocking points'))).not.toBeVisible();
        await expect(element(by.label('BP: 0'))).toBeVisible();
        await expect(element(by.label('SR: 0'))).toBeVisible();
        await expect(element(by.label('BP: 8'))).not.toBeVisible();

        await element(by.label('Shield card, 8 blocking points')).tap();

        await expect(element(by.label('BP: 0'))).not.toBeVisible();
        await expect(element(by.label('BP: 8'))).toBeVisible();
        await expect(element(by.label('SR: 0'))).toBeVisible();
        await expect(element(by.label('(Active) Shield card, 8 blocking points'))).toBeVisible();
      });

      it('replaces any already selected shields', async () => {
        await element(by.label('Shield card, 8 blocking points')).tap();
        await expect(element(by.label('BP: 8'))).toBeVisible();
        await expect(element(by.label('SR: 0'))).toBeVisible();
        await expect(element(by.label('(Active) Shield card, 8 blocking points'))).toBeVisible();

        await element(by.label('Demon card, -6 points')).tap();
        await expect(element(by.label('SR: 6'))).toBeVisible();
        await expect(element(by.label('BP: 5'))).not.toBeVisible();
        await expect(element(by.label('SR: 0'))).not.toBeVisible();
        await expect(element(by.label('(Active) Shield card, 5 blocking points'))).not.toBeVisible();

        await element(by.label('Shield card, 5 blocking points')).tap();
        await expect(element(by.label('BP: 8'))).not.toBeVisible();
        await expect(element(by.label('SR: 6'))).not.toBeVisible();
        await expect(element(by.label('(Active) Shield card, 8 blocking points'))).not.toBeVisible();

        await expect(element(by.label('BP: 5'))).toBeVisible();
        await expect(element(by.label('SR: 0'))).toBeVisible();
        await expect(element(by.label('(Active) Shield card, 5 blocking points'))).toBeVisible();
      });

      it('separates the shield across rooms', async () => {
        await element(by.label('Shield card, 5 blocking points')).tap();
        await element(by.label('Shield card, 8 blocking points')).tap();
        await element(by.label('Demon card, -7 points')).tap();
        await element(by.text('NEXT ROOM')).tap();

        await expect(element(by.label('BP: 8'))).toBeVisible();
        await expect(element(by.label('SR: 7'))).toBeVisible();
        await expect(element(by.label('(Active) Shield card, 8 blocking points'))).toBeVisible();
      });
    });

    it('blocks the damage to up to the blocking rank', async () => {
      await expect(element(by.label('HP: 21'))).toBeVisible();
      await expect(element(by.label('HP: 20'))).not.toBeVisible();
      await element(by.label('Shield card, 5 blocking points')).tap();
      await element(by.label('Demon card, -6 points')).tap();
      await expect(element(by.label('HP: 21'))).not.toBeVisible();
      await expect(element(by.label('HP: 20'))).toBeVisible();

      await element(by.label('Shield card, 8 blocking points')).tap();
      await element(by.label('Demon card, -7 points')).tap();
      await expect(element(by.label('HP: 20'))).toBeVisible();
    });

    it('sets the shield rank to the rank of the last enemy it was used against', async () => {
      await element(by.label('Shield card, 8 blocking points')).tap();
      await expect(element(by.label('SR: 0'))).toBeVisible();
      await expect(element(by.label('SR: 7'))).not.toBeVisible();
      await expect(element(by.label('SR: 6'))).not.toBeVisible();

      await element(by.label('Demon card, -7 points')).tap();
      await expect(element(by.label('SR: 0'))).not.toBeVisible();
      await expect(element(by.label('SR: 7'))).toBeVisible();
      await expect(element(by.label('SR: 6'))).not.toBeVisible();

      await element(by.label('Demon card, -6 points')).tap();
      await expect(element(by.label('SR: 0'))).not.toBeVisible();
      await expect(element(by.label('SR: 7'))).not.toBeVisible();
      await expect(element(by.label('SR: 6'))).toBeVisible();
    });

    it('does not set shield rank when no shield is equiped', async () => {
      await expect(element(by.label('SR: 0'))).toBeVisible();
      await expect(element(by.label('SR: 6'))).not.toBeVisible();
      await element(by.label('Demon card, -6 points')).tap();
      await expect(element(by.label('SR: 0'))).toBeVisible();
      await expect(element(by.label('SR: 6'))).not.toBeVisible();
    });

    it('does not set shield rank when playing a potion card', async () => {
      await element(by.label('Shield card, 8 blocking points')).tap();
      await expect(element(by.label('BP: 8'))).toBeVisible();
      await expect(element(by.label('SR: 0'))).toBeVisible();

      await element(by.label('Demon card, -7 points')).tap();
      await element(by.label('Demon card, -6 points')).tap();
      await expect(element(by.label('BP: 8'))).toBeVisible();
      await expect(element(by.label('SR: 6'))).toBeVisible();
      await element(by.label('NEXT ROOM')).tap();

      await element(by.label('Potion card, 2 points')).tap();
      await expect(element(by.label('SR: 2'))).not.toBeVisible();
      await expect(element(by.label('BP: 8'))).toBeVisible();
      await expect(element(by.label('SR: 6'))).toBeVisible();
    });

    it('can not increase shield rank', async () => {
      await expect(element(by.label('SR: 6'))).not.toBeVisible();
      await element(by.label('Shield card, 8 blocking points')).tap();
      await expect(element(by.label('SR: 0'))).toBeVisible();
      await element(by.label('Demon card, -6 points')).tap();
      await expect(element(by.label('SR: 6'))).toBeVisible();
      await expect(element(by.label('SR: 0'))).not.toBeVisible();

      await element(by.label('Demon card, -7 points')).tap();
      await expect(element(by.label('SR: 7'))).not.toBeVisible();
      // shield broke so it's back to 0 instead of remaining at 6
      await expect(element(by.label('SR: 0'))).toBeVisible();
    });

    it('does not modify HP by selecting a shield', async () => {
      await expect(element(by.label('HP: 21'))).toBeVisible();
      await element(by.label('Demon card, -7 points')).tap();
      await expect(element(by.label('HP: 14'))).toBeVisible();
      await expect(element(by.label('HP: 21'))).not.toBeVisible();
      await expect(element(by.label('HP: 19'))).not.toBeVisible();
      await expect(element(by.label('HP: 9'))).not.toBeVisible();

      await element(by.label('Shield card, 5 blocking points')).tap();
      await expect(element(by.label('HP: 14'))).toBeVisible();
      await expect(element(by.label('HP: 21'))).not.toBeVisible();
      await expect(element(by.label('HP: 19'))).not.toBeVisible();
      await expect(element(by.label('HP: 9'))).not.toBeVisible();
    });

    it('breaks when used against an enemy with higher damage than shield rank', async () => {
      await element(by.label('Shield card, 8 blocking points')).tap();
      await element(by.label('Demon card, -6 points')).tap();

      await expect(element(by.label('(Active) Shield card, 8 blocking points'))).toBeVisible();
      await expect(element(by.label('BP: 8'))).toBeVisible();
      await expect(element(by.label('SR: 6'))).toBeVisible();
      await expect(element(by.label('BP: 0'))).not.toBeVisible();
      await expect(element(by.label('SR: 0'))).not.toBeVisible();

      await element(by.label('Demon card, -7 points')).tap();
      await expect(element(by.label('(Active) Shield card, 8 blocking points'))).not.toBeVisible();
      await expect(element(by.label('BP: 8'))).not.toBeVisible();
      await expect(element(by.label('SR: 6'))).not.toBeVisible();
      await expect(element(by.label('BP: 0'))).toBeVisible();
      await expect(element(by.label('SR: 0'))).toBeVisible();
      await expect(element(by.label('HP: 21'))).toBeVisible();
    });

    it('does not break when used without a rank', async () => {
      await element(by.label('Shield card, 5 blocking points')).tap();
      await expect(element(by.label('(Active) Shield card, 5 blocking points'))).toBeVisible();
      await expect(element(by.label('BP: 5'))).toBeVisible();
      await expect(element(by.label('SR: 0'))).toBeVisible();
      await expect(element(by.label('HP: 21'))).toBeVisible();
      await expect(element(by.label('HP: 19'))).not.toBeVisible();

      await element(by.label('Demon card, -7 points')).tap();
      await expect(element(by.label('(Active) Shield card, 5 blocking points'))).toBeVisible();
      await expect(element(by.label('BP: 5'))).toBeVisible();
      await expect(element(by.label('SR: 7'))).toBeVisible();
      await expect(element(by.label('SR: 0'))).not.toBeVisible();
      await expect(element(by.label('HP: 21'))).not.toBeVisible();
      await expect(element(by.label('HP: 19'))).toBeVisible();
    });

    it('can play a little game', async () => {
      await startGame([
        { suit: 'diamonds', rank: 8 },
        { suit: 'clubs', rank: 5 },
        { suit: 'clubs', rank: 4 },
        { suit: 'clubs', rank: 6 },
      ]);
      await element(by.label('Shield card, 8 blocking points')).tap();
      await expect(element(by.label('(Active) Shield card, 8 blocking points'))).toBeVisible();
      await expect(element(by.label('HP: 21'))).toBeVisible();
      await expect(element(by.label('BP: 8'))).toBeVisible();
      await expect(element(by.label('SR: 0'))).toBeVisible();
      await element(by.label('Demon card, -5 points')).tap();
      await expect(element(by.label('HP: 21'))).toBeVisible();
      await expect(element(by.label('SR: 5'))).toBeVisible();
      await element(by.label('Demon card, -4 points')).tap();
      await expect(element(by.label('HP: 21'))).toBeVisible();
      await expect(element(by.label('(Active) Shield card, 8 blocking points'))).toBeVisible();
      await expect(element(by.label('SR: 4'))).toBeVisible();
      await element(by.label('Demon card, -6 points')).tap();
      await expect(element(by.label('HP: 21'))).toBeVisible();
      await expect(element(by.label('(Active) Shield card, 8 blocking points'))).not.toBeVisible();
      await expect(element(by.label('BP: 0'))).toBeVisible();
      await expect(element(by.label('SR: 0'))).toBeVisible();
    });
  });
});
