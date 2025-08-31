import { test } from '../../_fixtures/fixtures';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage';
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';

test('Login with new password after it was updated from settings', async ({
  loggedInUserAndPage,
  signInPage,
  factories,
  internalHomePage,
}) => {
  // Get user and Page from API
  const user = loggedInUserAndPage.registeredUser;
  const page = loggedInUserAndPage.page;

  const newPassword = factories.user.generatePassword();

  const editSettingsPage = new EditProfileSettingsPage(page);
  const viewUserProfilePage = new ViewUserProfilePage(page);

  await editSettingsPage.open();
  await editSettingsPage.fillNewPasswordField(newPassword);
  await editSettingsPage.clickUpdateSettingsButton();
  await viewUserProfilePage.clickEditProfileSettingsLink();
  await editSettingsPage.clickLogoutButton();
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();
  await internalHomePage.yourFeed.assertTabLinkVisible();
});
