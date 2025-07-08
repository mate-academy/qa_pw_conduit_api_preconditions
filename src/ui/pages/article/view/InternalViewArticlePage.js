import { BaseViewArticlePage } from './BaseViewArticlePage';
import { InternalHeader } from '../../../components/header/InternalHeader';
import { AuthorArticleContentBlock } from '../../../components/article/articleBody/AuthorArticleContentBlock';

export class InternalViewArticlePage extends BaseViewArticlePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = new InternalHeader(this.page, this.userId);
    this.authorsArticleContent = new AuthorArticleContentBlock(
      this.page,
      this.userId,
    );
  }
}
