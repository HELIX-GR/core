
// Libraries
import pathToRegexp from 'path-to-regexp';
import { matchPath } from 'react-router';

/**
 * External routes
 */
export const ExternalRoutes = {
  Data: 'https://data.climpact.gr/dataset',
  Lab: 'https://lab.hellenicdataservice.gr',
};

// Static routes
const Home = '/main/';

const Overview = '/about/overview';
const Targets = '/about/targets';
const Committee = '/about/committee';
const ScientificCommittee = '/about/scientific-committee';
const WorkPackages = '/about/work-packages';
const Deliverables = '/about/deliverables';

const Associate = '/network/associate';
const Core = '/network/core';
const Join = '/network/join';

const Applications = '/applications/overview';
const Services = '/applications/services';
const Tools = '/applications/tools';

const Announcements = '/news-events/announcements';
const Blog = '/news-events/blog';
const ClimpactOnMedia = '/news-events/climpact-on-media';
const DialogueForum = '/news-events/dialogue-forum';
const Newsletter = '/news-events/newsletter';
const OtherEvents = '/news-events/other-events';
const Podcasts = '/news-events/podcasts';
const PressReleases = '/news-events/press-releases';
const Workshops = '/news-events/workshops';

const Contact = '/contact';
const TermsOfUse = '/terms-of-use';



const EVENTS = '/news/events/';
const MAIN = '/main/';
const MAIN_RESULTS = '/main/results';
const NETWORK = '/network/';
const NEWS = '/news/';
const NEWS_EVENTS = '/news-events/';
const PROJECT = '/project/';
const THE_ACTION = '/the-action/';

const PROFILE = '/profile/';
const COLLECTIONS = '/collections/';
const FAVORITES = '/favorites/';

const GOOGLE = '/login/google';
const GITHUB = '/login/github';
const HELIX = '/login/helix';

/**
 * Static routes
 */
export const StaticRoutes = {
  Home,

  Overview,
  Targets,
  Committee,
  ScientificCommittee,
  WorkPackages,
  Deliverables,

  Associate,
  Core,
  Join,

  Applications,
  Services,
  Tools,

  Announcements,
  Blog,
  ClimpactOnMedia,
  DialogueForum,
  Newsletter,
  OtherEvents,
  Podcasts,
  PressReleases,
  Workshops,

  Contact,
  TermsOfUse,

  COLLECTIONS,
  EVENTS,
  FAVORITES,
  MAIN,
  MAIN_RESULTS,
  NETWORK,
  NEWS,
  NEWS_EVENTS,
  PROFILE,
  PROJECT,
  LOGIN: {
    GITHUB,
    GOOGLE,
    HELIX,
  },
  THE_ACTION,
};

// Dynamic routes
const POST_PAGE = '/news-events/post/:id';

/**
 * Dynamic routes
 */
export const DynamicRoutes = {
  POST_PAGE,
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
const Unauthorized = '/error/401';

/**
 * Routes for error pages
 */
export const ErrorPages = {
  Forbidden,
  NotFound,
  Unauthorized,
};

/**
 * API routes
 */
export const api = {
  SearchAll: '/action/catalog/query',
  SearchData: '/action/data/query',
  SearchNotebooks: '/action/notebook/query',
  GetDataset: '/action/dataset/:id',
  GetNotebook: '/action/notebook/:id',
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

  return routes[prop] || null;
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
