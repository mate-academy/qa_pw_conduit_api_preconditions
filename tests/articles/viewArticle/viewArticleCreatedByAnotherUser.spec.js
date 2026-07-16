import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 2 });

let slug;

test.beforeEach(async ({ 
  articleWithoutTags,
  loggedInUserAndPage,
  articlesApi
}) => {
  const token = loggedInUserAndPage.registeredUser.token;
  const response = await articlesApi.createArticle(articleWithoutTags, token);
  
  slug = await articlesApi.parseSlugFromResponse(response);
  articleWithoutTags.url = `/articles/${slug}`;
});

test('View an article created by another registered user', async ({
  articleWithoutTags,
  loggedInUserAndPage2
}) => {
  const page = new InternalViewArticlePage(loggedInUserAndPage2.page, 2);

  await page.open(articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
});
