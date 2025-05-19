import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let article;

test.beforeEach(async ({}) => {
  //article = generateNewArticleData(logger);
  //await signUpUser(page, newUserData);
});

test.only('Creat an article with required fields', async ({
  internalHomePage,
  createArticlePage,
  viewArticlePage,
  registeredUserInBrowserContext,
  page,
}) => {
  await internalHomePage.open();
});
