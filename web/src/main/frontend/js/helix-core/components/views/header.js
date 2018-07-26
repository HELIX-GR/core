import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  NavLink,
} from 'react-router-dom';

import {
  buildPath,
  DynamicRoutes,
  Pages,
  StaticRoutes,
  WordPressPages,
} from '../../model';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.changeLocale = this.changeLocale.bind(this);
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

  changeLocale() {
    const locale = (this.props.locale === 'el' ? 'en-GB' : 'el');
    this.props.changeLocale(locale);
  }

  get locale() {
    return (this.props.locale === 'el' ? 'ΕΛ' : 'EN');
  }

  render() {
    const authenticated = (this.props.profile != null);

    return (
      <header className="header">

        <div className="logo-area">
          <NavLink to={StaticRoutes.HOME}>
            <img className="logo-image" src="/images/svg/Helix-logo.svg" alt="Helix" />
          </NavLink>
        </div>

        <div className="menu-wrapper">

          <nav className="nav-menu">
            <ul className="menu-items">
              <li id="menu-item-data" className="menu-item domain-item">
                <a href="index_data.html">
                  Data
                </a>
              </li>

              <li id="menu-item-pubs" className="menu-item domain-item">
                <a href="index_pubs.html">
                  Pubs
                </a>
              </li>

              <li id="menu-item-lab" className="menu-item domain-item">
                <a href="index_lab.html">
                  Lab
                </a>
              </li>

              <li id="menu-item-project" className="menu-item aux-item has-sub-menu">
                <NavLink to={StaticRoutes.PROJECT} activeClassName="active-link" strict={false}>About</NavLink>
                <ul className="sub-menu">
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.WhatIsHelix])}>What is HELIX?</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Services])}>Services</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.FAQ])}>FAQ</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.PublishData])}>Publish Data</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Software])}>Software</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Project])}>The project</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Media])}>Media</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.AcknowledgeHelix])}>Acknowledge Helix</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Contact])}>Contact</NavLink></li>
                  <li><NavLink to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.TermsOfUse])}>Terms of use</NavLink></li>
                </ul>
              </li>

              <li id="menu-item-news" className="menu-item aux-item has-sub-menu">
                <NavLink to={StaticRoutes.NEWS} activeClassName="active-link">News</NavLink>
                <ul className="sub-menu">
                  <li><NavLink to={StaticRoutes.NEWS}>News</NavLink></li>
                  <li><a href="#">Events</a></li>
                </ul>
              </li>

            </ul>
          </nav>

          <div className="language-selector" onClick={this.changeLocale}>
            <a href="#">
              {this.locale}
            </a>
          </div>

          {!authenticated &&
            <div className="account-item">
              <NavLink to={Pages.Login}>
                <img className="account-icon" src="/images/svg/avatar-white.svg" alt="Account tab" />
              </NavLink>
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
                        <li><a href="#">Signed in as {this.props.profile.username}</a></li>
                      }
                      <li><a href="#">Account</a></li>
                      <li><a href="#">Help</a></li>
                      <li><a href="#">Settings</a></li>
                      <li><a href="#" onClick={() => this.props.logout()}>Log out</a></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          }

          <div className="search-item">
            <a href="#">
              <i className="fa fa-search"></i>
            </a>
          </div>

        </div>

      </header>
    );
  }
}

export default Header;
