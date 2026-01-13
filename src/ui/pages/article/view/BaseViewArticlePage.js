import { BasePage } from '../../BasePage';
import { ArticleHeader } from '../../../components/article/ArticleHeader';
import { ArticleContentBlock } from '../../../components/article/articleBody/ArticleContentBlock';

export class BaseViewArticlePage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this._url = '/article';
    this.articleHeader = new ArticleHeader(page, userId);
    this.articleContent = new ArticleContentBlock(this.page, userId);
  }

  async openArticleBySlug(slug) {
    await this.step(`Open article by slug`, async () => {
      const fullUrl = this._url + `/${slug}`;
      await this.page.goto(fullUrl);
    });
  }
}
