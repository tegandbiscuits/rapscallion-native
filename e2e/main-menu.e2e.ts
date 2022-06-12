import { device, expect } from 'detox';

describe('Main menu', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('has a title', async () => {
    await expect(element(by.text('rapscallion'))).toBeVisible();
  });

  it('can start a standard game', async () => {
    const standardButton = element(by.text('STANDARD'));
    await expect(standardButton).toBeVisible();

    const health = element(by.label('HP: 21'));
    await expect(health).not.toBeVisible();
    await standardButton.tap();
    await expect(health).toBeVisible();
  });
});
