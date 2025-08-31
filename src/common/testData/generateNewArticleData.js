import { faker } from '@faker-js/faker';

export function generateNewArticleData(logger, tagNumber = 0) {
  const tags = Array.from({ length: tagNumber }, () => faker.lorem.word());
  const body = faker.lorem.sentences(2);
  const tagList = tags;

  const article = {
    title: faker.lorem.words(5),
    description: faker.lorem.sentence(4),
    text: body,
    body,
    tags,
    tagList,
  };

  logger.debug(`Generated new article data: ${JSON.stringify(article)}`);

  return article;
}
