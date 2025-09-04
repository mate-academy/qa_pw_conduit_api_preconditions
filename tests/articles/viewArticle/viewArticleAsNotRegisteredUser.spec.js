import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(async ({ articlesApi, registeredUser, articleWithoutTags }) => {
  const apiArticle = {
    title: articleWithoutTags.title,
    description: articleWithoutTags.description,
    body: articleWithoutTags.text,
    tagList: articleWithoutTags.tags,
  };

  const response = await articlesApi.createArticle(
    apiArticle,
    registeredUser.token
  );

  await articlesApi.assertSuccessResponseCode(response);

  const slug = await articlesApi.parseSlugFromResponse(response);
  articleWithoutTags.url = `/article/${slug}`;
});


test('View an article as not registered user', async ({
  articleWithoutTags,
  pages,
  registeredUser,
}) => {
  const page = new ExternalViewArticlePage(pages[1], 2);

  await page.open(articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(registeredUser.username);
});
