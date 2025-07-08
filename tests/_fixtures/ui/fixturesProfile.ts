import { test as base } from '@playwright/test';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage';
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';

export const test = base.extend<{
  editSettingsPage;
  viewUserProfilePage;
}>({
  editSettingsPage: async ({ page }, use) => {
    const homePage = new EditProfileSettingsPage(page);

    await use(homePage);
  },
  viewUserProfilePage: async ({ page }, use) => {
    const homePage = new ViewUserProfilePage(page);

    await use(homePage);
  },
});
