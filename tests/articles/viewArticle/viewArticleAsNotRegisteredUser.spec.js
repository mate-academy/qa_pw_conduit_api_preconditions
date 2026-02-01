import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';
import { createArticleViaApi } from '../../../src/api/actions/createArticleViaApi';

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(async ({ userRequests, articleWithoutTags }) => {
  articleWithoutTags.url = await createArticleViaApi(
    userRequests[0],
    articleWithoutTags,
  );
});

test('View an article as not registered user', async ({
  articleWithoutTags,
  pages,
  registeredUsers,
}) => {
  const page = new ExternalViewArticlePage(pages[1], 2);

  await page.open(articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(
    registeredUsers[0].username,
  );
});
