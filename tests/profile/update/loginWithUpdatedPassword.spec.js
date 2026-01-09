import { test, expect } from '../../_fixtures/api/fixturesUsersApi';

let newPassword;

test.beforeEach(async ({ loggedInUserAndPage, factories }) => {
  // loggedInUserAndPage już ma gotowego użytkownika
  newPassword = factories.user.generatePassword();
});

test('Login with new password after it was updated from settings', async ({
  editSettingsPage,
  viewUserProfilePage,
  signInPage,
  internalHomePage,
  loggedInUserAndPage,
}) => {
  const user = loggedInUserAndPage.registeredUser;
  const page = loggedInUserAndPage.page;

  // Aktualizacja hasła
  await editSettingsPage.open();
  await editSettingsPage.fillNewPasswordField(newPassword);
  await editSettingsPage.clickUpdateSettingsButton();

  // Wylogowanie
  await viewUserProfilePage.clickEditProfileSettingsLink();
  await editSettingsPage.clickLogoutButton();

  // Logowanie nowym hasłem
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  // Sprawdzenie, że feed jest widoczny
  await internalHomePage.yourFeed.assertTabLinkVisible();
});
