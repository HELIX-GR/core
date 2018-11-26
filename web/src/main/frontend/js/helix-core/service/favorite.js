import * as actions from './api/fetch-actions';

const EnumAction = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

const api = {

  add: (catalog, handle, title, description, url, token) => {
    const data = {
      action: EnumAction.ADD,
      catalog,
      handle,
      title,
      description,
      url,
    };
    return actions.post('/action/favorite', token, data);
  },

  remove: (catalog, handle, token) => {
    const data = {
      action: EnumAction.REMOVE,
      catalog,
      handle,
    };
    return actions.post('/action/favorite', token, data);
  },

};

export default api;
