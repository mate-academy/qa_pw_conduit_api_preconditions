import { test } from '../../_fixtures/fixtures';
import { TITLE_CANNOT_BE_EMPTY } from '../../../src/ui/constants/articleErrorMessages';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';

test('Creat an article without required fields', async ({
  loggedInUserAndPage,
}) => {
  const page = loggedInUserAndPage.page;

  const internalHomePage = new InternalHomePage(page);
  const createArticlePage = new CreateArticlePage(page);

  await internalHomePage.open();
  await internalHomePage.header.clickNewArticleLink();
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
