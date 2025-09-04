import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../../src/api/resources/ArticlesApi';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articlesApi;
  articleWithoutTags;
  articleWithOneTag;
  articleWithTwoTags;
  createArticleWithTags;
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },
  articleWithoutTags: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger, 0);

    await use(articleData);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger, 1);

    await use(articleData);
  },
  articleWithTwoTags: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger, 2);

    await use(articleData);
  },
  createArticleWithTags: async ({ articlesApi, logger }, use) => {
    await use(async (tagsCount: number, token: string) => {
      const articleData = generateNewArticleData(logger, tagsCount);
      const response = await articlesApi.createArticle(articleData, token);
      await articlesApi.assertSuccessResponseCode(response);
      const body = await response.json();
      return body.article;
    });
  },
});
