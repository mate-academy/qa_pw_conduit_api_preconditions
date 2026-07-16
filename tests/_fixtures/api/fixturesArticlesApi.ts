import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../../src/api/resources/ArticlesApi';

export const test = base.extend<{
  articlesApi: ArticlesApi,
  articleWithoutTags,
  articleWithOneTag,
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },
  articleWithoutTags: async ({ logger }, use) => {
    const articleWithoutTags = {
      title: 'Test Article Without Tags',
      description: 'This is a test article without tags.',
      text: 'This is the body of the test article without tags.',
      tags: [],
    };

    logger.info('Created article without tags fixture');
    await use(articleWithoutTags);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const articleWithOneTag = {
      title: 'Test Article With One Tag',
      description: 'This is a test article with one tag.',
      text: 'This is the body of the test article with one tag.',
      tags: ['test-tag'],
    };

    logger.info('Created article with one tag fixture');
    await use(articleWithOneTag);
  },
});
