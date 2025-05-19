import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { TITLE_CANNOT_BE_EMPTY } from '../../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, newUserData }) => {
  await signUpUser(page, newUserData);
});

test('Creat an article without required fields', async ({
  internalHomePage,
  createArticlePage,
}) => {
  await internalHomePage.header.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});
