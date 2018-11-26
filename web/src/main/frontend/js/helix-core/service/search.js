import * as actions from './api/fetch-actions';
import {
  api as routes,
  buildPath,
} from '../model/routes';

export default {

  searchKeyword: (token, catalogs, term) => {
    return actions.get(`${routes.SearchAll}?catalogs=${catalogs}&search=${term}`, token);
  },

  search: (token, query) => {
    return actions.post(routes.SearchAll, token, query);
  },

  getDataset: (token, id) => {
    return actions.get(buildPath(routes.GetDataset, [id]), token);
  },

  getNotebook: (token, id) => {
    return actions.get(buildPath(routes.GetNotebook, [id]), token);
  },

  getPublication: (token, id) => {
    return actions.get(buildPath(routes.GetPublication, [id]), token);
  },

  getFeaturedPublications: (token) => {
    return actions.get(routes.GetFeaturedPublications, token);
  }
};
