import axios from 'axios';
import { ResponseLoginUser, UserLogin, UserRegister } from './types';

export const instance = axios.create({
  baseURL: 'http://localhost:1337/',
});

export const articlesApi = {
  async getArticles(start: number, limit: number) {
    const { data } = await instance.get(
      `/articles?_start=${start}&_limit=${limit}`
    );
    return data;
  },
  async getArticlesByCategory(
    start: number,
    limit: number,
    sort: string,
    category: string
  ) {
    const { data } = await instance.get(
      `/articles?_start=${start}&_limit=${limit}&_sort=published_at:${sort}&category.name=${category}`
    );
    return data;
  },
  async getCurrentArticle(slug: string | undefined) {
    const { data } = await instance.get(`/articles/${slug}`);
    return data;
  },
  async articlesCount() {
    const { data } = await instance.get('/articles/count');
    return data;
  },
  async rateArticle(
    id: number,
    rate: string,
    currRating: number,
    token: string
  ) {
    const { data } =
      rate === 'down' && currRating > 0
        ? await instance.put(
            `/articles/${id}`,
            {
              rating: currRating - 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        : await instance.put(
            `/articles/${id}`,
            {
              rating: currRating + 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

    return data;
  },
};

export const userApi = {
  async register(user: UserRegister) {
    const { data } = await instance.post('/auth/local/register', user);
    return data;
  },
  async login(user: UserLogin): Promise<ResponseLoginUser> {
    const { data } = await instance.post('/auth/local', user);
    return data;
  },
  async getCurrentUser(token: string) {
    const { data } = await instance.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
};
