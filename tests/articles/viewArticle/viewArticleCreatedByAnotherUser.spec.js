import { test, expect } from '../../_fixtures/api/fixturesUsersApi';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';
import { createArticleApi } from '../../_fixtures/api/helpers/articlesApi';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ pages, userRequests, users, articleWithoutTags }) => {
  // Tworzymy artykuł przez API przez pierwszego użytkownika
  const articleData = {
    title: articleWithoutTags.title,
    description: articleWithoutTags.description || '',
    body: articleWithoutTags.text,
    tags: articleWithoutTags.tags || [],
  };

  const createdArticle = await createArticleApi(userRequests[0], articleData);

  // Zapisz slug/URL artykułu do użycia w teście
  articleWithoutTags.url = `/article/${createdArticle.slug}`;
});

test('View an article created by another registered user', async ({
  pages,
  users,
  articleWithoutTags,
}) => {
  const page = new InternalViewArticlePage(pages[1], 2);

  // Otwórz artykuł
  await page.open(articleWithoutTags.url);

  // Sprawdź zawartość artykułu
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(users[0].username);
});
