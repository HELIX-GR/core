import moment from '../../../moment-localized';

const EnumCategory = {
  News: 'news',
  Events: 'events',
};

// Services
import { default as wordPressService } from '../../../service/wordpress';

// Actions
const POST_LATEST_REQUEST = 'ui/news/POST_LATEST_REQUEST';
const POST_LATEST_RESPONSE = 'ui/news/POST_LATEST_RESPONSE';

const POST_PAGE_REQUEST = 'ui/news/POST_PAGE_REQUEST';
const POST_PAGE_RESPONSE = 'ui/news/POST_PAGE_RESPONSE';

const POST_REQUEST = 'ui/news/POST_REQUEST';
const POST_RESPONSE = 'ui/news/POST_RESPONSE';

const RELATIVE_POSTS_REQUEST = 'ui/news/RELATIVE_POSTS_REQUEST';
const RELATIVE_POSTS_RESPONSE = 'ui/news/RELATIVE_POSTS_RESPONSE';

// Reducer
const initialState = {
  // True if a request is pending
  loading: false,
  // Most recent posts
  latest: [],
  // Timestamp of most recent request for latest posts
  lastUpdate: null,
  // Current page of posts
  page: {
    pageIndex: 1,
    pageSize: 10,
    posts: [],
    count: 0,
  },
  // Current post
  current: null,
  // Related posts for the current post
  related: [],
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
        latest: action.posts,
        lastUpdate: new Date(),
      };

    case POST_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POST_PAGE_RESPONSE:
      return {
        ...state,
        loading: false,
        page: {
          // If no new posts are found, do not increase the page index
          pageIndex: action.posts.length === 0 ? Math.max(1, action.pageIndex - 1) : action.pageIndex,
          pageSize: action.pageSize,
          // If the first page is required, reset results
          posts: action.pageIndex === 1 ? action.posts : [...state.page.posts, ...action.posts],
          // If an error occurs, keep the last total record counter
          count: action.count || state.page.count,
        },
      };

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

    case RELATIVE_POSTS_REQUEST:
      return {
        ...state,
        related: [],
      };

    case RELATIVE_POSTS_RESPONSE:
      return {
        ...state,
        related: action.posts,
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

const getPostPageBegin = (pageIndex, pageSize) => ({
  type: POST_PAGE_REQUEST,
  pageIndex,
  pageSize,
});

const getPostPageComplete = (pageIndex, pageSize, count, posts) => ({
  type: POST_PAGE_RESPONSE,
  pageIndex,
  pageSize,
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

const getRelativePostsBegin = (count, category) => ({
  type: RELATIVE_POSTS_REQUEST,
  count,
  category,
});

const getRelativePostsComplete = (posts) => ({
  type: RELATIVE_POSTS_RESPONSE,
  posts,
});

// Thunk actions
export const getLatestPosts = (count) => (dispatch, getState) => {
  const {
    ui: { news: { lastUpdate, latest: posts } },
    config: { wordPress: { endpoint: host, categories } },
  } = getState();

  const category = categories.find(c => c.name === EnumCategory.News).id;

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
  return wordPressService.getLatestPosts(host, count, category)
    .then((data) => {
      dispatch(getPostLatestComplete(data.posts));
    })
    .catch((err) => {
      console.error('Failed loading WordPress posts:', err);
      dispatch(getPostLatestComplete([]));
    });
};

export const getPosts = (pageIndex, pageSize) => (dispatch, getState) => {
  const {
    config: { wordPress: { endpoint: host, categories } },
  } = getState();

  const category = categories.find(c => c.name === EnumCategory.News).id;

  // Check configuration
  if (!host) {
    dispatch(getPostPageComplete(pageIndex, pageSize, 0, []));
  }

  dispatch(getPostPageBegin(pageIndex, pageSize));
  return wordPressService.getPosts(host, pageIndex, pageSize, category)
    .then((data) => {
      dispatch(getPostPageComplete(pageIndex, pageSize, data.count, data.posts));
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

export const getRelativePosts = (count) => (dispatch, getState) => {
  const {
    ui: { news: { current: post } },
    config: { wordPress: { endpoint: host } },
  } = getState();

  // Check configuration and state
  if ((!host) || (!post) || (post.categories.length !== 0)) {
    dispatch(getRelativePostsComplete([]));
  }
  const category = post.categories[0];

  dispatch(getRelativePostsBegin(count, category));
  return wordPressService.getPostsByCategory(host, count, category)
    .then((data) => {
      dispatch(getRelativePostsComplete(data.posts.filter(p => p.id !== post.id)));
    })
    .catch((err) => {
      console.error('Failed loading WordPress posts:', err);
      dispatch(getRelativePostsComplete([]));
    });
};

