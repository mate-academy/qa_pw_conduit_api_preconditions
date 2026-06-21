import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage';

test('Login with new password after it was updated from settings', async ({
  factories,
  loggedInUserAndPage,
}) => {
  const page = loggedInUserAndPage.page;
  const user = loggedInUserAndPage.registeredUser;
  const newPassword = factories.user.generatePassword();
  const signInPage = new SignInPage(page);
  const internalHomePage = new InternalHomePage(page);
  const viewUserProfilePage = new ViewUserProfilePage(page);
  const editSettingsPage = new EditProfileSettingsPage(page);

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
