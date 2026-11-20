import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ articleWithoutTags, loggedInUsersAndPages, articlesApi }) => {
  const articleCreatorUser = loggedInUsersAndPages[0].registeredUser;
  const article = {
    title: articleWithoutTags.title,
    description: articleWithoutTags.description,
    body: articleWithoutTags.text,
    tagList: articleWithoutTags.tags,
  };
  const response = await articlesApi.createArticle(article, articleCreatorUser.token);
  await articlesApi.assertSuccessResponseCode(response);
  articleWithoutTags.url = await articlesApi.parseSlugFromResponse(response);
});

test('View an article created by another registered user', async ({
  articleWithoutTags,
  loggedInUsersAndPages,
}) => {
  const articleViewerPage = loggedInUsersAndPages[1].page;
  const articleCreatorUser = loggedInUsersAndPages[0].registeredUser;
  
  const page = new InternalViewArticlePage(articleViewerPage, 2);

  await page.open('/article/' + articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(articleCreatorUser.username);
});
