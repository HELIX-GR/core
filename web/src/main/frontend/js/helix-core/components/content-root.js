import _ from 'lodash';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { Pages, StaticRoutes, DynamicRoutes, ErrorPages } from '../model/routes';

import {
  changeLocale,
} from '../ducks/i18n';

import {
  logout,
} from '../ducks/user';

import {
  resize,
} from '../ducks/ui/viewport';

import {
  Page403,
  Page404,
} from './pages';

import {
  Footer,
  Header,
  News,
  NewsDetails,
  Project,
  SearchPage,
} from './views';

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
    const routes = (
      <Switch>
        {/* Handle errors first */}
        <Route path={ErrorPages.Forbidden} component={Page403} exact />
        <Route path={ErrorPages.NotFound} component={Page404} exact />
        {/* Redirect for authenticated users. Navigation after a successful login operation
            occurs after the component hierarchy is rendered due to state change and causes
            /error/404 to render */}
        <Redirect from={Pages.Login} to={StaticRoutes.HOME} exact />
        <Redirect from={Pages.Register} to={StaticRoutes.HOME} exact />
        {/* Dynamic routes */}
        <Route path={DynamicRoutes.NEWS_DETAILS} component={NewsDetails} />
        {/* Static routes */}
        <Route path={StaticRoutes.NEWS} component={News} />
        <Route path={StaticRoutes.PROJECT} component={Project} />
        {/* Default */}
        <Route path={StaticRoutes.HOME} component={SearchPage} />
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
        <Header
          changeLocale={this.props.changeLocale}
          locale={this.props.locale}
          logout={this.props.logout}
          profile={this.props.profile}
        />
        {routes}
        <Footer />
      </div >
    );
  }
}

//
// Container component
//

const mapStateToProps = (state) => ({
  locale: state.i18n.locale,
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeLocale,
  logout,
  resize,
}, dispatch);

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ContentRoot);
