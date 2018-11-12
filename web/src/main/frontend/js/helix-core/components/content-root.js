import _ from 'lodash';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { Pages, StaticRoutes, DynamicRoutes } from '../model/routes';

import {
  changeLocale,
} from '../ducks/i18n';

import {
  logout,
} from '../ducks/user';

import {
  toggleDialog as toggleLoginDialog,
} from '../ducks/ui/views/login';

import {
  resize,
} from '../ducks/ui/viewport';

import {
  EnumRole,
} from '../model';

import {
  DebugConsole,
} from './helpers';

import {
  Footer,
  Header,
  Main,
  MainResults,
  News,
  NewsDetails,
  Project,
  Publications,
  PublicationsResults,
} from './views';

import {
  LoginForm,
} from './pages';

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

  resolveBackGroundImage() {
    const { location } = this.props;

    if (location.pathname) {
      if (location.pathname.startsWith('/project/page/')) {
        return '/images/mockups/core-faq-scaled.png';
      }
      if (location.pathname.startsWith('/pubs')) {
        return '/images/mockups/pubs-scaled.png';
      }
      if (location.pathname.startsWith('/news/view')) {
        return '/images/mockups/news-item-scaled.png';
      }
      if (location.pathname.startsWith('/news')) {
        return '/images/mockups/news-scaled.png';
      }
      if (location.pathname.startsWith('/results')) {
        return '/images/mockups/result-all-scaled.png';
      }
    }
    return '/images/mockups/core-main-scaled.png';
  }

  resolvePageClassName() {
    const { location } = this.props;

    if (location.pathname) {
      if (location.pathname.startsWith('/news')) {
        return 'news';
      }
      if (location.pathname.startsWith('/project')) {
        return 'project';
      }
      if (location.pathname.startsWith('/pubs')) {
        return 'pubs';
      }
    }

    return 'home';
  }

  render() {
    const { location, profile } = this.props;
    const isDeveloper = profile && profile.roles ? profile.roles.indexOf(EnumRole.Developer) > -1 : false;

    const routes = (
      <Switch>
        {/* Redirect for authenticated users. Navigation after a successful login operation
            occurs after the component hierarchy is rendered due to state change and causes
            /error/404 to render */}
        <Redirect from={Pages.Register} to={StaticRoutes.MAIN} exact />
        {/* Dynamic routes */}
        <Route path={DynamicRoutes.NEWS_DETAILS} component={NewsDetails} />
        {/* Static routes */}
        <Route path={StaticRoutes.PUBS_RESULTS} component={PublicationsResults} />
        <Route path={StaticRoutes.PUBS} component={Publications} />
        <Route path={StaticRoutes.NEWS} component={News} />
        <Route path={StaticRoutes.PROJECT} component={Project} />
        <Route path={StaticRoutes.MAIN_RESULTS} component={MainResults} />
        {/* Default */}
        <Route path={StaticRoutes.MAIN} component={Main} />
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
        <LoginForm
          toggle={this.props.toggleLoginDialog}
          visible={this.props.login.visible}
        />
        {isDeveloper &&
          <DebugConsole location={location} />
        }
        {isDeveloper &&
          <img
            id="img-debug"
            src={this.resolveBackGroundImage()}
            className="debug-image d-none"
          />
        }
        <div className={this.resolvePageClassName()}>
          <Header
            changeLocale={this.props.changeLocale}
            config={this.props.config}
            locale={this.props.locale}
            location={this.props.location}
            logout={this.props.logout}
            profile={this.props.profile}
            toggleLoginDialog={this.props.toggleLoginDialog}
          />
          {routes}
          <Footer
            config={this.props.config}
            location={this.props.location}
          />
        </div >
      </div >
    );
  }
}

//
// Container component
//

const mapStateToProps = (state) => ({
  config: state.config,
  locale: state.i18n.locale,
  login: state.ui.login,
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeLocale,
  logout,
  resize,
  toggleLoginDialog,
}, dispatch);

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ContentRoot);
