import { BaseArticleContentBlock } from './BaseArticleContentBlock';

export class AuthorArticleContentBlock extends BaseArticleContentBlock {
  constructor(page, userId = 0) {
    super(page, userId);
  }
}
