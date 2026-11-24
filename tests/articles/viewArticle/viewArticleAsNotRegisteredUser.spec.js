import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';

test.beforeEach(
  async ({ registeredUsers, articlesApi, users, articleWithoutTags }) => {
    const response = await articlesApi.createArticle(
      {
        title: articleWithoutTags.title,
        description: articleWithoutTags.description,
        body: articleWithoutTags.text,
        tagList: articleWithoutTags.tags,
      },
      users[0].token,
    );

    await articlesApi.assertSuccessResponseCode(response);

    const slug = await articlesApi.parseSlugFromResponse(response);

    articleWithoutTags.url = `/article/${slug}`;
  },
);

test('View an article as not registered user', async ({
  articleWithoutTags,
  pages,
  users,
}) => {
  const page = new ExternalViewArticlePage(pages[0]);

  await page.open(articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(users[0].username);
});
