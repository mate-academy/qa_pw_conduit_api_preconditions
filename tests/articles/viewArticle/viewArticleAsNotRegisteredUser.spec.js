import { test } from '../../_fixtures/fixtures';

test('View an article as not registered user', async ({
  externalViewArticlePage,
  loggedInUserAndPage,
  createArticleWithTags,
}) => {
  // Create article as first usr
  const firstUserToken = loggedInUserAndPage.registeredUser.token;
  const article = await createArticleWithTags(1, firstUserToken);

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
