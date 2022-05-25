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

    const progress = element(by.text('Progress: 44'));
    await expect(progress).not.toBeVisible();
    await standardButton.tap();
    await expect(progress).toBeVisible();
  });
});
