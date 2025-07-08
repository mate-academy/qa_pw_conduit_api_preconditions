import { test as base } from '@playwright/test';
import { UserFactory } from '../../src/factoryItems/UserFactory';
import { UserSettingsFactory } from '../../src/factoryItems/UserSettingsFactory';

export const test = base.extend<{
  factories;
}>({
  factories: async ({}, use) => {
    const factories = {
      user: new UserFactory(),
      userSettings: new UserSettingsFactory(),
    };

    await use(factories);
  },
});
