import { test } from '../../_fixtures/fixtures';

test('Successful `Sign in` flow test', async ({
  signInPage,
  internalHomePage,
  registeredUser,
}) => {
  await signInPage.open();
  await signInPage.fillEmailField(registeredUser.email);
  await signInPage.fillPasswordField(registeredUser.password);
  await signInPage.clickSignInButton();

  await internalHomePage.yourFeed.assertTabLinkVisible();
});
