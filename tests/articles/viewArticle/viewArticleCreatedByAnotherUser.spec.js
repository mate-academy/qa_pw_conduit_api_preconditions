import { test } from '../../_fixtures/fixtures';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ articlesApi, registeredUsers, articleWithoutTags }) => {
  const apiArticle = {
    title: articleWithoutTags.title,
    description: articleWithoutTags.description,
    body: articleWithoutTags.text,
    tagList: articleWithoutTags.tags,
  };

  const response = await articlesApi.createArticle(
    apiArticle,
    registeredUsers[0].token
  );

  await articlesApi.assertSuccessResponseCode(response);

  const slug = await articlesApi.parseSlugFromResponse(response);

  articleWithoutTags.url = `/article/${slug}`;
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
  await page.articleHeader.assertAuthorNameIsVisible(registeredUsers[0].username);
});
