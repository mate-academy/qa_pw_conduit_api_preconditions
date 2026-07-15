import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ pages, users, articleWithoutTags, usersApi, articlesApi }) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);

  const loginResponse = await usersApi.loginUser(users[0]);
  await usersApi.assertSuccessResponseCode(loginResponse);
  const token = await usersApi.parseTokenFromBody(loginResponse);

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
  users,
}) => {
  const page = new InternalViewArticlePage(pages[1], 2);

  await page.open(articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(users[0].username);
});
