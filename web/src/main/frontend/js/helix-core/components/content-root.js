import _ from 'lodash';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { Pages, StaticRoutes, DynamicRoutes, ErrorPages } from '../model/routes';
import { resize } from '../ducks/ui/viewport';

import Home from './home';
import LoginForm from './pages/login-form';

import Page403 from './pages/page-403.js';
import Page404 from './pages/page-404.js';

//
// Presentational component
//
class ContentRoot extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._listener = _.debounce(this._setViewport.bind(this), 150);
    window.addEventListener('resize', this._listener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._listener);
  }

  _setViewport() {
    this.props.resize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );
  }

  render() {
    const authenticated = (this.props.user != null);
    const routes = (
      <Switch>
        {!authenticated &&
          <Route path={Pages.Login} component={LoginForm} />
        }
        {/* Handle errors first */}
        <Route path={ErrorPages.Forbidden} component={Page403} exact />
        <Route path={ErrorPages.NotFound} component={Page404} exact />
        {/* Redirect for authenticated users. Navigation after a successful login operation
            occurs after the component hierarchy is rendered due to state change and causes
            /error/404 to render */}
        <Redirect from={Pages.Login} to={StaticRoutes.HOME} exact />
        <Redirect from={Pages.Register} to={StaticRoutes.HOME} exact />
        {/* Default component */}
        <Route path="/" component={Home}
        />
      </Switch>
    );

    return (
      <div>
        <ToastContainer
          className="helix-toastify"
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        {routes}
      </div >
    );
  }
}

//
// Container component
//

const mapStateToProps = (state) => ({
  user: state.user.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resize,
}, dispatch);

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ContentRoot);
