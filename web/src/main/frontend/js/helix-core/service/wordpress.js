import fetch from 'fetch';

import {
  checkStatus,
} from './util/check-fetch-status';

const headers = {
  'accept': 'application/json',
  'Content-Type': 'application/json',
};

const getLatestPosts = (host, count) => {
  return getPosts(host, 1, count);
};

const getPostsByCategory = (host, count, category) => {
  return getPosts(host, 1, count, category);
};

const getPosts = (host, pageIndex, pageSize, category = null) => {
  const url = `${host}/wp-json/wp/v2/posts?page=${pageIndex}&per_page=${pageSize}${category ? '&categories=' + category : ''}&_embed`;

  const options = {
    method: 'GET',
    headers,
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(res => {
      return res.json()
        .then(data => ({
          count: +res.headers.get('X-WP-Total'),
          posts: data,
        }));
    });
};

const getPost = (host, id) => {
  const url = `${host}/wp-json/wp/v2/posts/${id}?_embed`;

  const options = {
    method: 'GET',
    headers,
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(res => res.json());
};

export default {
  getLatestPosts,
  getPost,
  getPosts,
  getPostsByCategory,
};
