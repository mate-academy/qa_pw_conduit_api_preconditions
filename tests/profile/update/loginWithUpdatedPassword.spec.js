import { test } from '../../_fixtures/fixtures';

let newPassword;

test.beforeEach(async ({ factories }) => {
  newPassword = factories.user.generatePassword();
});

test('Login with new password after it was updated from settings', async ({
  editSettingsPage,
  viewUserProfilePage,
  signInPage,
  internalHomePage,
  loggedInUserAndPage,
}) => {
  const { registeredUser } = loggedInUserAndPage;
  await editSettingsPage.open();
  await editSettingsPage.fillNewPasswordField(newPassword);
  await editSettingsPage.clickUpdateSettingsButton();
  await viewUserProfilePage.clickEditProfileSettingsLink();
  await editSettingsPage.clickLogoutButton();
  await signInPage.open();
  await signInPage.fillEmailField(registeredUser.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();
  await internalHomePage.yourFeed.assertTabLinkVisible();
});
