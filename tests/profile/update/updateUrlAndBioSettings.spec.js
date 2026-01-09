import { test, expect } from '../../_fixtures/api/fixturesUsersApi';

let newSettings;

test.beforeEach(async ({ loggedInUserAndPage, factories }) => {
  // loggedInUserAndPage już ma gotowego użytkownika
  newSettings = factories.userSettings.generateUserSettings({
    user: loggedInUserAndPage.registeredUser,
  });
});

test('Update URL and Bio settings for registered user', async ({
  editSettingsPage,
  viewUserProfilePage,
  loggedInUserAndPage,
}) => {
  const user = loggedInUserAndPage.registeredUser;
  const page = loggedInUserAndPage.page;

  // Otwórz ustawienia
  await editSettingsPage.open();

  // Wypełnij pola URL i Bio
  await editSettingsPage.fillProfilePictureUrlField(
    newSettings.profilPictureUrl,
  );
  await editSettingsPage.fillBioTextArea(newSettings.bio);

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
});
