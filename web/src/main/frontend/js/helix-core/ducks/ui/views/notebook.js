// Services
import { default as catalogService } from '../../../service/search';

// Actions
const NOTEBOOK_REQUEST = 'ui/search-page/NOTEBOOK_REQUEST';
const NOTEBOOK_RESPONSE = 'ui/search-page/NOTEBOOK_RESPONSE';

// Reducer
const initialState = {
  loading: false,
  id: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case NOTEBOOK_REQUEST:
      return {
        ...state,
        loading: true,
        id: action.id,
        data: null,
      };

    case NOTEBOOK_RESPONSE:
      return {
        ...state,
        loading: false,
        data: action.data || null,
      };

    default:
      return state;
  }
};

// Action creators
const getNotebookBegin = (id) => ({
  type: NOTEBOOK_REQUEST,
  id,
});

const getNotebookComplete = (data) => ({
  type: NOTEBOOK_RESPONSE,
  data,
});

// Thunk actions
export const getNotebook = (id) => (dispatch, getState) => {
  const { meta: { csrfToken: token } } = getState();

  dispatch(getNotebookBegin(id));
  return catalogService.getNotebook(token, id)
    .then((data) => {
      dispatch(getNotebookComplete(data));
      return (data);
    })
    .catch((err) => {
      // TODO: Add error handling
      console.error('Failed loading catalog data:', err);
    });
};
