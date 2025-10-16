import { test } from '../../_fixtures/fixtures';
import { EditProfileSettingsPage } from '../../../src/ui/pages/profile/EditProfileSettingsPage'
import { ViewUserProfilePage } from '../../../src/ui/pages/profile/ViewUserProfilePage';

test('Update URL and Bio settings for registered user', async ({
  loggedInUserAndPage,
  factories
}) => {
  const { page, registeredUser } = loggedInUserAndPage;
  const newSettings = factories.userSettings.generateUserSettings();

  const editSettingsPage = new EditProfileSettingsPage(page);
  const viewUserProfilePage = new ViewUserProfilePage(page);

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
  await viewUserProfilePage.assertUsernameIsCorrect(registeredUser.username);
  await viewUserProfilePage.clickEditProfileSettingsLink();
  await editSettingsPage.assertProfilePictureUrlHasValue(
    newSettings.profilPictureUrl,
  );
  await editSettingsPage.assertBioHasValue(newSettings.bio);
});
