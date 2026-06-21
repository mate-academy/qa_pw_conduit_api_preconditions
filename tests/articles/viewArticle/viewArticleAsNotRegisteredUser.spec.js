import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(
  async ({
    pages,
    users,
    loggedInUsersAndPages,
    articlesApi,
    articleWithoutTags,
  }) => {
    const token = loggedInUsersAndPages.registeredUsers[0].token;
    const response = await articlesApi.createArticle(articleWithoutTags, token);

    await articlesApi.assertSuccessResponseCode(response);

    const slug = await articlesApi.parseSlugFromResponse(response);

    articleWithoutTags.url = `article/${slug}`;
  },
);

test('View an article as not registered user', async ({
  articleWithoutTags,
  loggedInUsersAndPages,
  pages,
}) => {
  const page = pages[1];
  const user = loggedInUsersAndPages.registeredUsers[0];

  const viewArticlePage = new ExternalViewArticlePage(page, 2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.articleHeader.assertTitleIsVisible(
    articleWithoutTags.title,
  );
  await viewArticlePage.articleContent.assertArticleTextIsVisible(
    articleWithoutTags.body,
  );
  await viewArticlePage.articleHeader.assertAuthorNameIsVisible(user.username);
});
