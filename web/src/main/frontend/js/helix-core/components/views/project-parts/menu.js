import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { injectIntl } from 'react-intl';

import {
  buildPath,
  DynamicRoutes,
  WordPressPages
} from '../../../model';

class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      TechnicalDetails: false,
    };
  }

  toggleSubMenu(e, key) {
    this.setState({
      [key]: !this.state[key],
    });
  }

  render() {
    const pages = [
      WordPressPages.WhatIsHelix,
      WordPressPages.Services,
      WordPressPages.FAQ,
      WordPressPages.PublishData,
      WordPressPages.Software,
      WordPressPages.Project,
      WordPressPages.Media,
      WordPressPages.AcknowledgeHelix,
      WordPressPages.Contact,
      WordPressPages.TermsOfUse,
    ];
    const _t = this.props.intl.formatMessage;

    return (
      <div className="about-item">

        {pages.map(key => (
          <NavLink key={key} to={buildPath(DynamicRoutes.PROJECT_PAGE, [key])} activeClassName="selected">
            <h4 className="about-title" >
              {_t({ id: `header.menu.project.items.${key}` })}
            </h4>
          </NavLink>))
        }

      </div>
    );
  }
}

export default injectIntl(Menu);
