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

import {
  SearchPage,
} from './views';

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
      <SearchPage />
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
