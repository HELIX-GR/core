// Services
import { default as catalogService } from '../../../service/search';

// Model
import {
  EnumCatalog,
} from '../../../model';

// Actions
const ADVANCED_SEARCH_TOGGLE = 'ui/search-page/ADVANCED_SEARCH_TOGGLE';
const PILL_TOGGLE = 'ui/search-page/PILL_TOGGLE';
const SET_RESULT_VISIBILITY = 'ui/search-page/SET_RESULT_VISIBILITY';
const TEXT_CHANGE = 'ui/search-page/TEXT_CHANGE';

const SEARCH_REQUEST = 'ui/search-page/SEARCH_REQUEST';
const SEARCH_RESPONSE = 'ui/search-page/SEARCH_RESPONSE';

const SEARCH_AUTOCOMPLETE_REQUEST = 'ui/search-page/SEARCH_AUTOCOMPLETE_REQUEST';
const SEARCH_AUTOCOMPLETE_RESPONSE = 'ui/search-page/SEARCH_AUTOCOMPLETE_RESPONSE';

// Reducer
const initialState = {
  advanced: false,
  loading: false,
  partialResult: {
    visible: false,
    catalogs: {},
  },
  pills: {
    data: true,
    pubs: false,
    lab: false,
  },
  result: {
    catalogs: {},
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
          data: false,
          pubs: false,
          lab: false,
          [action.id]: true,
        },
        partialResult: {
          visible: false,
          catalogs: {},
        }
      };

    case SET_RESULT_VISIBILITY:
      return {
        ...state,
        partialResult: {
          ...state.partialResult,
          visible: action.visible,
        },
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

    case SEARCH_AUTOCOMPLETE_REQUEST:
      return {
        ...state,
        loading: true,
        partialResult: {
          visible: false,
          catalogs: {},
        }
      };

    case SEARCH_RESPONSE:
      return {
        ...state,
        loading: true,
        result: {
          catalogs: action.data.catalogs,
        },
      };

    case SEARCH_AUTOCOMPLETE_RESPONSE:
      return {
        ...state,
        loading: false,
        partialResult: {
          visible: true,
          catalogs: action.data.catalogs,
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

export const setResultVisibility = (visible) => ({
  type: SET_RESULT_VISIBILITY,
  visible,
});

const catalogSearchKeywordBegin = (catalog, term) => ({
  type: SEARCH_AUTOCOMPLETE_REQUEST,
  catalog,
  term,
});

const catalogSearchKeywordComplete = (data) => ({
  type: SEARCH_AUTOCOMPLETE_RESPONSE,
  data,
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
export const searchAutoComplete = (term) => (dispatch, getState) => {
  const { meta: { csrfToken: token }, ui: { search: { pills } } } = getState();

  const catalog = pills.data ? EnumCatalog.CKAN : pills.pubs ? EnumCatalog.OPENAIRE : EnumCatalog.NONE;

  dispatch(catalogSearchKeywordBegin(catalog, term));
  return catalogService.searchKeyword(token, catalog, term)
    .then((data) => {
      dispatch(catalogSearchKeywordComplete(data));
      return data;
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
      return (data);
    })
    .catch((err) => {
      // TODO: Add error handling
      console.error('Failed loading catalog data:', err);
    });
};
