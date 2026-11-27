import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';
import { toApiArticle } from '../../../src/common/testData/generateNewArticleData';

test.use({ usersNumber: 1 });

test('View an article created by another registered user', async ({
  loggedInUserAndPage,
  registeredUsers,
  articlesApi,
  articleWithoutTags,
}) => {
  const author = registeredUsers[0];

  const response = await articlesApi.createArticle(
    toApiArticle(articleWithoutTags),
    author.token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  const slug = await articlesApi.parseSlugFromResponse(response);
  const internalViewArticlePage = new InternalViewArticlePage(
    loggedInUserAndPage.page,
  );

  await internalViewArticlePage.open(`/article/${slug}`);
  await internalViewArticlePage.articleHeader.assertTitleIsVisible(
    articleWithoutTags.title,
  );
  await internalViewArticlePage.articleContent.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );
  await internalViewArticlePage.articleHeader.assertAuthorNameIsVisible(
    author.username,
  );
});
