import { test as base } from '@playwright/test';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage';
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';

export const test = base.extend<{
  editSettingsPage: EditProfileSettingsPage;
  viewUserProfilePage: ViewUserProfilePage;

}>({
  editSettingsPage: async ({ loggedInUserAndPage }, use) => {
    const editProfileSettingsPage = new EditProfileSettingsPage(loggedInUserAndPage.page);

    await use(editProfileSettingsPage);
  },
  viewUserProfilePage: async ({ loggedInUserAndPage }, use) => {
    const viewUserProfilePage = new ViewUserProfilePage(loggedInUserAndPage.page);

    await use(viewUserProfilePage);
  },
});
