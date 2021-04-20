import fetch from 'fetch';

import {
  checkStatus,
} from './util/check-fetch-status';

const headers = {
  'accept': 'application/json',
  'Content-Type': 'application/json',
};

const options = {
  method: 'GET',
  headers,
};

const getLatestPosts = (host, count, category = null, excludedCategories = []) => {
  return getPosts(host, 1, count, category, excludedCategories);
};

const getPostsByCategory = (host, count, category) => {
  return getPosts(host, 1, count, category);
};

const getPosts = (host, pageIndex, pageSize, category = null, excludedCategories = []) => {
  const params = {
    page: pageIndex,
    per_page: pageSize,
    categories: category || null,
    categories_exclude: excludedCategories && excludedCategories.length !== 0 ? excludedCategories.join(',') : null,
  };

  const query = Object.keys(params).filter(k => params[k] !== null).map(k => `${k}=${params[k]}`).join('&');

  const url = `${host}/wp-json/wp/v2/posts?${query}&_embed`;

  return fetch(url, options)
    .then(checkStatus)
    .then(res => {
      return res.json()
        .then(data => ({
          category,
          count: +res.headers.get('X-WP-Total'),
          pageIndex,
          pageSize,
          posts: data || [],
        }));
    });
};

const getPost = (host, id) => {
  const url = `${host}/wp-json/wp/v2/posts/${id}?_embed`;

  return fetch(url, options)
    .then(checkStatus)
    .then(res => res.json());
};

const getPageByName = (host, name) => {
  const url = `${host}/wp-json/wp/v2/pages?slug=${name}&_embed`;

  return fetch(url, options)
    .then(checkStatus)
    .then(res => res.json())
    .then(pages => {
      return Array.isArray(pages) && pages.length === 1 ? pages[0] : null;
    });
};

export default {
  getLatestPosts,
  getPageByName,
  getPost,
  getPosts,
  getPostsByCategory,
};
