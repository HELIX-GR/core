import * as Redux from 'redux';

import { connectRouter } from 'connected-react-router';

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
  dataset,
  login,
  main,
  news,
  notebook,
  project,
} from './ducks/ui/views';

export default (history) => Redux.combineReducers({
  config,
  i18n,
  meta,
  router: connectRouter(history),
  ui: Redux.combineReducers({
    dataset,
    login,
    main,
    news,
    notebook,
    project,
    viewport,
  }),
  user,
});
