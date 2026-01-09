import { test, expect } from '../../_fixtures/api/fixturesUsersApi';

let newSettings;

test.beforeEach(async ({ loggedInUserAndPage, factories }) => {
  // loggedInUserAndPage już ma gotowego zalogowanego użytkownika
  newSettings = factories.userSettings.generateUserSettings();
});

test('Update all user settings for registered user', async ({
  editSettingsPage,
  viewUserProfilePage,
  loggedInUserAndPage,
}) => {
  const user = loggedInUserAndPage.registeredUser;
  const page = loggedInUserAndPage.page;

  // Otwórz ustawienia
  await editSettingsPage.open();

  // Wypełnij wszystkie pola
  await editSettingsPage.fillProfilePictureUrlField(
    newSettings.profilPictureUrl,
  );
  await editSettingsPage.fillUsernameField(newSettings.username);
  await editSettingsPage.fillBioTextArea(newSettings.bio);
  await editSettingsPage.fillEmailField(newSettings.email);

  // Zaktualizuj ustawienia
  await editSettingsPage.clickUpdateSettingsButton();

  // Sprawdź wartości w formularzu i na profilu
  await editSettingsPage.assertProfilePictureUrlHasValue(
    newSettings.profilPictureUrl,
  );
  await viewUserProfilePage.assertBioHasText(newSettings.bio);
  await viewUserProfilePage.assertUsernameIsCorrect(newSettings.username);

  await viewUserProfilePage.clickEditProfileSettingsLink();

  await editSettingsPage.assertProfilePictureUrlHasValue(
    newSettings.profilPictureUrl,
  );
  await editSettingsPage.assertBioHasValue(newSettings.bio);
  await editSettingsPage.assertUsernameHasValue(newSettings.username);
  await editSettingsPage.assertEmailHasValue(newSettings.email);
});
