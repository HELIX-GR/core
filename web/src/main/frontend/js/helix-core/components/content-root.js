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
  updateCountDown,
} from '../ducks/countdown';

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
  Applications,
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
  Network,
  News,
  NewsAndEvents,
  NewsDetails,
  NotebookDetails,
  Profile,
  TheAction,
} from './views';

import {
  LoginForm,
} from './pages';

import {
  Committee,
  Deliverables,
  Overview,
  ScientificCommittee,
  Targets,
  WorkPackages,
} from './views/pages/about';

import {
  Services,
  Tools,
} from './views/pages/applications';

import {
  Associate,
  Core,
  Join,
} from './views/pages/network';

import {
  Blog,
  DialogueForum,
  Newsletter,
  OtherEvents,
  Workshops,
} from './views/pages/news';

import {
  Contact,
  TermsOfUse,
} from './views/pages/misc';

import {
  PostPage
} from './views/pages';

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

    this.countdownInterval = null;
  }

  setBodyClassName() {
    const { location } = this.props;

    let className = '';

    if (location.pathname) {
      if (location.pathname.startsWith('/news-events/other-events')) {
        className = 'events-template';
      }
      if (location.pathname.startsWith('/news-events/blog')) {
        className = 'blog-template';
      }
      if (location.pathname.startsWith('/news-events/dialogue-forum')) {
        className = 'forum-template';
      }
    }

    document.body.className = className;
  }

  componentDidMount() {
    this._viewportListener = _.debounce(this._setViewport.bind(this), 150);
    window.addEventListener('resize', this._viewportListener);

    // Start countdown
    this.countdownInterval = setInterval(() => {
      this.props.updateCountDown();
    }, 997);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._viewportListener);

    // Stop countdown
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  _setViewport() {
    this.props.resize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );
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
    this.setBodyClassName();

    const roles = [Roles.Admin, Roles.User];
    const _t = this.props.intl.formatMessage;

    const routes = (
      <Switch>
        {/* Redirect for authenticated users. Navigation after a successful login operation
            occurs after the component hierarchy is rendered due to state change and causes
            /error/404 to render */}
        <Redirect from={Pages.Register} to={StaticRoutes.MAIN} exact />
        {/* Dynamic routes */}
        <Route path={DynamicRoutes.POST_PAGE} component={PostPage} />

        {/* Static routes */}
        <Route path={StaticRoutes.Home} component={Main} exact />

        <Route path={StaticRoutes.Committee} component={Committee} />
        <Route path={StaticRoutes.Deliverables} component={Deliverables} />
        <Route path={StaticRoutes.Overview} component={Overview} />
        <Route path={StaticRoutes.ScientificCommittee} component={ScientificCommittee} />
        <Route path={StaticRoutes.Targets} component={Targets} />
        <Route path={StaticRoutes.WorkPackages} component={WorkPackages} />

        <Route path={StaticRoutes.Services} component={Services} />
        <Route path={StaticRoutes.Tools} component={Tools} />

        <Route path={StaticRoutes.Associate} component={Associate} />
        <Route path={StaticRoutes.Core} component={Core} />
        <Route path={StaticRoutes.Join} component={Join} />

        <Route path={StaticRoutes.Blog} component={Blog} />
        <Route path={StaticRoutes.DialogueForum} component={DialogueForum} />
        <Route path={StaticRoutes.Newsletter} component={Newsletter} />
        <Route path={StaticRoutes.OtherEvents} component={OtherEvents} />
        <Route path={StaticRoutes.Workshops} component={Workshops} />

        <Route path={StaticRoutes.Contact} component={Contact} />
        <Route path={StaticRoutes.TermsOfUse} component={TermsOfUse} />

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
        <div>
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
  updateCountDown,
}, dispatch);

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(injectIntl(ContentRoot));
