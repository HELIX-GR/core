import moment from '../moment-localized';

import { default as userService } from '../service/user';
import { default as favoriteService } from '../service/favorite';

// Actions
export const LOGIN = 'user/LOGIN';
export const LOGOUT = 'user/LOGOUT';

const REQUEST_LOGIN = 'user/REQUEST_LOGIN';
const REQUEST_LOGOUT = 'user/REQUEST_LOGOUT';

const GET_PROFILE_REQUEST = 'user/GET_PROFILE_REQUEST';
const GET_PROFILE_RESPONSE = 'user/GET_PROFILE_RESPONSE';
const UPDATE_PROFILE_REQUEST = 'ui/news/UPDATE_PROFILE_REQUEST';
const UPDATE_PROFILE_RESPONSE = 'ui/news/UPDATE_PROFILE_RESPONSE';

const ADD_FAVORITE_REQUEST = 'ui/news/ADD_FAVORITE_REQUEST';
const ADD_FAVORITE_RESPONSE = 'ui/news/ADD_FAVORITE_RESPONSE';
const REMOVE_FAVORITE_REQUEST = 'ui/news/REMOVE_FAVORITE_REQUEST';
const REMOVE_FAVORITE_RESPONSE = 'ui/news/REMOVE_FAVORITE_RESPONSE';

const ADD_COLLECTION_REQUEST = 'ui/news/ADD_COLLECTION_REQUEST';
const ADD_COLLECTION_RESPONSE = 'ui/news/ADD_COLLECTION_RESPONSE';
const UPDATE_COLLECTION_REQUEST = 'ui/news/UPDATE_COLLECTION_REQUEST';
const UPDATE_COLLECTION_RESPONSE = 'ui/news/UPDATE_COLLECTION_RESPONSE';
const REMOVE_COLLECTION_REQUEST = 'ui/news/REMOVE_COLLECTION_REQUEST';
const REMOVE_COLLECTION_RESPONSE = 'ui/news/REMOVE_COLLECTION_RESPONSE';

const ADD_TO_COLLECTION_REQUEST = 'ui/news/ADD_TO_COLLECTION_REQUEST';
const ADD_TO_COLLECTION_RESPONSE = 'ui/news/ADD_TO_COLLECTION_RESPONSE';
const REMOVE_FROM_COLLECTION_REQUEST = 'ui/news/REMOVE_FROM_COLLECTION_REQUEST';
const REMOVE_FROM_COLLECTION_RESPONSE = 'ui/news/REMOVE_FROM_COLLECTION_RESPONSE';

const initialState = {
  loggedIn: null,
  profile: null,
  username: null,
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        loggedIn: action.timestamp,
        profile: null,
        username: action.username,
      };

    case LOGOUT:
      return initialState;

    case GET_PROFILE_RESPONSE:
      return {
        ...state,
        profile: {
          ...action.profile,
        },
      };

    case UPDATE_PROFILE_RESPONSE:
      return {
        ...state,
        profile: {
          ...state.profile,
          account: {
            ...state.profile.account,
            profile: {
              ...action.profile,
            }
          }
        },
      };

    case ADD_FAVORITE_RESPONSE:
      return {
        ...state,
        profile: {
          ...state.profile,
          favorites: [...state.profile.favorites, { ...action.data }],
        },
      };

    case REMOVE_FAVORITE_RESPONSE:
      return {
        ...state,
        profile: {
          ...state.profile,
          favorites: state.profile.favorites.filter(f => f.catalog !== action.favorite.catalog || f.handle !== action.favorite.handle),
          collections: state.profile.collections.map(c1 => action.collections.find(c2 => c1.id === c2.id) || c1),
        }
      };

    case ADD_COLLECTION_RESPONSE:
      return {
        ...state,
        profile: {
          ...state.profile,
          collections: [...state.profile.collections, { ...action.collection }],
        },
      };

    case UPDATE_COLLECTION_RESPONSE:
      return {
        ...state,
        profile: {
          ...state.profile,
          collections: state.profile.collections.map(c => {
            if (c.id !== action.collection.id) {
              return c;
            }
            return { ...action.collection };
          }),
        },
      };

    case REMOVE_COLLECTION_RESPONSE:
      return {
        ...state,
        profile: {
          ...state.profile,
          collections: state.profile.collections.filter(c => c.id !== action.id),
        }
      };

    case ADD_TO_COLLECTION_RESPONSE:
    case REMOVE_FROM_COLLECTION_RESPONSE:
      return {
        ...state,
        profile: {
          ...state.profile,
          collections: state.profile.collections.map(c => {
            if (c.id !== action.collection.id) {
              return c;
            }
            return { ...action.collection };
          }),
        },
      };

    default:
      return state;
  }
};

// Action Creators

const requestLogin = (username) => ({
  type: REQUEST_LOGIN,
  username,
});

const loggedIn = (username, token, timestamp) => ({
  type: LOGIN,
  username,
  token,
  timestamp,
});

const requestLogout = () => ({
  type: REQUEST_LOGOUT,
});

const loggedOut = (token, timestamp) => ({
  type: LOGOUT,
  token,
  timestamp,
});

const requestProfile = () => ({
  type: GET_PROFILE_REQUEST,
});

const profileLoaded = (profile, timestamp) => ({
  type: GET_PROFILE_RESPONSE,
  profile,
  timestamp,
});

const requestProfileUpdate = () => ({
  type: UPDATE_PROFILE_REQUEST,
});

