import * as React from 'react';

import {
  DynamicRoutes,
  getParams,
  WordPressPages,
} from '../../model';

import Project from './project';

class Applications extends React.Component {

  render() {
    const { location: { pathname } } = this.props;

    const path = DynamicRoutes.APPLICATIONS_PAGE;

    const match = getParams(pathname, {
      path,
      exact: true,
      strict: false,
    });

    const { name = WordPressPages.Applications.Services } = match ? match.params : {};

    return (
      <Project
        path={path}
        name={name}
        prefix={'header.menu.applications'}
        pages={Object.values(WordPressPages.Applications)}
      />
    );
  }
}

export default Applications;
