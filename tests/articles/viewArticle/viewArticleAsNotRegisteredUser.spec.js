import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';
import { toApiArticle } from '../../../src/common/testData/generateNewArticleData';

test('View an article as not registered user', async ({
  registeredUser,
  articlesApi,
  articleWithoutTags,
  page,
}) => {
  const response = await articlesApi.createArticle(
    toApiArticle(articleWithoutTags),
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  const slug = await articlesApi.parseSlugFromResponse(response);
  const externalViewArticlePage = new ExternalViewArticlePage(page);

  await externalViewArticlePage.open(`/article/${slug}`);
  await externalViewArticlePage.articleHeader.assertTitleIsVisible(
    articleWithoutTags.title,
  );
  await externalViewArticlePage.articleContent.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );
  await externalViewArticlePage.articleHeader.assertAuthorNameIsVisible(
    registeredUser.username,
  );
});
