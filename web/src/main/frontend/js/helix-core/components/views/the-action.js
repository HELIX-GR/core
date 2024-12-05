import * as React from 'react';

import {
  DynamicRoutes,
  getParams,
  WordPressPages,
} from '../../model';

import Project from './project';

class TheAction extends React.Component {

  render() {
    const { location: { pathname } } = this.props;

    const path = DynamicRoutes.THE_ACTION_PAGE;

    const match = getParams(pathname, {
      path,
      exact: true,
      strict: false,
    });

    const { name = WordPressPages.Action.Overview } = match ? match.params : {};

    return (
      <Project
        path={path}
        name={name}
        prefix={'header.menu.the-action'}
        pages={Object.values(WordPressPages.Action)}
      />
    );
  }
}

export default TheAction;
