// Services
import { default as catalogService } from '../../../service/search';

// Model
import {
  EnumCatalog,
  EnumOpenaireFilter,
} from '../../../model';

// Actions
const ADVANCED_SEARCH_TOGGLE = 'ui/pubs/ADVANCED_SEARCH_TOGGLE';
const SET_OPENAIRE_FILTER = 'ui/pubs/SET_OPENAIRE_FILTER';
const SET_OPENAIRE_PROVIDER = 'ui/pubs/SET_OPENAIRE_PROVIDER';
const SET_RESULT_VISIBILITY = 'ui/pubs/SET_RESULT_VISIBILITY';
const SET_TEXT = 'ui/pubs/SET_TEXT';

const SEARCH_REQUEST = 'ui/pubs/SEARCH_REQUEST';
const SEARCH_RESPONSE = 'ui/pubs/SEARCH_RESPONSE';

const SEARCH_AUTOCOMPLETE_REQUEST = 'ui/pubs/SEARCH_AUTOCOMPLETE_REQUEST';
const SEARCH_AUTOCOMPLETE_RESPONSE = 'ui/pubs/SEARCH_AUTOCOMPLETE_RESPONSE';

// Reducer
const initialState = {
  advanced: false,
  loading: false,
  openaire: {
    authors: [],
    fromDateAccepted: null,
    providers: [],
    toDateAccepted: null,
  },
  partialResult: {
    visible: false,
    catalogs: {},
  },
  result: {
    catalogs: {},
  },
  text: '',
};

/**
 * Updates OpenAIRE state
 *
 * @param {*} state - the current openaire state
 * @param {*} action - the requested action
 * @returns the new openaire state
 */
function openaireReducer(state, action) {
  const { providers } = state;

  switch (action.type) {
    case SET_OPENAIRE_FILTER:
      // Check if filter is supported
      if (!Object.keys(EnumOpenaireFilter).find(key => EnumOpenaireFilter[key] === action.key)) {
        console.warn(`OpenAIRE filter ${action.key} is not supported`);
        return state;
      }
      return {
        ...state,
        [action.key]: action.value,
      };

    case SET_OPENAIRE_PROVIDER:
      return {
        ...state,
        providers: providers.find(p => p === action.provider) ?
          providers.filter(p => p !== action.provider) :
          [...providers, action.provider],
      };

    default:
      return state;
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case ADVANCED_SEARCH_TOGGLE:
      return {
        ...state,
        advanced: !state.advanced,
      };

    case SET_OPENAIRE_FILTER:
    case SET_OPENAIRE_PROVIDER:
      return {
        ...state,
        openaire: openaireReducer(state.openaire, action),
      };

    case SET_RESULT_VISIBILITY:
      return {
        ...state,
        partialResult: {
          ...state.partialResult,
          visible: action.visible,
        },
      };

    case SET_TEXT:
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
        loading: false,
        result: {
          catalogs: action.data.catalogs || {},
        },
      };

    case SEARCH_AUTOCOMPLETE_RESPONSE:
      return {
        ...state,
        advanced: false,
        loading: false,
        partialResult: {
          visible: true,
          catalogs: action.data.catalogs || {},
        },
      };

    default:
      return state;
  }
};

// Action creators
export const setText = (value) => ({
  type: SET_TEXT,
  value,
});

export const toggleAdvanced = () => ({
  type: ADVANCED_SEARCH_TOGGLE,
});

export const setOpenaireFilter = (key, value) => ({
  type: SET_OPENAIRE_FILTER,
  key,
  value,
});

export const toggleOpenaireProvider = (provider) => ({
  type: SET_OPENAIRE_PROVIDER,
  provider,
});

export const setResultVisibility = (visible) => ({
  type: SET_RESULT_VISIBILITY,
  visible,
});

const catalogSearchKeywordBegin = (term) => ({
  type: SEARCH_AUTOCOMPLETE_REQUEST,
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
  const { meta: { csrfToken: token }, } = getState();

  dispatch(catalogSearchKeywordBegin(term));
  return catalogService.searchKeyword(token, [EnumCatalog.OPENAIRE], term)
    .then((data) => {
      dispatch(catalogSearchKeywordComplete(data));
      return data;
    })
    .catch((err) => {
      // TODO: Add error handling
      console.error('Failed loading publications data:', err);
    });
};

export const search = (term, advanced = false, pageIndex = 0, pageSize = 10) => (dispatch, getState) => {
  const { meta: { csrfToken: token }, ui: { pubs: { openaire } } } = getState();

  const queries = {
    [EnumCatalog.OPENAIRE]: {
      catalog: EnumCatalog.OPENAIRE,
      pageIndex,
      pageSize,
      term,
      providers: openaire.providers || [],
      [EnumOpenaireFilter.Authors]: openaire[EnumOpenaireFilter.Authors],
      [EnumOpenaireFilter.FromDateAccepted]: openaire[EnumOpenaireFilter.FromDateAccepted],
      [EnumOpenaireFilter.ToDateAccepted]: openaire[EnumOpenaireFilter.ToDateAccepted],
    },
  };

  dispatch(catalogSearchBegin(term));
  return catalogService.search(token, { queries })
    .then((data) => {
      dispatch(catalogSearchComplete(data));
      return (data);
    })
    .catch((err) => {
      // TODO: Add error handling
      console.error('Failed loading publications data:', err);
    });
};
