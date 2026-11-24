import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';

let internalViewArticlePage;

test.beforeEach(
  async ({
    registeredUsers,
    articlesApi,
    users,
    articleWithoutTags,
    loggedInUserAndPage,
  }) => {
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
    internalViewArticlePage = new InternalViewArticlePage(
      loggedInUserAndPage.page,
    );
  },
);

test('View an article created by another registered user', async ({
  articleWithoutTags,
  users,
}) => {
  await internalViewArticlePage.open(articleWithoutTags.url);
  await internalViewArticlePage.articleHeader.assertTitleIsVisible(
    articleWithoutTags.title,
  );
  await internalViewArticlePage.articleContent.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );
  await internalViewArticlePage.articleHeader.assertAuthorNameIsVisible(
    users[0].username,
  );
});
