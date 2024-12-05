import * as React from 'react';

import {
  DynamicRoutes,
  getParams,
  WordPressPages,
} from '../../model';

import Project from './project';

class Network extends React.Component {

  render() {
    const { location: { pathname } } = this.props;

    const path = DynamicRoutes.NETWORK_PAGE;

    const match = getParams(pathname, {
      path,
      exact: true,
      strict: false,
    });

    const { name = WordPressPages.Network.Members } = match ? match.params : {};

    return (
      <Project
        path={path}
        name={name}
        prefix={'header.menu.network'}
        pages={Object.values(WordPressPages.Network)}
      />
    );
  }
}

export default Network;
