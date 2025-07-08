import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../../src/api/resources/ArticlesApi';

export const test = base.extend<{
  articlesApi;
  articleWithoutTags;
  articleWithOneTag;
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },
});
