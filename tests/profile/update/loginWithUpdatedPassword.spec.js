import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';
let newPassword;

test.beforeEach(async ({ page, user, loggedInUserAndPage }) => {
  const internalHomePage = new InternalHomePage(loggedInUserAndPage.page);
  const createArticlePage = new CreateArticlePage(page); 

  await internalHomePage.open();

});

test('Login with new password after it was updated from settings', async ({
  editSettingsPage,
  viewUserProfilePage,
  signInPage,
  internalHomePage,
  user,
  factories,
}) => {
   newPassword = factories.user.generatePassword();

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
