import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { InternalHomePage } from '../../../src/ui/pages/home/InternalHomePage';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';
import { InternalViewArticlePage } from '../../../src/ui/pages/article/view/InternalViewArticlePage';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 10, testNameEnding: 'ten tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Create an article with tags', () => {
    let internalHomePage;
    let createArticlePage;
    let internalViewArticlePage;
    let article;

    test.beforeEach(async ({ loggedInUserAndPage, logger }) => {
      const page = loggedInUserAndPage.page;

      article = generateNewArticleData(logger, tagsNumber);
      internalHomePage = new InternalHomePage(page);
      createArticlePage = new CreateArticlePage(page);
      internalViewArticlePage = new InternalViewArticlePage(page);
    });

    test(`Create an article with ${testNameEnding}`, async ({}) => {
      await internalHomePage.open();
      await internalHomePage.header.clickNewArticleLink();
      await createArticlePage.fillTitleField(article.title);
      await createArticlePage.fillDescriptionField(article.description);
      await createArticlePage.fillTextField(article.body);
      await createArticlePage.fillTagsField(article.tagList);
      await createArticlePage.clickPublishArticleButton();
      await internalViewArticlePage.articleHeader.assertTitleIsVisible(
        article.title,
      );
      await internalViewArticlePage.articleContent.assertArticleTextIsVisible(
        article.body,
      );
      await internalViewArticlePage.articleContent.assertArticleTagsAreVisible(
        article.tagList,
      );
    });
  });
});
