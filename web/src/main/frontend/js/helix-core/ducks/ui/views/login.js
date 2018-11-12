// Actions
const TOGGLE_DIALOG = 'ui/search-page/TOGGLE_DIALOG';

// Reducer
const initialState = {
  visible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_DIALOG:
      return {
        ...state,
        visible: !state.visible,
      };

    default:
      return state;
  }
};

// Action creators
export const toggleDialog = () => ({
  type: TOGGLE_DIALOG,
});
