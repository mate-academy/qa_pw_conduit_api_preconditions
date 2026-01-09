import { test, expect } from '../../_fixtures/api/fixturesUsersApi';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';
import { createArticleApi } from '../../_fixtures/api/helpers/articlesApi';

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(async ({ pages, userRequests, users, articleWithoutTags }) => {
  // Tworzymy artykuł przez API zamiast UI
  const articleData = {
    title: articleWithoutTags.title,
    description: articleWithoutTags.description || '',
    body: articleWithoutTags.text,
    tags: articleWithoutTags.tags || [],
  };

  const createdArticle = await createArticleApi(userRequests[0], articleData);

  // Zapisz slug/URL do użycia w teście
  articleWithoutTags.url = `/article/${createdArticle.slug}`;
});

test('View an article as not registered user', async ({
  pages,
  users,
  articleWithoutTags,
}) => {
  const page = new ExternalViewArticlePage(pages[1], 2);

  // Otwieramy artykuł
  await page.open(articleWithoutTags.url);

  // Sprawdzamy zawartość artykułu
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(users[0].username);
});
