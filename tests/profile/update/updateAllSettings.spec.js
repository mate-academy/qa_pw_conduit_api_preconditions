import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';

let newSettings;

test.beforeEach(async ({ page, user, factories, loggedInUserAndPage }) => {
  const internalHomePage = new InternalHomePage(loggedInUserAndPage.page);
  const createArticlePage = new CreateArticlePage(page); 

  await internalHomePage.open();

  newSettings = factories.userSettings.generateUserSettings();
});

test('Update all user settings for registered user', async ({
  editSettingsPage,
  viewUserProfilePage,
}) => {
  await editSettingsPage.open();
  await editSettingsPage.fillProfilePictureUrlField(
    newSettings.profilPictureUrl,
  );
  await editSettingsPage.fillUsernameField(newSettings.username);
  await editSettingsPage.fillBioTextArea(newSettings.bio);
  await editSettingsPage.fillEmailField(newSettings.email);
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
  await editSettingsPage.assertUsernameHasValue(newSettings.username);
  await editSettingsPage.assertEmailHasValue(newSettings.email);
});
