import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/ui/constants/authErrorMessages';

let newPassword;

test.beforeEach(async ({ page, user, factories, loggedInUserAndPage }) => {
   const internalHomePage = new InternalHomePage(loggedInUserAndPage.page);
    const createArticlePage = new CreateArticlePage(page); 

  await internalHomePage.open();

  newPassword = factories.user.generatePassword();
});

test('Login with old password after it was updated from settings', async ({
  editSettingsPage,
  viewUserProfilePage,
  signInPage,
  user
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
