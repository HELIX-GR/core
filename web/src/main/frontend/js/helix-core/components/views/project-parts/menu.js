import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { injectIntl } from 'react-intl';

import {
  buildPath,
  DynamicRoutes,
} from '../../../model';

class Menu extends React.Component {

  toggleSubMenu(e, key) {
    this.setState({
      [key]: !this.state[key],
    });
  }

  render() {
    const { prefix, path, pages } = this.props;

    const _t = this.props.intl.formatMessage;

    return (
      <div className="about-item">

        {pages.map(key => (
          <NavLink key={key} to={buildPath(path, [key])} activeClassName="selected">
            <h4 className="about-title" >
              {_t({ id: `${prefix}.items.${key}` })}
            </h4>
          </NavLink>))
        }

      </div>
    );
  }
}

export default injectIntl(Menu);
