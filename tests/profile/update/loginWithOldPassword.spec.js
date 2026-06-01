import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/ui/constants/authErrorMessages';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage';

let newPassword;

test.beforeEach(async ({ factories }) => {
  newPassword = factories.user.generatePassword();
});

test('Login with old password after it was updated from settings', async ({
  loggedInUserAndPage
}) => {
  const { page, registeredUser } = loggedInUserAndPage;
  const signInPage = new SignInPage(page);
  const viewUserProfilePage = new ViewUserProfilePage(page);
  const editSettingsPage = new EditProfileSettingsPage(page);

  await editSettingsPage.open();
  await editSettingsPage.fillNewPasswordField(newPassword);
  await editSettingsPage.clickUpdateSettingsButton();
  await viewUserProfilePage.clickEditProfileSettingsLink();
  await editSettingsPage.clickLogoutButton();
  await signInPage.open();
  await signInPage.fillEmailField(registeredUser.email);
  await signInPage.fillPasswordField(registeredUser.password);
  await signInPage.clickSignInButton();
  await signInPage.assertErrorMessageContainsText(
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  );
});
