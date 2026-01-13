import { test as base } from '@playwright/test';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';

export const test = base.extend<{
  articleWithoutTags;
  articleWithOneTag;
  createArticlePage;
  internalViewArticlePage;
  externalViewArticlePage;
}>({
  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger);

    await use(article);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 1);

    await use(article);
  },
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  internalViewArticlePage: async ({ page }, use) => {
    const internalViewArticlePage = new InternalViewArticlePage(page);

    await use(internalViewArticlePage);
  },
  externalViewArticlePage: async ({ page }, use) => {
    const externalViewArticlePage = new ExternalViewArticlePage(page);

    await use(externalViewArticlePage);
  },
});
