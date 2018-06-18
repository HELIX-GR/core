// Services
import { default as catalogService } from '../../../service/search';

// Model
import {
  EnumCatalog,
} from '../../../model';

// Actions
const ADVANCED_SEARCH_TOGGLE = 'ui/search-page/ADVANCED_SEARCH_TOGGLE';
const PILL_TOGGLE = 'ui/search-page/PILL_TOGGLE';
const TEXT_CHANGE = 'ui/search-page/TEXT_CHANGE';

const SEARCH_REQUEST = 'ui/search-page/SEARCH_REQUEST';
const SEARCH_RESPONSE = 'ui/search-page/SEARCH_RESPONSE';

// Reducer
const initialState = {
  advanced: false,
  loading: false,
  pills: {
    data: true,
    pubs: true,
    lab: false,
  },
  result: {
    composite: {},
  },
  text: '',
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ADVANCED_SEARCH_TOGGLE:
      return {
        ...state,
        advanced: !state.advanced,
      };

    case PILL_TOGGLE:
      return {
        ...state,
        pills: {
          ...state.pills,
          [action.id]: !state.pills[action.id],
        }
      };

    case TEXT_CHANGE:
      return {
        ...state,
        text: action.value,
      };

    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_RESPONSE:
      return {
        ...state,
        loading: false,
        result: {
          ...state.result,
          composite: action.data.catalogs,
        },
      };

    default:
      return state;
  }
};

// Action creators
export const changeText = (value) => ({
  type: TEXT_CHANGE,
  value,
});

export const toggleAdvanced = () => ({
  type: ADVANCED_SEARCH_TOGGLE,
});

export const togglePill = (id) => ({
  type: PILL_TOGGLE,
  id,
});

const catalogSearchBegin = (term) => ({
  type: SEARCH_REQUEST,
  term,
});

const catalogSearchComplete = (data) => ({
  type: SEARCH_RESPONSE,
  data,
});

// Thunk actions
export const searchKeyword = (term) => (dispatch, getState) => {
  const { meta: { csrfToken: token } } = getState();

  dispatch(catalogSearchBegin(term));
  return catalogService.searchKeyword(token, term)
    .then((data) => {
      dispatch(catalogSearchComplete(data));
    })
    .catch((err) => {
      // TODO: Add error handling
      console.error('Failed loading catalog data:', err);
    });
};

export const search = (term, pageIndex = 0, pageSize = 10) => (dispatch, getState) => {
  const { meta: { csrfToken: token }, ui: { search: { pills } } } = getState();

  const queries = {};
  if (pills.data) {
    queries[EnumCatalog.CKAN] = {
      pageIndex,
      pageSize,
      term,
    };
  }
  if (pills.pubs) {
    queries[EnumCatalog.OPENAIRE] = {
      pageIndex,
      pageSize,
      term,
    };
  }

  dispatch(catalogSearchBegin(term));
  return catalogService.search(token, { queries })
    .then((data) => {
      dispatch(catalogSearchComplete(data));
    })
    .catch((err) => {
      // TODO: Add error handling
      console.error('Failed loading catalog data:', err);
    });
};
