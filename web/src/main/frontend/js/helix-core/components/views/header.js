import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Link,
  NavLink,
} from 'react-router-dom';

import {
  buildPath,
  DynamicRoutes,
  ExternalRoutes,
  StaticRoutes,
  WordPressPages,
} from '../../model';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.changeLocale = this.changeLocale.bind(this);
  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  static propTypes = {
    changeLocale: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    profile: PropTypes.object,
  }

  static defaultProps = {
    locale: 'en-GB',
  }

  changeLocale(e, locale) {
    e.preventDefault();

    this.props.changeLocale(locale);
  }

  get currentLocale() {
    return (this.props.locale === 'el' ? 'ΕΛ' : 'EN');
  }

  get logoImage() {
    const { location } = this.props;

    if (location.pathname) {
      if (location.pathname.startsWith('/pubs')) {
        return '/images/svg/Pubs-logo.svg';
      }
    }
    return '/images/svg/Helix-logo.svg';
  }

  get logoLink() {
    const { location } = this.props;

    if (location.pathname) {
      if (location.pathname.startsWith('/pubs')) {
        return StaticRoutes.PUBS;
      }
    }
    return StaticRoutes.MAIN;
  }

  render() {
    const { data: { host: dataHost } } = this.props.config;
    const authenticated = (this.props.profile != null);
    const _t = this.context.intl.formatMessage;

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
              <li id="menu-item-data" className="menu-item domain-item">
                <a href={dataHost}>
                  {_t({ id: 'header.menu.data.title' })}
                </a>
              </li>

              <li id="menu-item-pubs" className="menu-item domain-item">
                <NavLink to={StaticRoutes.PUBS} activeClassName="active-link">
                  {_t({ id: 'header.menu.pubs.title' })}
                </NavLink>
              </li>

              <li id="menu-item-lab" className="menu-item domain-item">
                <a href={ExternalRoutes.Lab}>
                  {_t({ id: 'header.menu.lab.title' })}
                </a>
              </li>

              <li id="menu-item-project" className="menu-item aux-item has-sub-menu">
                <NavLink to={StaticRoutes.PROJECT} activeClassName="active-link" strict={false}>{_t({ id: 'header.menu.project.title' })}</NavLink>
                <ul className="sub-menu">
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.WhatIsHelix])}>{_t({ id: 'header.menu.project.items.what-is-helix' })}</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Services])}>{_t({ id: 'header.menu.project.items.services' })}</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])}>{_t({ id: 'header.menu.project.items.faq' })}</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.PublishData])}>{_t({ id: 'header.menu.project.items.publish-data' })}</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Software])}>{_t({ id: 'header.menu.project.items.software' })}</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Project])}>{_t({ id: 'header.menu.project.items.the-project' })}</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Media])}>{_t({ id: 'header.menu.project.items.media' })}</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.AcknowledgeHelix])}>{_t({ id: 'header.menu.project.items.acknowledge-helix' })}</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Contact])}>{_t({ id: 'header.menu.project.items.contact' })}</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.TermsOfUse])}>{_t({ id: 'header.menu.project.items.terms-of-use' })}</NavLink></li>
                </ul>
              </li>

              <li id="menu-item-news" className="menu-item aux-item has-sub-menu">
                <NavLink to={StaticRoutes.NEWS} activeClassName="active-link">{_t({ id: 'header.menu.news.title' })}</NavLink>
                <ul className="sub-menu">
                  <li><NavLink to={StaticRoutes.NEWS}>{_t({ id: 'header.menu.news.items.news' })}</NavLink></li>
                  <li><a href="#">{_t({ id: 'header.menu.news.items.events' })}</a></li>
                </ul>
              </li>

              <li id="menu-item-lang" className="menu-item aux-item has-sub-menu">
                <a href='' onClick={(e) => e.preventDefault()}>{this.currentLocale}</a>
                <ul className="sub-menu">
                  <li>
                    <a href='' onClick={(e) => this.changeLocale(e, this.props.locale === 'el' ? 'en-GB' : 'el')}>
                      {this.props.locale === 'el' ? 'EN' : 'ΕΛ'}
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
                      <img className="account-icon" src={this.props.profile.imageUrl || '/images/svg/avatar-white.svg'} alt="Account tab" />
                    </a>
                    <ul className="sub-menu">
                      {authenticated &&
                        <li><a href="#">{_t({ id: 'header.menu.login.items.signed-in' }, { username: this.props.profile.username })}</a></li>
                      }
                      <li><a href="#">{_t({ id: 'header.menu.login.items.account' })}</a></li>
                      <li><a href="#">{_t({ id: 'header.menu.login.items.help' })}</a></li>
                      <li><a href="#">{_t({ id: 'header.menu.login.items.settings' })}</a></li>
                      <li><a href="#" onClick={() => this.props.logout()}>{_t({ id: 'header.menu.login.items.logout' })}</a></li>
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

export default Header;
