import { BaseComponent } from '../../BaseComponent';
import { expect } from '../../../../common/helpers/pw';

export class BaseArticleContentBlock extends BaseComponent {
  #title;

  constructor(page, userId = 0) {
    super(page, userId);
    this.#title = page.getByRole('heading');
  }

  #tagListItem(tagName) {
    return this.page.getByRole('listitem').filter({ hasText: tagName });
  }

  async assertArticleTextIsVisible(text) {
    await this.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagsAreVisible(tags) {
    await this.step(`Assert the article has correct tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await expect(this.#tagListItem(tags[i])).toBeVisible();
      }
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
}
