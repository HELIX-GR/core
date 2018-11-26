import _ from 'lodash';
import moment from '../moment-localized';

import { default as userService } from '../service/user';
import { default as favoriteService } from '../service/favorite';

// Actions
export const LOGIN = 'user/LOGIN';
export const LOGOUT = 'user/LOGOUT';

const REQUEST_LOGIN = 'user/REQUEST_LOGIN';
const REQUEST_LOGOUT = 'user/REQUEST_LOGOUT';
const REQUEST_PROFILE = 'user/REQUEST_PROFILE';
const LOAD_PROFILE = 'user/LOAD_PROFILE';

const ADD_FAVORITE_REQUEST = 'ui/news/ADD_FAVORITE_REQUEST';
const ADD_FAVORITE_RESPONSE = 'ui/news/ADD_FAVORITE_RESPONSE';
const REMOVE_FAVORITE_REQUEST = 'ui/news/REMOVE_FAVORITE_REQUEST';
const REMOVE_FAVORITE_RESPONSE = 'ui/news/REMOVE_FAVORITE_RESPONSE';

const initialState = {
  username: null,
  loggedIn: null,
  profile: null,
  favorites: [],
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        username: action.username,
        loggedIn: action.timestamp,
        profile: null,
        favorites: [],
      };

    case LOGOUT:
      return initialState;

    case LOAD_PROFILE:
      return {
        ...state,
        profile: {
          ...action.profile.account,
          _updatedAt: action.timestamp,
          _savedAt: action.timestamp, // in sync with server
        },
        favorites: action.profile.favorites || [],
      };

    case ADD_FAVORITE_RESPONSE:
      return {
        ...state,
        favorites: [...state.favorites, { ...action.data, }],
      };

    case REMOVE_FAVORITE_RESPONSE:
      return {
        ...state,
        favorites: state.favorites.filter(f => f.catalog !== action.data.catalog || f.handle !== action.data.handle),
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
  type: REQUEST_PROFILE,
});

const loadProfile = (profile, timestamp) => ({
  type: LOAD_PROFILE,
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

const removeFavoriteComplete = (data) => ({
  type: REMOVE_FAVORITE_RESPONSE,
  data,
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
      dispatch(loadProfile(p, t));
    },
    (err) => {
      console.warn('Cannot load user profile: ' + err.message);
      throw err;
    });
};

export const addFavorite = (data) => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();

  dispatch(addFavoriteBegin());
  return favoriteService.add(data.catalog, data.handle, data.title, data.description, data.url, token).then(
    () => {
      dispatch(addFavoriteComplete(data));
    },
    (err) => {
      console.warn('Cannot load user profile: ' + err.message);
      throw err;
    });
};

export const removeFavorite = (data) => (dispatch, getState) => {
  var { meta: { csrfToken: token } } = getState();

  dispatch(removeFavoriteBegin());
  return favoriteService.remove(data.catalog, data.handle, token).then(
    () => {
      dispatch(removeFavoriteComplete(data));
    },
    (err) => {
      console.warn('Cannot load user profile: ' + err.message);
      throw err;
    });
};
