import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';

test('View an article created by another registered user', async ({
  loggedInUserAndPage,
  secondLoggedInUserAndPage,
  createArticleWithTags,
}) => {
  // Create article as first usr
  const firstUserToken = loggedInUserAndPage.registeredUser.token;
  const article = await createArticleWithTags(1, firstUserToken);

  // Read article as another user
  const page = new InternalViewArticlePage(secondLoggedInUserAndPage.page);

  await page.openArticleBySlug(article.slug);
  await page.articleHeader.assertTitleIsVisible(article.title);
  await page.articleContent.assertArticleTextIsVisible(article.body);
  await page.articleHeader.assertAuthorNameIsVisible(article.author.username);
});
