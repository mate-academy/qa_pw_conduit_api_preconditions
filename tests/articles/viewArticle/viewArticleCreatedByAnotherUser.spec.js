import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(
  async ({
    loggedInUserAndPage,
    registeredUsers,
    articlesApi,
    articleWithoutTags,
  }) => {
    const { registeredUser: user1 } = loggedInUserAndPage;

    const user2 = registeredUsers[1];

    const response = await articlesApi.createArticle(
      {
        title: articleWithoutTags.title,
        description: articleWithoutTags.description || 'Default description',
        body: articleWithoutTags.text,
        tagList: [],
      },
      user1.token,
    );
    await articlesApi.assertResponseBodyContainsSlug(response);
    const createdArticle = await response.json();
    articleWithoutTags.url = `/article/${createdArticle.article.slug}`;
  },
);

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
