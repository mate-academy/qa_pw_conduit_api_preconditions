import { BaseArticleContentBlock } from './BaseArticleContentBlock';
import { expect } from '../../../../common/helpers/pw';

export class ArticleContentBlock extends BaseArticleContentBlock {
  #articleFavoriteButton;
  #articleUnfavoriteButton;

  constructor(page, userId = 0) {
    super(page, userId);
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

  async clickFollowArticle() {
    await this.step(`Click the Follow article button`, async () => {
      await this.#articleFavoriteButton.click();
    });
  }

  async clickUnfollowArticle() {
    await this.step(`Click the Unfollow article button`, async () => {
      await this.#articleUnfavoriteButton.click();
    });
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
