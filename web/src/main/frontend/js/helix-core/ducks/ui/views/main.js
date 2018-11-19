// Services
import { default as catalogService } from '../../../service/search';

// Model
import {
  EnumCatalog,
  EnumCkanFacet,
  EnumOpenaireFilter,
} from '../../../model';

// Actions
const ADVANCED_SEARCH_TOGGLE = 'ui/search-page/ADVANCED_SEARCH_TOGGLE';
const PILL_TOGGLE = 'ui/search-page/PILL_TOGGLE';
const SET_DATA_FACET = 'ui/search-page/SET_DATA_FACET';
const SET_LAB_FACET = 'ui/search-page/SET_LAB_FACET';
const SET_OPENAIRE_FILTER = 'ui/search-page/SET_OPENAIRE_FILTER';
const SET_OPENAIRE_PROVIDER = 'ui/search-page/SET_OPENAIRE_PROVIDER';
const SET_RESULT_VISIBILITY = 'ui/search-page/SET_RESULT_VISIBILITY';
const SET_TEXT = 'ui/search-page/SET_TEXT';

const SEARCH_REQUEST = 'ui/search-page/SEARCH_REQUEST';
const SEARCH_RESPONSE = 'ui/search-page/SEARCH_RESPONSE';

const SEARCH_AUTOCOMPLETE_REQUEST = 'ui/search-page/SEARCH_AUTOCOMPLETE_REQUEST';
const SEARCH_AUTOCOMPLETE_RESPONSE = 'ui/search-page/SEARCH_AUTOCOMPLETE_RESPONSE';

// Reducer
const initialState = {
  advanced: false,
  data: {
    facets: Object.keys(EnumCkanFacet).reduce((result, key) => { result[EnumCkanFacet[key]] = []; return result; }, {}),
  },
  dspace: {},
  lab: {
    facets: Object.keys(EnumCkanFacet).reduce((result, key) => { result[EnumCkanFacet[key]] = []; return result; }, {}),
  },
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
  pills: {
    data: true,
    pubs: true,
    lab: true,
  },
  result: {
    catalogs: {},
  },
  text: '',
};

/**
 * Updates Data catalog state
 *
 * @param {*} state - the current Data catalog state
 * @param {*} action - the requested action
 * @returns the new Data catalog state
 */
function dataReducer(state, action) {
  const { facets } = state;

  switch (action.type) {
    case SET_DATA_FACET:
      return {
        ...state,
        facets: {
          ...facets,
          [action.facet]: facets[action.facet].find(value => value === action.value) ?
            facets[action.facet].filter(value => value !== action.value) :
            [...facets[action.facet], action.value],
        }
      };

    default:
      return state;
  }
}

/**
 * Updates Lab catalog state
 *
 * @param {*} state - the current Lab catalog state
 * @param {*} action - the requested action
 * @returns the new Lab catalog state
 */
function labReducer(state, action) {
  const { facets } = state;

  switch (action.type) {
    case SET_LAB_FACET:
      return {
        ...state,
        facets: {
          ...facets,
          [action.facet]: facets[action.facet].find(value => value === action.value) ?
            facets[action.facet].filter(value => value !== action.value) :
            [...facets[action.facet], action.value],
        }
      };

    default:
      return state;
  }
}

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

    case PILL_TOGGLE:
      return {
        ...state,
        pills: {
          ...state.pills,
          [action.id]: !state.pills[action.id],
        },
        partialResult: {
          visible: false,
          catalogs: {},
        }
      };

    case SET_DATA_FACET:
      return {
        ...state,
        data: dataReducer(state.data, action),
      };

    case SET_LAB_FACET:
      return {
        ...state,
        lab: labReducer(state.lab, action),
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

export const togglePill = (id) => ({
  type: PILL_TOGGLE,
  id,
});

export const toggleDataFacet = (facet, value) => ({
  type: SET_DATA_FACET,
  facet,
  value,
});

export const toggleLabFacet = (facet, value) => ({
  type: SET_LAB_FACET,
  facet,
  value,
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

const catalogSearchAutoCompleteBegin = (catalog, term) => ({
  type: SEARCH_AUTOCOMPLETE_REQUEST,
  catalog,
  term,
});

const catalogSearchAutoCompleteComplete = (data) => ({
  type: SEARCH_AUTOCOMPLETE_RESPONSE,
  data,
});

const catalogSearchBegin = (term, advanced) => ({
  type: SEARCH_REQUEST,
  term,
  advanced,
});

const catalogSearchComplete = (data) => ({
  type: SEARCH_RESPONSE,
  data,
});

// Thunk actions
export const searchAutoComplete = (term) => (dispatch, getState) => {
  const { meta: { csrfToken: token }, ui: { main: { pills } } } = getState();

  const catalogs = [
    pills.data ? EnumCatalog.CKAN : null,
    pills.pubs ? EnumCatalog.OPENAIRE : null,
    pills.lab ? EnumCatalog.LAB : null,
  ].filter(c => !!c);

  dispatch(catalogSearchAutoCompleteBegin(catalogs, term));
  return catalogService.searchKeyword(token, catalogs, term)
    .then((data) => {
      dispatch(catalogSearchAutoCompleteComplete(data));
      return data;
    })
    .catch((err) => {
      // TODO: Add error handling
      console.error('Failed loading catalog data:', err);
    });
};

export const search = (term, advanced = false, pageIndex = 0, pageSize = 10) => (dispatch, getState) => {
  const { meta: { csrfToken: token }, ui: { main: { pills, data, lab, openaire } } } = getState();
  const queries = {};

  if (pills.data) {
    queries[EnumCatalog.CKAN] = {
      catalog: EnumCatalog.CKAN,
      pageIndex,
      pageSize,
      term,
      facets: advanced ? data.facets : null,
    };
  }
  if (pills.lab) {
    queries[EnumCatalog.LAB] = {
      catalog: EnumCatalog.LAB,
      pageIndex,
      pageSize,
      term,
      facets: advanced ? lab.facets : null,
    };
  }
  if (pills.pubs) {
    queries[EnumCatalog.OPENAIRE] = {
      catalog: EnumCatalog.OPENAIRE,
      pageIndex,
      pageSize,
      term,
      providers: openaire.providers || [],
      [EnumOpenaireFilter.Authors]: openaire[EnumOpenaireFilter.Authors],
      [EnumOpenaireFilter.FromDateAccepted]: openaire[EnumOpenaireFilter.FromDateAccepted],
      [EnumOpenaireFilter.ToDateAccepted]: openaire[EnumOpenaireFilter.ToDateAccepted],
    };
  }

  dispatch(setText(term));
  dispatch(catalogSearchBegin(term, advanced));
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
