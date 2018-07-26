// config.js
import configurationService from '../service/configuration';

// Actions
const REQUEST_CONFIGURATION = 'config/REQUEST_CONFIGURATION';
const LOAD_CONFIGURATION = 'config/LOAD_CONFIGURATION';


const initialState = {
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CONFIGURATION:
      return state;

    case LOAD_CONFIGURATION:
      return {
        ...state,
        ...action.configuration,
      };

    default:
      return state;

  }
};

// Action Creators
export const requestConfiguration = () => ({
  type: REQUEST_CONFIGURATION,
});

export const receiveConfiguration = (configuration) => ({
  type: LOAD_CONFIGURATION,
  configuration,
});

// Thunk actions
export const getConfiguration = (locale) => (dispatch) => {

  dispatch(requestConfiguration());
  return configurationService.getConfiguration(locale)
    .then((configuration) => {
      dispatch(receiveConfiguration(configuration));
    })
    .catch((err) => {
      console.error('Error receiving configuration', err);
    });
};
