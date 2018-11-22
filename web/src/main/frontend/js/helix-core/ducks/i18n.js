import moment from '../moment-localized';

import i18n from '../service/i18n';

import {
  EnumLocale,
} from '../model';

// Actions
const REQUEST_MESSAGES = 'locale/REQUEST_MESSAGES';
const LOAD_MESSAGES = 'locale/LOAD_MESSAGES';

const initialState = {
  locale: EnumLocale.EN,
  messages: {},
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_MESSAGES:
      return state;

    case LOAD_MESSAGES:
      moment.locale(action.locale);
      return {
        ...state,
        locale: action.locale,
        messages: {
          ...state.messages,
          [action.locale]: action.messages,
        }
      };

    default:
      return state;
  }
};

// Action Creators
const loadMessages = (locale, messages) => ({
  type: LOAD_MESSAGES,
  locale,
  messages,
});

const requestMessages = (locale) => ({
  type: REQUEST_MESSAGES,
  locale,
});

// Thunk actions
const fetchMessages = (locale) => (dispatch) => {
  dispatch(requestMessages(locale));
  return i18n.getMessages(locale)
    .then(r => dispatch(loadMessages(locale, r)));
};

export const changeLocale = (locale) => (dispatch) => {
  dispatch(fetchMessages(locale))
    .catch(
      () => console.warn("No messages for locale " + locale));
};
