import { test } from '../../_fixtures/fixtures';

let article;

test.beforeEach(async ({ loggedInUserAndPage, createArticleWithTags }) => {
  article = await createArticleWithTags(
    1,
    loggedInUserAndPage.registeredUser.token,
  );
});

test('View an article as not registered user', async ({
  externalViewArticlePage,
}) => {
  await externalViewArticlePage.openArticleBySlug(article.slug);
  await externalViewArticlePage.articleHeader.assertTitleIsVisible(
    article.title,
  );
  await externalViewArticlePage.articleContent.assertArticleTextIsVisible(
    article.body,
  );
  await externalViewArticlePage.articleHeader.assertAuthorNameIsVisible(
    article.author.username,
  );
});
