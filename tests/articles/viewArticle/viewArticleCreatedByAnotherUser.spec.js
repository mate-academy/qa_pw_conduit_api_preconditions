import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { generateStorageStateForAuth } from '../../../src/common/helpers/generateStorageStateForAuth';

test.use({ usersNumber: 1 });

test('View an article created by another registered user', async ({
  loggedInUserAndPage,
  registeredUsers,
  articleWithoutTags,
  browser,
}) => {
  const author = loggedInUserAndPage.registeredUser;
  const authorPage = loggedInUserAndPage.page;
  const viewer = registeredUsers[0];

  const viewerContext = await browser.newContext(
    generateStorageStateForAuth(viewer),
  );
  const viewerPage = await viewerContext.newPage();

  await createArticle(authorPage, articleWithoutTags, 1);

  const internalViewArticlePage = new InternalViewArticlePage(viewerPage, 2);

  await internalViewArticlePage.open(articleWithoutTags.url);
  await internalViewArticlePage.articleHeader.assertTitleIsVisible(
    articleWithoutTags.title,
  );
  await internalViewArticlePage.articleContent.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );
  await internalViewArticlePage.articleHeader.assertAuthorNameIsVisible(
    author.username,
  );

  await viewerContext.close();
});
