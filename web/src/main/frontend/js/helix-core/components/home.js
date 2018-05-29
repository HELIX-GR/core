import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  bindActionCreators
} from 'redux';

import {
  logout,
} from '../ducks/user';

import {
  Pages
} from '../model/routes';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  login() {
    this.props.history.push(Pages.Login);
  }

  render() {
    const authenticated = (this.props.user != null);

    return (
      <div>
        {!authenticated &&
          <div className="row pb-3">
            <div className="col">
              <button type="button" className="btn btn-link px-4 w-100" onClick={(e) => this.login()}>Login</button>
            </div>
          </div>
        }
        {authenticated &&
          <div className="row pb-3">
            <div className="col">
              <button type="button" className="btn btn-link px-4 w-100" onClick={(e) => this.props.logout()}>Logout : {this.props.user.username}</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.profile,
  config: state.config,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home);
