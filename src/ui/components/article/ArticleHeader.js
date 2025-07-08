import { BaseComponent } from '../BaseComponent';
import { expect } from '../../../common/helpers/pw';

export class ArticleHeader extends BaseComponent {
  #title;
  #articleFavoriteButton;
  #articleUnfavoriteButton;

  constructor(page, userId = 0) {
    super(page, userId);
    this.#title = page.getByRole('heading');
    this.#articleFavoriteButton = page
      .getByRole('button', {
        name: 'Favorite Article',
      })
      .first();
    this.#articleUnfavoriteButton = page
      .getByRole('button', {
        name: 'Unfavorite Article',
      })
      .first();
  }

  async clickFollowArtcile() {
    await this.step(`Click the Follow article button`, async () => {
      await this.#articleFavoriteButton.click();
    });
  }

  async clickUnfollowArtcile() {
    await this.step(`Click the Unfollow article button`, async () => {
      await this.#articleUnfavoriteButton.click();
    });
  }

  async assertTitleIsVisible(title) {
    await this.step(`Assert the article has correct title`, async () => {
      await expect(this.#title).toContainText(title);
    });
  }

  #authorLink(username) {
    return this.page.getByRole('link', { username }).first();
  }

  async assertAuthorNameIsVisible(username) {
    await this.step(
      `Assert the article has correct author username`,
      async () => {
        await expect(this.#authorLink(username)).toBeVisible();
      },
    );
  }

  async assertUnfavoriteButtonIsVisibleInArticleHeader() {
    await this.step(
      `Assert the Unfavorite article button is shown in article header`,
      async () => {
        await expect(this.#articleUnfavoriteButton).toBeVisible();
      },
    );
  }

  async assertFavoriteButtonIsVisibleInArticleHeader() {
    await this.step(
      `Assert the Favorite article button is shown in article header`,
      async () => {
        await expect(this.#articleFavoriteButton).toBeVisible();
      },
    );
  }
}
