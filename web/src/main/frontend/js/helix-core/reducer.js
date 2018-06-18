import * as Redux from 'redux';

import {
  config,
  i18n,
  meta,
  user
} from './ducks';

import {
  viewport,
  wordpress,
} from './ducks/ui/';

import {
  search,
} from './ducks/ui/views';

export default Redux.combineReducers({
  config,
  i18n,
  meta,
  ui: Redux.combineReducers({
    search,
    viewport,
    wordpress,
  }),
  user,
});
