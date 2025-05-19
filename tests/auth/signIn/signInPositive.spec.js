import { test } from '../../_fixtures/fixtures';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let signInPage;
let homePage;

test.use({ contextsNumber: 2 });

test.beforeEach(async ({ pages, newUserData }) => {
  await signUpUser(pages[0], newUserData);

  signInPage = new SignInPage(pages[1]);
  homePage = new InternalHomePage(pages[1]);
});

test('Successful `Sign in` flow test', async ({ newUserData }) => {
  await signInPage.open();
  await signInPage.fillEmailField(newUserData.email);
  await signInPage.fillPasswordField(newUserData.password);
  await signInPage.clickSignInButton();

  await homePage.yourFeed.assertTabLinkVisible();
});
