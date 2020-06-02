import * as React from 'react';
import * as PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import {
  Link,
  NavLink,
} from 'react-router-dom';

import {
  buildPath,
  DynamicRoutes,
  EnumLocale,
  ExternalRoutes,
  StaticRoutes,
  WordPressPages,
} from '../../model';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeLocale = this.onChangeLocale.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  static propTypes = {
    changeLocale: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    profile: PropTypes.object,
  }

  static defaultProps = {
    locale: EnumLocale.EN,
  }

  onChangeLocale(e, locale) {
    e.preventDefault();

    this.props.changeLocale(locale);
  }

  onLogout(e) {
    e.preventDefault();

    this.props.logout();
  }

  get currentLocale() {
    return (this.props.locale === EnumLocale.EL ? 'ΕΛ' : 'EN');
  }

  get logoImage() {
    return '/images/climact-logo.png';
  }

  get logoLink() {
    return StaticRoutes.MAIN;
  }

  get avatarImage() {
    const { imageUrl, profile = null } = this.props.profile.account;

    if (profile && profile.image) {
      return `data:${profile.imageMimeType};base64,${profile.image}`;
    }

    return imageUrl || '/images/svg/avatar-white.svg';
  }

  render() {
    const { data: { host: dataHost } } = this.props.config;
    const authenticated = (this.props.profile != null);

    const _t = this.props.intl.formatMessage;

    return (
      <header className="header">

        <div className="logo-area">
          <NavLink to={this.logoLink}>
            <img className="logo-image" src={this.logoImage} alt="HELIX" />
          </NavLink>
        </div>

        <div className="menu-wrapper">

          <nav className="nav-menu">
            <ul className="menu-items">
              <li id="menu-item-project" className="menu-item aux-item has-sub-menu">
                <NavLink to={StaticRoutes.THE_ACTION} activeClassName="active-link" strict={false}>{_t({ id: 'header.menu.the-action.title' })}</NavLink>
                <ul className="sub-menu">
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.THE_ACTION_PAGE, [WordPressPages.Action.Overview])}>
                      {_t({ id: 'header.menu.the-action.items.the-action-overview' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.THE_ACTION_PAGE, [WordPressPages.Action.Targets])}>
                      {_t({ id: 'header.menu.the-action.items.the-action-targets' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.THE_ACTION_PAGE, [WordPressPages.Action.ManagementCommittee])}>
                      {_t({ id: 'header.menu.the-action.items.the-action-management-committee' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.THE_ACTION_PAGE, [WordPressPages.Action.ScientificCommittee])}>
                      {_t({ id: 'header.menu.the-action.items.the-action-scientific-committee' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.THE_ACTION_PAGE, [WordPressPages.Action.WorkPackages])}>
                      {_t({ id: 'header.menu.the-action.items.the-action-work-packages' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.THE_ACTION_PAGE, [WordPressPages.Action.Deliverables])}>
                      {_t({ id: 'header.menu.the-action.items.the-action-deliverables' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.THE_ACTION_PAGE, [WordPressPages.Action.ContactUs])}>
                      {_t({ id: 'header.menu.the-action.items.the-action-contact-us' })}
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li id="menu-item-project" className="menu-item aux-item has-sub-menu">
                <NavLink to={StaticRoutes.NETWORK} activeClassName="active-link" strict={false}>{_t({ id: 'header.menu.network.title' })}</NavLink>
                <ul className="sub-menu">
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.NETWORK_PAGE, [WordPressPages.Network.Members])}>
                      {_t({ id: 'header.menu.network.items.network-members' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.NETWORK_PAGE, [WordPressPages.Network.Join])}>
                      {_t({ id: 'header.menu.network.items.network-join' })}
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li id="menu-item-data" className="menu-item domain-item">
                <a href={dataHost}>
                  {_t({ id: 'header.menu.data.title' })}
                </a>
              </li>

              <li id="menu-item-project" className="menu-item aux-item has-sub-menu">
                <NavLink to={StaticRoutes.APPLICATIONS} activeClassName="active-link" strict={false}>{_t({ id: 'header.menu.applications.title' })}</NavLink>
                <ul className="sub-menu">
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.APPLICATIONS_PAGE, [WordPressPages.Applications.Services])}>
                      {_t({ id: 'header.menu.applications.items.applications-services' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.APPLICATIONS_PAGE, [WordPressPages.Applications.Tools])}>
                      {_t({ id: 'header.menu.applications.items.applications-tools' })}
                    </NavLink>
                  </li>
                  <li>
                    <a href={ExternalRoutes.Lab}>
                      {_t({ id: 'header.menu.applications.items.applications-lab' })}
                    </a>
                  </li>
                </ul>
              </li>

              <li id="menu-item-project" className="menu-item aux-item has-sub-menu">
                <NavLink to={StaticRoutes.NEWS_EVENTS} activeClassName="active-link" strict={false}>{_t({ id: 'header.menu.news-events.title' })}</NavLink>
                <ul className="sub-menu">
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.NEWS_EVENTS_PAGE, [WordPressPages.NewsEvents.DialogueForum])}>
                      {_t({ id: 'header.menu.news-events.items.news-events-dialogue-forum' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.NEWS_EVENTS_PAGE, [WordPressPages.NewsEvents.Workshops])}>
                      {_t({ id: 'header.menu.news-events.items.news-events-workshops' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.NEWS_EVENTS_PAGE, [WordPressPages.NewsEvents.OtherEvents])}>
                      {_t({ id: 'header.menu.news-events.items.news-events-other-events' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={buildPath(DynamicRoutes.NEWS_EVENTS_PAGE, [WordPressPages.NewsEvents.Newsletter])}>
                      {_t({ id: 'header.menu.news-events.items.news-events-newsletter' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.NEWS}>
                      {_t({ id: 'header.menu.news-events.items.news-events-blog' })}
                    </NavLink>
                  </li>

                </ul>
              </li>

              <li id="menu-item-lang" className="menu-item aux-item has-sub-menu">
                <a href='' onClick={(e) => e.preventDefault()}>{this.currentLocale}</a>
                <ul className="sub-menu">
                  <li>
                    <a href='' onClick={(e) => this.onChangeLocale(e, this.props.locale === EnumLocale.EL ? EnumLocale.EN : EnumLocale.EL)}>
                      {this.props.locale === EnumLocale.EL ? 'EN' : 'ΕΛ'}
                    </a>
                  </li>
                </ul>
              </li>

            </ul>
          </nav>

          {!authenticated &&
            <div className="account-item">
              <a href='' onClick={(e) => { e.preventDefault(); this.props.toggleLoginDialog(); }}>
                <img className="account-icon" src="/images/svg/avatar-white.svg" alt="Account tab" />
              </a>
            </div>
          }

          {authenticated &&
            <div className="account-item">
              <nav className="nav-menu">
                <ul className="menu-items">
                  <li id="menu-item-account" className="menu-item aux-item has-sub-menu">
                    <a>
                      <img className="account-icon" src={this.avatarImage} alt="Account tab" />
                    </a>
                    <ul className="sub-menu">
                      {authenticated &&
                        <li><a>{_t({ id: 'header.menu.login.items.signed-in' }, { username: this.props.profile.account.username })}</a></li>
                      }
                      <li><Link to={StaticRoutes.PROFILE}>{_t({ id: 'header.menu.login.items.account' })}</Link></li>
                      <li><Link to={StaticRoutes.FAVORITES}>{_t({ id: 'header.menu.login.items.favorites' })}</Link></li>
                      <li><Link to={StaticRoutes.COLLECTIONS}>{_t({ id: 'header.menu.login.items.collections' })}</Link></li>
                      <li><a style={{ cursor: 'pointer' }} onClick={this.onLogout}>{_t({ id: 'header.menu.login.items.logout' })}</a></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          }

          <div className="search-item">
            <Link to={StaticRoutes.MAIN}>
              <i className="fa fa-search"></i>
            </Link>
          </div>

        </div>

      </header>
    );
  }
}

export default injectIntl(Header);
