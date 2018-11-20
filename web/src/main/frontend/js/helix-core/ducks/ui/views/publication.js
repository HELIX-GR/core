// Services
import { default as catalogService } from '../../../service/search';

// Actions
const PUBLICATION_REQUEST = 'ui/search-page/PUBLICATION_REQUEST';
const PUBLICATION_RESPONSE = 'ui/search-page/PUBLICATION_RESPONSE';

// Reducer
const initialState = {
  loading: false,
  id: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case PUBLICATION_REQUEST:
      return {
        ...state,
        loading: true,
        id: action.id,
        data: null,
      };

    case PUBLICATION_RESPONSE:
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
const getPublicationBegin = (id) => ({
  type: PUBLICATION_REQUEST,
  id,
});

const getPublicationComplete = (data) => ({
  type: PUBLICATION_RESPONSE,
  data,
});

// Thunk actions
export const getPublication = (id) => (dispatch, getState) => {
  const { meta: { csrfToken: token } } = getState();

  dispatch(getPublicationBegin(id));
  return catalogService.getPublication(token, id)
    .then((data) => {
      dispatch(getPublicationComplete(data));
      return (data);
    })
    .catch((err) => {
      // TODO: Add error handling
      console.error('Failed loading catalog data:', err);
    });
};
