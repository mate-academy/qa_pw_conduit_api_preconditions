import { expect } from '../../../common/helpers/pw';
import { BasePage } from '../BasePage';
import { InternalHeader } from '../../components/header/InternalHeader';

export class EditProfileSettingsPage extends BasePage {
  #profilePictureUrlField;
  #usernameField;
  #bioTextArea;
  #emailField;
  #newPasswordField;
  #updateSettingsButton;
  #logoutButton;

  constructor(page, userId = 0) {
    super(page, userId);
    this._url = '/settings';
    this.header = new InternalHeader(this.page, userId);
    this.#profilePictureUrlField = this.page.getByPlaceholder(
      'URL of profile picture',
    );
    this.#usernameField = page.getByPlaceholder('Username');
    this.#bioTextArea = this.page.getByPlaceholder('Short bio about you');
    this.#emailField = page.getByPlaceholder('Email');
    this.#newPasswordField = page.getByPlaceholder('New Password');
    this.#updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
    this.#logoutButton = this.page.getByText('Or click here to logout.');
  }

  async fillProfilePictureUrlField(url) {
    await this.step(`Fill the 'URL for profile picture' field`, async () => {
      await this.#profilePictureUrlField.fill(url);
    });
  }

  async fillUsernameField(url) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.#usernameField.fill(url);
    });
  }

  async fillBioTextArea(url) {
    await this.step(`Fill the 'Bio' text area`, async () => {
      await this.#bioTextArea.fill(url);
    });
  }

  async fillEmailField(url) {
    await this.step(`Fill the 'Email' field`, async () => {
      await this.#emailField.fill(url);
    });
  }

  async fillNewPasswordField(url) {
    await this.step(`Fill the 'New Password' field`, async () => {
      await this.#newPasswordField.fill(url);
    });
  }

  async clickUpdateSettingsButton() {
    await this.step(`Click the 'Update Settings' button`, async () => {
      await this.#updateSettingsButton.click();
    });
  }

  async clickLogoutButton() {
    await this.step(`Click the 'Or click here to logout.' button`, async () => {
      await this.#logoutButton.click();
    });
  }
  async assertProfilePictureUrlHasValue(text) {
    await this.step(
      `Assert the 'URL for profile picture' contains correct image link`,
      async () => {
        await expect(this.#profilePictureUrlField).toHaveValue(text);
      },
    );
  }

  async assertBioHasValue(text) {
    await this.step(`Assert the 'Bio' contains corrext value`, async () => {
      await expect(this.#bioTextArea).toHaveValue(text);
    });
  }

  async assertUsernameHasValue(text) {
    await this.step(
      `Assert the 'Username' contains corrext value`,
      async () => {
        await expect(this.#usernameField).toHaveValue(text);
      },
    );
  }

  async assertEmailHasValue(text) {
    await this.step(`Assert the 'Email' contains corrext value`, async () => {
      await expect(this.#emailField).toHaveValue(text);
    });
  }
}
