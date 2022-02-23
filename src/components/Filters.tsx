import axios from 'axios';
import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { API_LINK } from '../api/constants';
import {
  SET_ALL_POSTS,
  SET_CATEGORIES,
  SET_CATEGORY,
  SET_SORT,
} from '../redux/reducers/postsReducer';

export const Filters = () => {
  const dispatch = useDispatch();
  const { categories, category, sort, currentPage } = useSelector(
    (posts: RootStateOrAny) => posts.posts
  );

  useEffect(() => {
    axios
      .get(`${API_LINK}/categories`)
      .then(({ data }) => dispatch(SET_CATEGORIES(data)));
  }, []);

  useEffect(() => {
    let link =
      category !== 'all'
        ? `?_start=${(currentPage - 1) * 6}&_limit=${
            currentPage * 6
          }&category.name=${category}&_sort=published_at:${sort}`
        : `?_start=${(currentPage - 1) * 6}&_limit=${
            currentPage * 6
          }&_sort=published_at:${sort}`;

    axios
      .get(`${API_LINK}/articles${link}`)
      .then(({ data }) => dispatch(SET_ALL_POSTS(data)));
  }, [category, sort]);

  const setCategory = (c: string) => {
    dispatch(SET_CATEGORY(c));
  };
  const setSort = (s: string) => {
    dispatch(SET_SORT(s));
  };

  return (
    <div className="filters">
      <div className="filters__category">
        <span className="filters__text">Sort by category</span>
        <select
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          {categories?.map((c: any) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filters__sort">
        <span className="filters__text">Sort by</span>
        <select
          defaultValue={category}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="DESC">Newest</option>
          <option value="ASC">Oldest</option>
        </select>
      </div>
    </div>
  );
};