const profileUpdated = (profile, timestamp) => ({
  type: UPDATE_PROFILE_RESPONSE,
  profile,
  timestamp,
});

const addFavoriteBegin = () => ({
  type: ADD_FAVORITE_REQUEST,
});

const addFavoriteComplete = (data) => ({
  type: ADD_FAVORITE_RESPONSE,
  data,
});

const removeFavoriteBegin = () => ({
  type: REMOVE_FAVORITE_REQUEST,
});

const removeFavoriteComplete = (favorite, collections) => ({
  type: REMOVE_FAVORITE_RESPONSE,
  favorite,
  collections,
});

const addCollectionBegin = () => ({
  type: ADD_COLLECTION_REQUEST,
});

const addCollectionComplete = (collection) => ({
  type: ADD_COLLECTION_RESPONSE,
  collection,
});

const updateCollectionBegin = () => ({
  type: UPDATE_COLLECTION_REQUEST,
});

const updateCollectionComplete = (collection) => ({
  type: UPDATE_COLLECTION_RESPONSE,
  collection,
});

const removeCollectionBegin = () => ({
  type: REMOVE_COLLECTION_REQUEST,
});

const removeCollectionComplete = (id) => ({
  type: REMOVE_COLLECTION_RESPONSE,
  id,
});

const addFavoriteToCollectionBegin = () => ({
  type: ADD_TO_COLLECTION_REQUEST,
});

const addFavoriteToCollectionComplete = (collection) => ({
  type: ADD_TO_COLLECTION_RESPONSE,
  collection,
});

const removeFavoriteFromCollectionBegin = () => ({
  type: REMOVE_FROM_COLLECTION_REQUEST,
});

const removeFavoriteFromCollectionComplete = (collection) => ({
  type: REMOVE_FROM_COLLECTION_RESPONSE,
  collection,
});

// Thunk actions
export const login = (username, password) => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();
  dispatch(requestLogin(username));
  return userService.login(username, password, token).then(
    (r) => {
      var t = moment().valueOf();
      dispatch(loggedIn(username, r.csrfToken, t));
    },
    (err) => {
      console.error('Failed login: ' + err.message);
      throw err;
    });
};

export const logout = () => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();
  dispatch(requestLogout());
  return userService.logout(token).then(
    (r) => {
      var t = moment().valueOf();
      dispatch(loggedOut(r.csrfToken, t));
    },
    (err) => {
      console.error('Failed logout');
      throw err;
    });
};

export const refreshProfile = () => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();

  dispatch(requestProfile());
  return userService.getProfile(token).then(
    (p) => {
      var t = moment().valueOf();
      dispatch(profileLoaded(p, t));
    },
    (err) => {
      console.warn('Cannot load user profile: ' + err.message);
      throw err;
    });
};

export const updateProfile = (profile) => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();

  dispatch(requestProfileUpdate());
  return userService.updateProfile(profile, token).then(
    (p) => {
      var t = moment().valueOf();
      dispatch(profileUpdated(p, t));
    },
    (err) => {
      console.warn('Cannot load user profile: ' + err.message);
      throw err;
    });
};

export const addFavorite = (data) => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();

  dispatch(addFavoriteBegin());
  return favoriteService.addFavorite(data.catalog, data.handle, data.title, data.description, data.url, token).then(
    (result) => {
      dispatch(addFavoriteComplete(result));
    },
    (err) => {
      console.warn('Add favorite action failed: ' + err.message);
      throw err;
    });
};

export const removeFavorite = (favorite) => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();

  dispatch(removeFavoriteBegin());
  return favoriteService.removeFavorite(favorite.catalog, favorite.handle, token).then(
    (collections) => {
      dispatch(removeFavoriteComplete(favorite, collections));
    },
    (err) => {
      console.warn('Remove favorite action failed: ' + err.message);
      throw err;
    });
};

export const addCollection = (title) => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();

  dispatch(addCollectionBegin());
  return favoriteService.addCollection(title, token).then(
    (data) => {
      dispatch(addCollectionComplete(data));
    },
    (err) => {
      console.warn('Add collection action failed: ' + err.message);
      throw err;
    });
};

export const updateCollection = (id, title) => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();

  dispatch(updateCollectionBegin());
  return favoriteService.updateCollection(id, title, token).then(
    (data) => {
      dispatch(updateCollectionComplete(data));
    },
    (err) => {
      console.warn('Add collection action failed: ' + err.message);
      throw err;
    });
};

export const removeCollection = (id) => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();

  dispatch(removeCollectionBegin());
  return favoriteService.removeCollection(id, token).then(
    () => {
      dispatch(removeCollectionComplete(id));
    },
    (err) => {
      console.warn('Remove collection action failed: ' + err.message);
      throw err;
    });
};

export const addFavoriteToCollection = (collection, favorite) => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();

  dispatch(addFavoriteToCollectionBegin());
  return favoriteService.addFavoriteToCollection(collection, favorite, token).then(
    (result) => {
      dispatch(addFavoriteToCollectionComplete(result));
    },
    (err) => {
      console.warn('Add favorite to collection action failed: ' + err.message);
      throw err;
    });
};

export const removeFavoriteFromCollection = (collection, favorite) => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();

  dispatch(removeFavoriteFromCollectionBegin());
  return favoriteService.removeFavoriteFromCollection(collection, favorite, token).then(
    (result) => {
      dispatch(removeFavoriteFromCollectionComplete(result));
    },
    (err) => {
      console.warn('Add favorite to collection action failed: ' + err.message);
      throw err;
    });
};
