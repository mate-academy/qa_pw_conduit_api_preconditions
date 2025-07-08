import { BasePage } from '../BasePage';
import { InternalHeader } from '../../components/header/InternalHeader';
import { expect } from '../../../common/helpers/pw';

export class ViewUserProfilePage extends BasePage {
  #profileImage;
  #editProfileSettingsLink;
  #editProfileSettingsParent;
  #bio;
  #username;

  constructor(page, userId = 0) {
    super(page, userId);
    this.header = new InternalHeader(this.page, this.userId);
    this.#profileImage = this.page.getByRole('img', {
      name: `User's profile image`,
    });
    this.#editProfileSettingsLink = this.page.getByRole('link', {
      name: 'Edit Profile Settings',
    });
    this.#editProfileSettingsParent = this.page
      .locator('div')
      .filter({ has: this.#editProfileSettingsLink })
      .last();
    this.#bio = this.#editProfileSettingsParent.locator('p');
    this.#username = this.#editProfileSettingsParent.locator('h4');
  }

  async assertProfilePictureUrlHasValue(text) {
    await this.step(
      `Assert the 'URL for profile picture' contains correct image link`,
      async () => {
        await expect(this.#profileImage).toHaveValue(text);
      },
    );
  }

  async clickEditProfileSettingsLink() {
    await this.step(`Click 'Edit Profile Settings' link`, async () => {
      await this.#editProfileSettingsLink.click();
    });
  }

  async assertUsernameIsCorrect(text) {
    await this.step(`Assert the 'Username' contains correct text`, async () => {
      await expect(this.#username).toContainText(text);
    });
  }

  async assertBioHasText(text) {
    await this.step(`Assert the 'Bio' contains correct text`, async () => {
      await expect(this.#bio).toContainText(text);
    });
  }
}
