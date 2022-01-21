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
});
