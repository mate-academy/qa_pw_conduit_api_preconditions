import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Creat an article with required fields', async ({
  internalHomePage,
  createArticlePage,
  internalViewArticlePage,
  articleWithoutTags,
}) => {
  await internalHomePage.header.clickNewArticleLink();
  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.fillDescriptionField(articleWithoutTags.description);
  await createArticlePage.fillTextField(articleWithoutTags.text);
  await createArticlePage.clickPublishArticleButton();
  await internalViewArticlePage.articleHeader.assertTitleIsVisible(
    articleWithoutTags.title,
  );
  await internalViewArticlePage.articleContent.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );
});
