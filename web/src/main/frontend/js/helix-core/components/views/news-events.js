import * as React from 'react';

import {
  DynamicRoutes,
  getParams,
  WordPressPages,
} from '../../model';

import Project from './project';

class NewsAndEvents extends React.Component {

  render() {
    const { location: { pathname } } = this.props;

    const path = DynamicRoutes.NEWS_EVENTS_PAGE;

    const match = getParams(pathname, {
      path,
      exact: true,
      strict: false,
    });

    const { name = WordPressPages.NewsEvents.DialogueForum } = match ? match.params : {};

    return (
      <Project
        path={path}
        name={name}
        prefix={'header.menu.news-events'}
        pages={Object.values(WordPressPages.NewsEvents)}
      />
    );
  }
}

export default NewsAndEvents;
