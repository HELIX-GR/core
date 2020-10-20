import moment from '../../../moment-localized';

import {
  EnumPostCategory,
} from '../../../model';

// Services
import { default as wordPressService } from '../../../service/wordpress';

// Actions
const POST_LATEST_REQUEST = 'ui/posts/POST_LATEST_REQUEST';
const POST_LATEST_RESPONSE = 'ui/posts/POST_LATEST_RESPONSE';

const POST_PAGE_REQUEST = 'ui/posts/POST_PAGE_REQUEST';
const POST_PAGE_RESPONSE = 'ui/posts/POST_PAGE_RESPONSE';

const POST_REQUEST = 'ui/posts/POST_REQUEST';
const POST_RESPONSE = 'ui/posts/POST_RESPONSE';

// Reducer
const initialState = {
  // True if a request is pending
  loading: false,
  // Most recent posts
  latest: {
    lastUpdate: null,
    posts: [],
  },
  // Current page of posts
  pages: {
    [EnumPostCategory.Blog]: {
      pageIndex: 1,
      pageSize: 10,
      posts: null,
      count: 0,
    },
    [EnumPostCategory.DialogueForum]: {
      pageIndex: 1,
      pageSize: 10,
      posts: null,
      count: 0,
    },
    [EnumPostCategory.Newsletter]: {
      pageIndex: 1,
      pageSize: 10,
      posts: null,
      count: 0,
    },
    [EnumPostCategory.OtherEvent]: {
      pageIndex: 1,
      pageSize: 10,
      posts: null,
      count: 0,
    },
    [EnumPostCategory.Workshop]: {
      pageIndex: 1,
      pageSize: 10,
      posts: null,
      count: 0,
    },
  },
  // Current category
  category: null,
  // Current post
  current: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case POST_LATEST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POST_LATEST_RESPONSE:
      return {
        ...state,
        loading: false,
        latest: {
          lastUpdate: new Date(),
          posts: action.posts,
        },
      };

    case POST_PAGE_REQUEST:
      return {
        ...state,
        category: action.category,
        loading: true,
      };

    case POST_PAGE_RESPONSE: {
      const current = state.pages[action.categoryName];

      return {
        ...state,
        loading: false,
        pages: {
          ...state.pages,
          [action.categoryName]: {
            // If no new posts are found, do not increase the page index
            pageIndex: action.posts.length === 0 ? Math.max(1, action.pageIndex - 1) : action.pageIndex,
            pageSize: action.pageSize,
            // If the first page is requested, reset results
            posts: action.pageIndex === 1 ? action.posts : [...current.posts, ...action.posts],
            // If an error occurs, keep the last total record counter
            count: action.count || current.count,
          },
        },
      };
    }

    case POST_REQUEST:
      return {
        ...state,
        loading: true,
        current: null,
      };

    case POST_RESPONSE:
      return {
        ...state,
        loading: false,
        current: action.post,
      };

    default:
      return state;
  }
};

// Action creators

const getPostLatestBegin = (count) => ({
  type: POST_LATEST_REQUEST,
  count,
});

const getPostLatestComplete = (posts) => ({
  type: POST_LATEST_RESPONSE,
  posts,
});

const getPostPageBegin = (pageIndex, pageSize, category) => ({
  type: POST_PAGE_REQUEST,
  category,
  pageIndex,
  pageSize,
});

const getPostPageComplete = (pageIndex, pageSize, count, posts, categoryId, categoryName) => ({
  type: POST_PAGE_RESPONSE,
  pageIndex,
  pageSize,
  categoryId,
  categoryName,
  count,
  posts,
});

const getPostBegin = (id) => ({
  type: POST_REQUEST,
  id,
});

const getPostComplete = (post) => ({
  type: POST_RESPONSE,
  post,
});

// Thunk actions
export const getLatestPosts = (count, categoryName = null) => (dispatch, getState) => {
  const {
    ui: { posts: { latest: { lastUpdate, posts } } },
    config: { wordPress: { endpoint: host, categories } },
  } = getState();

  const categoryId = categoryName ? categories.find(c => c.name === categoryName).id : null;

  // Check configuration
  if (!host) {
    dispatch(getPostLatestComplete([]));
  }

  // Refresh only after 30 minutes since the last update
  if ((lastUpdate) && (posts.length !== 0)) {
    const now = moment();
    const interval = moment.duration(now.diff(lastUpdate)).asMinutes();
    if (interval < 30) {
      dispatch(getPostLatestComplete(posts));
      return posts;
    }
  }

  dispatch(getPostLatestBegin(count));
  return wordPressService.getLatestPosts(host, count)
    .then((data) => {
      dispatch(getPostLatestComplete(data.posts));
    })
    .catch((err) => {
      console.error('Failed loading WordPress posts:', err);
      dispatch(getPostLatestComplete([]));
    });
};

export const getPosts = (pageIndex, pageSize, categoryName) => (dispatch, getState) => {
  const {
    config: { wordPress: { endpoint: host, categories } },
  } = getState();

  const categoryId = categories.find(c => c.name === categoryName).id;

  // Check configuration
  if (!host) {
    dispatch(getPostPageComplete(pageIndex, pageSize, 0, []));
  }

  dispatch(getPostPageBegin(pageIndex, pageSize, categoryId));
  return wordPressService.getPosts(host, pageIndex, pageSize, categoryId)
    .then((data) => {
      dispatch(getPostPageComplete(pageIndex, pageSize, data.count, data.posts, categoryId, categoryName));
    })
    .catch((err) => {
      console.error('Failed loading WordPress posts:', err);
      dispatch(getPostPageComplete(pageIndex, pageSize, null, []));
    });
};

export const getPost = (id) => (dispatch, getState) => {
  const {
    config: { wordPress: { endpoint: host } },
  } = getState();

  // Check configuration
  if (!host) {
    dispatch(getPostComplete(null));
  }

  dispatch(getPostBegin(id));
  return wordPressService.getPost(host, id)
    .then((post) => {
      dispatch(getPostComplete(post));
      return post;
    })
    .catch((err) => {
      // TODO: Add error handling
      console.error('Failed loading WordPress posts:', err);
    });
};
