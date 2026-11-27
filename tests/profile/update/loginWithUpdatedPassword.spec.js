import { test } from '../../_fixtures/fixtures';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';

test('Login with new password after it was updated from settings', async ({
  loggedInUserAndPage,
  factories,
}) => {
  const page = loggedInUserAndPage.page;
  const user = loggedInUserAndPage.registeredUser;

  const newPassword = factories.user.generatePassword();

  const editSettingsPage = new EditProfileSettingsPage(page);
  const viewUserProfilePage = new ViewUserProfilePage(page);
  const signInPage = new SignInPage(page);
  const internalHomePage = new InternalHomePage(page);

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
