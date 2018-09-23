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

import {
  main,
  news,
  project,
  pubs,
} from './ducks/ui/views';

export default Redux.combineReducers({
  config,
  i18n,
  meta,
  ui: Redux.combineReducers({
    main,
    news,
    project,
    pubs,
    viewport,
  }),
  user,
});
