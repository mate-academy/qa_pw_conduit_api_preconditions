import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let newPassword;

test.beforeEach(async ({ page, user, factories }) => {
  await signUpUser(page, user);

  newPassword = factories.user.generatePassword();
});

test('Login with new password after it was updated from settings', async ({
  editSettingsPage,
  viewUserProfilePage,
  signInPage,
  internalHomePage,
  user,
}) => {
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
