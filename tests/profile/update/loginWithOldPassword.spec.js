import { test, expect } from '../../_fixtures/api/fixturesUsersApi';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/ui/constants/authErrorMessages';

let newPassword;

test.beforeEach(async ({ loggedInUserAndPage, factories }) => {
  // loggedInUserAndPage już ma gotowego zalogowanego użytkownika
  newPassword = factories.user.generatePassword();
});

test('Login with old password after it was updated from settings', async ({
  editSettingsPage,
  viewUserProfilePage,
  signInPage,
  loggedInUserAndPage,
}) => {
  const user = loggedInUserAndPage.registeredUser;
  const page = loggedInUserAndPage.page;

  // aktualizacja hasła
  await editSettingsPage.open();
  await editSettingsPage.fillNewPasswordField(newPassword);
  await editSettingsPage.clickUpdateSettingsButton();

  // wylogowanie
  await viewUserProfilePage.clickEditProfileSettingsLink();
  await editSettingsPage.clickLogoutButton();

  // logowanie starym hasłem
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  // sprawdzenie błędu
  await signInPage.assertErrorMessageContainsText(
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  );
});
