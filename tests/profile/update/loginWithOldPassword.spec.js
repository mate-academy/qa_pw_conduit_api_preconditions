import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/ui/constants/authErrorMessages';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage';
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';

test('Login with old password after it was updated from settings', async ({
  loggedInUserAndPage,
  factories,
}) => {
  const { page, registeredUser } = loggedInUserAndPage;

  const internalHomePage = new InternalHomePage(page);
  const editSettingsPage = new EditProfileSettingsPage(page);
  const viewUserProfilePage = new ViewUserProfilePage(page);
  const signInPage = new SignInPage(page);

  const newPassword = factories.user.generatePassword();

  await internalHomePage.open();
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
