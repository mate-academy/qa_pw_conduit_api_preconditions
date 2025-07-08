import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let newSettings;

test.beforeEach(async ({ page, user, factories }) => {
  await signUpUser(page, user);

  newSettings = factories.userSettings.generateUserSettings({ user });
});

test('Update URL and Bio settings for registered user', async ({
  editSettingsPage,
  viewUserProfilePage,
}) => {
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
