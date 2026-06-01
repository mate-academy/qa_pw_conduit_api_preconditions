import { test } from '../../_fixtures/fixtures';
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';

let newPassword;

test.beforeEach(async ({ factories }) => {
  newPassword = factories.user.generatePassword();
});

test('Login with new password after it was updated from settings', async ({
  loggedInUserAndPage
}) => {
  const { page, registeredUser } = loggedInUserAndPage;
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
  await signInPage.fillEmailField(registeredUser.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();
  await internalHomePage.yourFeed.assertTabLinkVisible();
});
