import { test } from '../../_fixtures/fixtures';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage';
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/ui/constants/authErrorMessages';

let newPassword;
let editSettingsPage;
let viewUserProfilePage;
let signInPage;

test.beforeEach(async ({ loggedInUserAndPage, factories }) => {
  const page = loggedInUserAndPage.page;

  editSettingsPage = new EditProfileSettingsPage(page);
  viewUserProfilePage = new ViewUserProfilePage(page);
  signInPage = new SignInPage(page);

  newPassword = factories.user.generatePassword();
});

test('Login with old password after it was updated from settings', async ({
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
