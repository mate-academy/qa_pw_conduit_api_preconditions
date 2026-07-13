import { test } from '../../_fixtures/fixtures';
import { loggedInUserAndPage } from '../../../src/ui/actions/auth/loggedInUserAndPage';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/ui/constants/authErrorMessages';

let newPassword;

test.beforeEach(async ({ page, user, factories }) => {
  await loggedInUserAndPage(page, user);

  newPassword = factories.user.generatePassword();
});

test('Login with old password after it was updated from settings', async ({
  editSettingsPage,
  viewUserProfilePage,
  signInPage,
  user,
}) => {
  await editSettingsPage.open();
  await editSettingsPage.fillNewPasswordField(newPassword);
  await editSettingsPage.clickUpdateSettingsButton();
  await viewUserProfilePage.clickEditProfileSettingsLink();
  await editSettingsPage.clickLogoutButton();
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();
  await signInPage.assertErrorMessageContainsText(
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  );
});
