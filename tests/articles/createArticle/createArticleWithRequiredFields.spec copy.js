import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let article;

test.beforeEach(
  async ({ page, newUserData, logger, registeredUserInBrowserContext }) => {
    article = generateNewArticleData(logger);

    await signUpUser(page, newUserData);
  },
);

test.only('Creat an article with required fields', async ({
  internalHomePage,
  createArticlePage,
  viewArticlePage,
  page,
}) => {
  await internalHomePage.header.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);

  await page.context().storageState({ path: './tests/temp/user.json' });
});
