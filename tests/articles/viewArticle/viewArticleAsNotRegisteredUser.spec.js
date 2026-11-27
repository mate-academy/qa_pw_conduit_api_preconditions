import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test('View an article as not registered user', async ({
  loggedInUserAndPage,
  articleWithoutTags,
  page,
}) => {
  const author = loggedInUserAndPage.registeredUser;

  await createArticle(loggedInUserAndPage.page, articleWithoutTags);

  const externalViewArticlePage = new ExternalViewArticlePage(page);

  await externalViewArticlePage.open(articleWithoutTags.url);
  await externalViewArticlePage.articleHeader.assertTitleIsVisible(
    articleWithoutTags.title,
  );
  await externalViewArticlePage.articleContent.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );
  await externalViewArticlePage.articleHeader.assertAuthorNameIsVisible(
    author.username,
  );
});
