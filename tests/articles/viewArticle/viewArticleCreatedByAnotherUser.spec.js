import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 2, usersNumber: 2 });
let article;

test.beforeEach(
  async ({ pages, users, loggedInUserAndPage, createArticleWithTags }) => {
    await signUpUser(pages[1], users[1], 2);

    article = await createArticleWithTags(
      1,
      loggedInUserAndPage.registeredUser.token,
    );
  },
);

test('View an article created by another registered user', async ({
  pages,
}) => {
  const page = new InternalViewArticlePage(pages[1], 2);

  await page.openArticleBySlug(article.slug);
  await page.articleHeader.assertTitleIsVisible(article.title);
  await page.articleContent.assertArticleTextIsVisible(article.body);
  await page.articleHeader.assertAuthorNameIsVisible(article.author.username);
});
