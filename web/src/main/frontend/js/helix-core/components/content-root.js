import _ from 'lodash';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import { injectIntl, FormattedMessage } from 'react-intl';
import { ToastContainer } from 'react-toastify';
import CookieConsent from "react-cookie-consent";

import { EnumAuthProvider, EnumRole as Roles, WordPressPages } from '../model';
import { Pages, StaticRoutes, DynamicRoutes, buildPath } from '../model/routes';

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
  Actions,
  ActionsDetails,
  CollectionDetails,
  Collections,
  DatasetDetails,
  Events,
  EventsDetails,
  Favorites,
  Footer,
  Header,
  Main,
  MainResults,
  News,
  NewsDetails,
  NotebookDetails,
  Profile,
  Project,
} from './views';

import {
  LoginForm,
} from './pages';

import {
  SecureRoute
} from './helpers';

//
// Presentational component
//
class ContentRoot extends React.Component {

  constructor(props) {
    super(props);

    this.toggleLoginDialog = this.toggleLoginDialog.bind(this);
  }

  componentDidMount() {
    this._viewportListener = _.debounce(this._setViewport.bind(this), 150);
    window.addEventListener('resize', this._viewportListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._viewportListener);
  }

  _setViewport() {
    this.props.resize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );
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
      if (location.pathname.startsWith('/datasets')) {
        return 'data';
      }
      if (location.pathname.startsWith('/notebooks')) {
        return 'lab';
      }
    }

    return 'home';
  }

  toggleLoginDialog() {
    const { authProviders = [] } = this.props.config;

    if ((authProviders.length === 1) && (authProviders[0] === EnumAuthProvider.HELIX)) {
      window.location = StaticRoutes.LOGIN.HELIX;
    } else {
      this.props.toggleLoginDialog();
    }
  }

  render() {
    const roles = [Roles.Admin, Roles.User];
    const _t = this.props.intl.formatMessage;

    const routes = (
      <Switch>
        {/* Redirect for authenticated users. Navigation after a successful login operation
            occurs after the component hierarchy is rendered due to state change and causes
            /error/404 to render */}
        <Redirect from={Pages.Register} to={StaticRoutes.MAIN} exact />
        {/* Dynamic routes */}
        <SecureRoute path={DynamicRoutes.COLLECTION_PAGE} component={CollectionDetails} exact roles={roles} />
        <Route path={DynamicRoutes.DATASET_PAGE} component={DatasetDetails} />
        <Route path={DynamicRoutes.ACTION_PAGE} component={ActionsDetails} />
        <Route path={DynamicRoutes.EVENT_PAGE} component={EventsDetails} />
        <Route path={DynamicRoutes.NEWS_PAGE} component={NewsDetails} />
        <Route path={DynamicRoutes.NOTEBOOK_PAGE} component={NotebookDetails} />
        {/* Static routes */}
        <SecureRoute path={StaticRoutes.COLLECTIONS} component={Collections} roles={roles} />
        <SecureRoute path={StaticRoutes.FAVORITES} component={Favorites} roles={roles} />
        <Route path={StaticRoutes.ACTIONS} component={Actions} />
        <Route path={StaticRoutes.EVENTS} component={Events} />
        <Route path={StaticRoutes.NEWS} component={News} />
        <Route path={StaticRoutes.PROJECT} component={Project} />
        <Route path={StaticRoutes.MAIN_RESULTS} component={MainResults} />
        <SecureRoute path={StaticRoutes.PROFILE} component={Profile} roles={roles} />
        {/* Default */}
        <Route path={StaticRoutes.MAIN} component={Main} exact />
        <Redirect to={StaticRoutes.MAIN} />
      </Switch>
    );

    return (
      <React.Fragment>
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
          toggle={this.toggleLoginDialog}
          visible={this.props.login.visible}
        />
        <div className={this.resolvePageClassName()}>
          <Header
            changeLocale={this.props.changeLocale}
            config={this.props.config}
            locale={this.props.locale}
            location={this.props.location}
            logout={this.props.logout}
            profile={this.props.profile}
            toggleLoginDialog={this.toggleLoginDialog}
          />
          {routes}
          <Footer
            config={this.props.config}
            location={this.props.location}
          />
        </div>
        <CookieConsent
          location="none"
          disableStyles={true}
          containerClasses="cookie-consent"
          buttonClasses="cookie-consent-button"
          cookieName="helix-cookie-consent"
          buttonText={_t({ id: 'cookie.accept' })}
        >
          <div>
            <FormattedMessage id="cookie.consent" />
          </div>
          <div className="cookie-consent-learn-more">
            <Link to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.TermsOfUse])}>
              <FormattedMessage id="cookie.learn-more" />
            </Link>
          </div>
        </CookieConsent>
      </React.Fragment>
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

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(injectIntl(ContentRoot));
