// Services
import { default as catalogService } from '../../../service/search';

// Actions
const DATASET_REQUEST = 'ui/search-page/DATASET_REQUEST';
const DATASET_RESPONSE = 'ui/search-page/DATASET_RESPONSE';

// Reducer
const initialState = {
  loading: false,
  id: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case DATASET_REQUEST:
      return {
        ...state,
        loading: true,
        id: action.id,
        data: null,
      };

    case DATASET_RESPONSE:
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
const getDatasetBegin = (id) => ({
  type: DATASET_REQUEST,
  id,
});

const getDatasetComplete = (data) => ({
  type: DATASET_RESPONSE,
  data,
});

// Thunk actions
export const getDataset = (id) => (dispatch, getState) => {
  const { meta: { csrfToken: token } } = getState();

  dispatch(getDatasetBegin(id));
  return catalogService.getDataset(token, id)
    .then((data) => {
      dispatch(getDatasetComplete(data));
      return (data);
    })
    .catch((err) => {
      // TODO: Add error handling
      console.error('Failed loading catalog data:', err);
    });
};
