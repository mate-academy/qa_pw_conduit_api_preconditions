import { ArticlesApi } from '../resources/ArticlesApi';

export async function createArticleViaApi(userRequest, article) {
  const articlesApi = new ArticlesApi(userRequest);

  const response = await articlesApi.createArticle({
    title: article.title,
    description: article.description,
    body: article.text,
    tagList: article.tags || [],
  });

  await articlesApi.assertSuccessResponseCode(response);

  const slug = await articlesApi.parseSlugFromResponse(response);
  const articleUrl = `${process.env.BASE_URL}/article/${slug}`;

  return articleUrl;
}
