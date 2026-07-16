import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 1 });

let slug;

test.beforeEach(async ({ 
  loggedInUserAndPage,
  articleWithoutTags,
  articlesApi
 }) => {
  const token = loggedInUserAndPage.registeredUser.token;
  const response = await articlesApi.createArticle(articleWithoutTags, token);

  slug = await articlesApi.parseSlugFromResponse(response);
  articleWithoutTags.url = `/articles/${slug}`;
});

test('View an article as not registered user', async ({
  articleWithoutTags,
  pages,
  users,
}) => {
  const page = new ExternalViewArticlePage(pages[1], 2);

  await page.open(articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
});
