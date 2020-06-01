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
    return '/images/svg/Helix-logo.svg';
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
              <li id="menu-item-data" className="menu-item domain-item">
                <a href={dataHost}>
                  {_t({ id: 'header.menu.data.title' })}
                </a>
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
                  <li><NavLink to={StaticRoutes.EVENTS}>{_t({ id: 'header.menu.news.items.events' })}</NavLink></li>
                  <li><NavLink to={StaticRoutes.ACTIONS}>{_t({ id: 'header.menu.news.items.actions' })}</NavLink></li>
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
                      <li><Link to={StaticRoutes.PROJECT}>{_t({ id: 'header.menu.login.items.help' })}</Link></li>
                      <li><a onClick={this.onLogout}>{_t({ id: 'header.menu.login.items.logout' })}</a></li>
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
