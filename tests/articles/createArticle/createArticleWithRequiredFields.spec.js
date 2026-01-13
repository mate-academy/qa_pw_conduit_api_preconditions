import { test } from '../../_fixtures/fixtures';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';

test('Creat an article with required fields', async ({
  loggedInUserAndPage,
  articleWithoutTags,
}) => {
  const page = loggedInUserAndPage.page;

  const internalHomePage = new InternalHomePage(loggedInUserAndPage.page);
  const createArticlePage = new CreateArticlePage(page);
  const internalViewArticlePage = new InternalViewArticlePage(page);

  await internalHomePage.open();
  await internalHomePage.yourFeed.assertTabLinkVisible();
  await internalHomePage.header.clickNewArticleLink();
  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.fillDescriptionField(articleWithoutTags.description);
  await createArticlePage.fillTextField(articleWithoutTags.body);
  await createArticlePage.clickPublishArticleButton();
  await internalViewArticlePage.articleHeader.assertTitleIsVisible(
    articleWithoutTags.title,
  );
  await internalViewArticlePage.articleContent.assertArticleTextIsVisible(
    articleWithoutTags.body,
  );
});
