/**
 * Libraries
 */
import pathToRegexp from 'path-to-regexp';

/**
 * Static routes
 */
const HOME = '/';
const NEWS = '/news';

const PROJECT = '/project/*';
const PROJECT_ABOUT = '/project/about';
const PROJECT_CONTACT = '/project/contact';
const PROJECT_DEFAULT = '/project/';
const PROJECT_FAQ = '/project/faq';
const PROJECT_LEARN = '/project/learn';
const PROJECT_USE = '/project/use';

const PROJECT_ABOUT_PUBLISH_DATA = '/project/publish-data';
const PROJECT_ABOUT_PROJECT = '/project/details';
const PROJECT_ABOUT_SOFTWARE = '/project/software';


export const StaticRoutes = {
  HOME,
  NEWS,
  PROJECT,
  PROJECT_CHILDREN: {
    ABOUT: PROJECT_ABOUT,
    ABOUT_CHILDREN: {
      PROJECT: PROJECT_ABOUT_PROJECT,
      PUBLISH_DATA: PROJECT_ABOUT_PUBLISH_DATA,
      SOFTWARE: PROJECT_ABOUT_SOFTWARE,
    },
    CONTACT: PROJECT_CONTACT,
    DEFAULT: PROJECT_DEFAULT,
    FAQ: PROJECT_FAQ,
    LEARN: PROJECT_LEARN,
    USE: PROJECT_USE,
  },
};

/**
 * Dynamic routes
 */
const NEWS_DETAILS = '/news/view/:id';

export const DynamicRoutes = {
  NEWS_DETAILS,
};

/**
 * Routes for utility pages
 */
const Login = '/login';
const Register = '/register';
const ResetPassword = '/reset-password';

export const Pages = {
  Login,
  Register,
  ResetPassword,
};

/**
 * Routes for error pages
 */
const Forbidden = '/error/403';
const NotFound = '/error/404';

export const ErrorPages = {
  Forbidden,
  NotFound,
};

/**
 * API routes
 */
export const api = {
  SearchAll: '/action/catalog/query',
  SearchCkan: '/action/ckan/query',
  SearchOpenaire: '/action/openaire/query',
};

/**
 * Default links
 */
const routes = {
  // Pages
  [Login]: {
    description: 'Login to HELIX application',
  },
  [Register]: {
    description: 'Register a new account',
  },
  [ResetPassword]: {
    description: 'Reset password',
  },
  // Error Pages
  [Forbidden]: {
    description: 'Forbidden',
  },
  [NotFound]: {
    description: 'Not Found',
  },
};

/**
 * Find a route by its path e.g. /login
 *
 * @export
 * @param {string} path - the route path
 * @returns the route properties
 */
export function getRoute(path) {
  const prop = matchRoute(path);

  if (routes.hasOwnProperty(prop)) {
    return routes[prop];
  }
  return null;
}

/**
 * Matches the given path to an existing route and returns the route or null
 * if no match is found
 *
 * @export
 * @param {any} path - the route path to match
 * @returns the route that matched the given path or null if no match is found
 */
export function matchRoute(path) {
  for (let route in routes) {
    let re = pathToRegexp(route);
    if (re.test(path)) {
      return route;
    }
  }

  return null;
}

/**
 * Build a path given a route and optional parameters
 *
 * @export
 * @param {string} path - The route name
 * @param {string[]|object} params - Optional parameters to bind
 */
export function buildPath(path, params) {
  let result = path || '/';

  if (params) {
    if (Array.isArray(params)) {
      let re = /:\w+/i;
      for (const value of params) {
        result = result.replace(re, value);
      }
    } else {
      let toPath = pathToRegexp.compile(path);
      result = toPath(params);
    }
  }
  return result;
}
