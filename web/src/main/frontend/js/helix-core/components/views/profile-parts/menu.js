import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { injectIntl } from 'react-intl';

import {
  StaticRoutes
} from '../../../model';

class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      TechnicalDetails: false,
    };
  }

  render() {
    const _t = this.props.intl.formatMessage;

    return (
      <div className="profile-item">
        <NavLink to={StaticRoutes.PROFILE} activeClassName="selected">
          <h4 className="profile-title" >
            {_t({ id: 'profile.title' })}
          </h4>
        </NavLink>
        <NavLink to={StaticRoutes.FAVORITES} activeClassName="selected">
          <h4 className="profile-title" >
            {_t({ id: 'header.menu.login.items.favorites' })}
          </h4>
        </NavLink>
        <NavLink to={StaticRoutes.COLLECTIONS} activeClassName="selected">
          <h4 className="profile-title" >
            {_t({ id: 'header.menu.login.items.collections' })}
          </h4>
        </NavLink>
      </div>
    );
  }
}

export default injectIntl(Menu);
