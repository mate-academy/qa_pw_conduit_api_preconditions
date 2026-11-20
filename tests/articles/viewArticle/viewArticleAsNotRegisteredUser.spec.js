import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(async ({ articleWithoutTags, loggedInUserAndPage, articlesApi }) => {
  const article = {
    title: articleWithoutTags.title,
    description: articleWithoutTags.description,
    body: articleWithoutTags.text,
    tagList: articleWithoutTags.tags,
  };
  const loggedInUser = loggedInUserAndPage.registeredUser;
  const response = await articlesApi.createArticle(article, loggedInUser.token);
  await articlesApi.assertSuccessResponseCode(response);
  articleWithoutTags.url = await articlesApi.parseSlugFromResponse(response);
});

test('View an article as not registered user', async ({
  articleWithoutTags,
  pages,
  loggedInUserAndPage,
}) => {
  const loggedInUser = loggedInUserAndPage.registeredUser;

  const notLoggedInUserPage = new ExternalViewArticlePage(pages[1], 2);

  await notLoggedInUserPage.open('/article/' + articleWithoutTags.url);
  await notLoggedInUserPage.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await notLoggedInUserPage.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await notLoggedInUserPage.articleHeader.assertAuthorNameIsVisible(loggedInUser.username);
});
