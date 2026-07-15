import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';
import { generateStorageStateForAuth } from '../../../src/common/helpers/generateStorageStateForAuth';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({
  browser,
  pages,
  registeredUsers,
  articleWithoutTags,
  articlesApi,
}) => {
  const token = registeredUsers[0].token;

  const storageState = generateStorageStateForAuth(registeredUsers[1]);
  const authorizedContext = await browser.newContext(storageState);
  pages[1] = await authorizedContext.newPage();

  const articleForApi = {
    title: articleWithoutTags.title,
    description: articleWithoutTags.description,
    body: articleWithoutTags.text,
    tagList: articleWithoutTags.tags,
  };

  const createArticleResponse = await articlesApi.createArticle(
    articleForApi,
    token,
  );
  await articlesApi.assertSuccessResponseCode(createArticleResponse);
  const slug = await articlesApi.parseSlugFromResponse(createArticleResponse);

  articleWithoutTags.url = `/article/${slug}`;
});

test('View an article created by another registered user', async ({
  articleWithoutTags,
  pages,
  registeredUsers,
}) => {
  const page = new InternalViewArticlePage(pages[1], 2);

  await page.open(articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(registeredUsers[0].username);
});
