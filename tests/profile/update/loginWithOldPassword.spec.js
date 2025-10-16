import { test } from '../../_fixtures/fixtures';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage'
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/ui/constants/authErrorMessages';

test('Login with old password after it was updated from settings', async ({
  loggedInUserAndPage,
  factories
}) => {
  const { page, registeredUser } = loggedInUserAndPage;
  const newPassword = factories.user.generatePassword();

  const signInPage = new SignInPage(page);
  const editSettingsPage = new EditProfileSettingsPage(page);
  const viewUserProfilePage = new ViewUserProfilePage(page);

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
