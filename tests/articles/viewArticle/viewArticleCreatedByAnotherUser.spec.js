import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';
import { createArticleViaApi } from '../../../src/api/actions/createArticleViaApi';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ userRequests, articleWithoutTags }) => {
  articleWithoutTags.url = await createArticleViaApi(
    userRequests[0],
    articleWithoutTags,
  );
});

test('View an article created by another registered user', async ({
  articleWithoutTags,
  pages,
  registeredUsers,
}) => {
  const page = new InternalViewArticlePage(pages[1], 2);

  await page.open(articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(
    registeredUsers[0].username,
  );
});
