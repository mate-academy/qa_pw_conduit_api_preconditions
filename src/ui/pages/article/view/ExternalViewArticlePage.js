import { BaseViewArticlePage } from './BaseViewArticlePage';
import { ExternalHeader } from '../../../components/header/ExternalHeader';

export class ExternalViewArticlePage extends BaseViewArticlePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = new ExternalHeader(this.page, userId);
  }
}
