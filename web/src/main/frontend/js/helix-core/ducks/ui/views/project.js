import moment from '../../../moment-localized';

// Services
import { default as wordPressService } from '../../../service/wordpress';

// Actions
const PAGE_REQUEST = 'ui/project/PAGE_REQUEST';
const PAGE_RESPONSE = 'ui/project/PAGE_RESPONSE';
const PAGE_NOT_FOUND = 'ui/project/PAGE_NOT_FOUND';

// Reducer
const initialState = {
  // True if a request is pending
  loading: false,
  // Current page
  current: null,
  // Page cache
  pages: {},
};

export default (state = initialState, action) => {
  switch (action.type) {

    case PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PAGE_RESPONSE:
      return {
        ...state,
        loading: false,
        current: action.page,
        pages: {
          ...state.pages,
          [action.page.slug]: {
            page: action.page,
            lastUpdate: new Date(),
          },
        }
      };

    case PAGE_NOT_FOUND:
      return {
        ...state,
        loading: false,
        current: null,
      };

    default:
      return state;
  }
};

// Action creators

const getPageBegin = (name) => ({
  type: PAGE_REQUEST,
  name,
});

const getPageComplete = (page) => ({
  type: PAGE_RESPONSE,
  page,
});

const getPageNotFound = () => ({
  type: PAGE_NOT_FOUND,
});

// Thunk actions
export const getPage = (name) => (dispatch, getState) => {
  const {
    ui: { project: { pages } },
    config: { wordPress: { endpoint: host } },
  } = getState();

  // Check configuration
  if (!host) {
    dispatch(getPageNotFound());
    return null;
  }

  // Refresh cache only after 30 minutes since the last update
  const cachedPage = pages[name];

  if (cachedPage) {
    const now = moment();
    const interval = moment.duration(now.diff(cachedPage.lastUpdate)).asMinutes();
    if (interval < 30) {
      dispatch(getPageComplete(cachedPage.page));
      return cachedPage.page;
    }
  }

  dispatch(getPageBegin(name));
  return wordPressService.getPageByName(host, name)
    .then((page) => {
      if (page) {
        dispatch(getPageComplete(page));
      } else {
        dispatch(getPageNotFound());
      }
      return page;
    })
    .catch((err) => {
      console.error('Failed loading WordPress page:', err);
      dispatch(getPageNotFound());
    });
};
