import { SignUpPage } from '../../../src/ui/pages/auth/SignUpPage';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { test } from '../../_fixtures/fixtures';

test('Successful `Sign up` flow test', async ({ user, page }) => {
  const signUpPage = new SignUpPage(page);
  const internalHomePage = new InternalHomePage(page);

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();

  await internalHomePage.yourFeed.assertTabLinkVisible();
});
