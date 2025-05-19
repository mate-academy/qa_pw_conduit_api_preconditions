import { test } from '../../_fixtures/fixtures';

test('Successful `Sign up` flow test', async ({
  newUserData,
  signUpPage,
  internalHomePage,
}) => {
  await signUpPage.open();
  await signUpPage.fillUsernameField(newUserData.username);
  await signUpPage.fillEmailField(newUserData.email);
  await signUpPage.fillPasswordField(newUserData.password);
  await signUpPage.clickSignUpButton();

  await internalHomePage.yourFeed.assertTabLinkVisible();
});
