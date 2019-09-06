import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { Pages, ErrorPages, StaticRoutes } from '../../model/routes';

class SecureRoute extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  static defaultProps = {
    roles: [],
  }

  hasAnyRole(roles) {
    if ((!roles) || (roles.length === 0)) {
      return false;
    }

    const { profile } = this.props;
    if (!profile || !profile.account) {
      return false;
    }

    for (let role of roles) {
      if (profile.account.roles.indexOf(role) !== -1) {
        return true;
      }
    }
    return false;
  }

  render() {
    let { roles, profile, ...rest } = this.props;
    let authenticated = (profile != null && profile.account != null);

    if (!authenticated) {
      return (
        <Redirect to={StaticRoutes.MAIN} />
      );
    }
    if (this.hasAnyRole(roles)) {
      return (
        <Route {...rest} />
      );
    }

    return (
      <Redirect to={ErrorPages.Forbidden} />
    );
  }
}

//
// Wrap into a connected component
//

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

const mapDispatchToProps = null;

SecureRoute = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SecureRoute);

export default SecureRoute;
