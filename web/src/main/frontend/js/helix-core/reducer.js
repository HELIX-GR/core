import * as Redux from 'redux';

import {
  config,
  i18n,
  meta,
  user
} from './ducks';

import {
  viewport,
} from './ducks/ui/';

export default Redux.combineReducers({
  config,
  i18n,
  meta,
  ui: Redux.combineReducers({
    viewport,
  }),
  user,
});
