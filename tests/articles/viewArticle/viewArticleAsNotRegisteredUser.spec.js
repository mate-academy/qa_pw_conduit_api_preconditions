import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(
  async ({ loggedInUserAndPage, articlesApi, articleWithoutTags }) => {
    const { registeredUser } = loggedInUserAndPage;

    const response = await articlesApi.createArticle(registeredUser.token, {
      title: articleWithoutTags.title,
      description: articleWithoutTags.description || 'Default description',
      body: articleWithoutTags.text,
    });
    await articlesApi.assertSuccessResponseCode(response);
    const createdArticle = await response.json();

    articleWithoutTags.url = `/article/${createdArticle.article.slug}`;
  },
);

test('View an article as not registered user', async ({
  articleWithoutTags,
  pages,
  users,
}) => {
  const page = new ExternalViewArticlePage(pages[1], 2);

  await page.open(articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(users[0].username);
});
