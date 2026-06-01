import { test } from '../../_fixtures/fixtures';
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage';

let newSettings;

test.beforeEach(async ({ factories, loggedInUserAndPage }) => {
  newSettings = factories.userSettings
    .generateUserSettings({ user: loggedInUserAndPage.registeredUser });
});

test('Update URL and Bio settings for registered user', async ({
  loggedInUserAndPage
}) => {
  const { page } = loggedInUserAndPage;
  const viewUserProfilePage = new ViewUserProfilePage(page);
  const editSettingsPage = new EditProfileSettingsPage(page);

  await editSettingsPage.open();
  await editSettingsPage.fillProfilePictureUrlField(
    newSettings.profilPictureUrl,
  );
  await editSettingsPage.fillBioTextArea(newSettings.bio);
  await editSettingsPage.clickUpdateSettingsButton();
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
