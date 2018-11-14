
// Libraries
import pathToRegexp from 'path-to-regexp';
import { matchPath } from 'react-router';

/**
 * External routes
 */
export const ExternalRoutes = {
  Data: 'https://data.hellenicdataservice.gr',
  Lab: 'https://lab.hellenicdataservice.gr',
};

// Static routes
const MAIN = '/main/';
const MAIN_RESULTS = '/main/results';
const NEWS = '/news/';
const PROJECT = '/project/';
const PUBS = '/pubs/';
const PUBS_RESULTS = '/pubs/results';

/**
 * Static routes
 */
export const StaticRoutes = {
  MAIN,
  MAIN_RESULTS,
  NEWS,
  PROJECT,
  PUBS,
  PUBS_RESULTS,
};

// Dynamic routes
const NEWS_DETAILS = '/news/view/:id';
const PROJECT_PAGE = '/project/page/:name';

/**
 * Dynamic routes
 */
export const DynamicRoutes = {
  NEWS_DETAILS,
  PROJECT_PAGE,
};

// Routes for utility pages
const Register = '/pages/register';
const ResetPassword = '/pages/reset-password';

/**
 * Routes for utility pages
 */
export const Pages = {
  Register,
  ResetPassword,
};

// Routes for error pages
const Forbidden = '/error/403';
const NotFound = '/error/404';

/**
 * Routes for error pages
 */
export const ErrorPages = {
  Forbidden,
  NotFound,
};

/**
 * API routes
 */
export const api = {
  SearchAll: '/action/catalog/query',
  SearchData: '/action/data/query',
  SearchNotebooks: '/action/notebook/query',
  SearchPubs: '/action/publication/query',
};

// Default links
const routes = {
  // Pages
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

export function getParams(path, props) {
  return matchPath(path, props);
}
