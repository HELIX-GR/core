import * as RoleNames from './role';

export {
  EnumAuthProvider,
  EnumCatalog,
  EnumCkanFacet,
  EnumLocale,
  EnumMimeType,
  EnumOpenaireFilter,
  EnumRole,
} from './enum';

export {
  EnumErrorLevel,
  ServerError,
} from './error';

export {
  WordPressPages,
} from './pages';

export {
  buildPath,
  DynamicRoutes,
  ErrorPages,
  ExternalRoutes,
  getParams,
  Pages,
  StaticRoutes,
} from './routes';


export const Roles = {
  ...RoleNames,
};

