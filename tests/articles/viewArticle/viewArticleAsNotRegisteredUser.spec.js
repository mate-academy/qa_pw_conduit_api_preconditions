import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(async ({ registeredUsers, articleWithoutTags, articlesApi }) => {
  const token = registeredUsers[0].token;

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

test('View an article as not registered user', async ({
  articleWithoutTags,
  pages,
  registeredUsers,
}) => {
  const page = new ExternalViewArticlePage(pages[1], 2);

  await page.open(articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(registeredUsers[0].username);
});
