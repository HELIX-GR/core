import * as React from 'react';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

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

    this.state = {
      open: false,
    };

    this.aboutRef = React.createRef();
    this.networkRef = React.createRef();
    this.appRef = React.createRef();
    this.newsRef = React.createRef();
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

  outerHeight(el, margin = false) {
    var height = el.offsetHeight;

    if (margin) {
      const style = getComputedStyle(el);
      height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    }

    return height;
  }

  render() {
    const _t = this.props.intl.formatMessage;

    return (
      <header className="header">
        <div className={
          classnames({
            "header__inner": true,
            'open': this.state.open,
          })
        }>
          <a href="#" className="header__burger" onClick={(e) => {
            e.preventDefault();
            this.setState((state) => ({ open: !state.open }));
          }}></a>
          <a href="/" className="header__logo"><img src="/images/logo.svg" alt="" /></a>
          <nav className="header__nav">
            <ul>
              <li>
                <NavLink to={StaticRoutes.Home} activeClassName="active">
                  {_t({ id: 'header.menu.about.items.home' })}
                </NavLink>
              </li>
              <li className="has-submenu" onMouseOver={(e) => {
                const height = this.outerHeight(this.aboutRef.current);

                document.documentElement.style.setProperty('--header-height-open', `${height}px`);
              }}>
                <a href="#">ABOUT</a>
                <ul className="submenu" ref={this.aboutRef} >
                  <li>
                    <NavLink to={StaticRoutes.Overview} activeClassName="active">
                      {_t({ id: 'header.menu.about.items.overview' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.Targets} activeClassName="active">
                      {_t({ id: 'header.menu.about.items.targets' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.Committee} activeClassName="active">
                      {_t({ id: 'header.menu.about.items.committee' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.ScientificCommittee} activeClassName="active">
                      {_t({ id: 'header.menu.about.items.scientific-committee' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.WorkPackages} activeClassName="active">
                      {_t({ id: 'header.menu.about.items.work-packages' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.Deliverables} activeClassName="active">
                      {_t({ id: 'header.menu.about.items.deliverables' })}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="has-submenu" onMouseOver={(e) => {
                const height = this.outerHeight(this.networkRef.current);

                document.documentElement.style.setProperty('--header-height-open', `${height}px`);
              }}>
                <a href="#">NETWORK</a>
                <ul className="submenu" ref={this.networkRef}>
                  <li>
                    <NavLink to={StaticRoutes.Core} activeClassName="active">
                      {_t({ id: 'header.menu.network.items.core' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.Associate} activeClassName="active">
                      {_t({ id: 'header.menu.network.items.associate' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.Join} activeClassName="active">
                      {_t({ id: 'header.menu.network.items.join' })}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <a href={ExternalRoutes.Data} target="_blank">DATA</a>
              </li>
              <li className="has-submenu" onMouseOver={(e) => {
                const height = this.outerHeight(this.appRef.current);

                document.documentElement.style.setProperty('--header-height-open', `${height}px`);
              }}>
                <a href="#">APPLICATIONS</a>
                <ul className="submenu" ref={this.appRef} >
                  <li>
                    <NavLink to={StaticRoutes.Services} activeClassName="active">
                      {_t({ id: 'header.menu.applications.items.services' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.Tools} activeClassName="active">
                      {_t({ id: 'header.menu.applications.items.tools' })}
                    </NavLink>
                  </li>
                  <li>
                    <a href={ExternalRoutes.Lab} target="_blank">
                      {_t({ id: 'header.menu.applications.items.lab' })}
                      {' '}
                      <img src="../images/icons/arrow-link.svg" alt="" style={{ maxWidth: '0.83em' }} />
                    </a>
                  </li>
                </ul>
              </li>
              <li className="has-submenu" onMouseOver={(e) => {
                const height = this.outerHeight(this.newsRef.current);

                document.documentElement.style.setProperty('--header-height-open', `${height}px`);
              }}>
                <a href="#">NEWS & EVENTS</a>
                <ul className="submenu" ref={this.newsRef} >
                  <li>
                    <NavLink to={StaticRoutes.Workshops} activeClassName="active">
                      {_t({ id: 'header.menu.news-events.items.workshops' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.OtherEvents} activeClassName="active">
                      {_t({ id: 'header.menu.news-events.items.other-events' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.Newsletter} activeClassName="active">
                      {_t({ id: 'header.menu.news-events.items.newsletter' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.Blog} activeClassName="active">
                      {_t({ id: 'header.menu.news-events.items.blog' })}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={StaticRoutes.DialogueForum} activeClassName="active">
                      {_t({ id: 'header.menu.news-events.items.dialogue-forum' })}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <ul className="header__lang">
            <li className="active"><a href="#">ΕΛ</a></li>
            <li><a href="#">EN</a></li>
          </ul>
          <a href="#" className="header__login">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
              <path id="Path_1597" data-name="Path 1597" d="M18.5,36A17.5,17.5,0,1,0,36,18.5,17.5,17.5,0,0,0,18.5,36ZM36,50.167a14.274,14.274,0,0,1-7.333-2.056,7.333,7.333,0,0,1,14.667,0A14.274,14.274,0,0,1,36,50.167ZM32.5,34.056a3.5,3.5,0,1,1,3.5,3.5A3.5,3.5,0,0,1,32.5,34.056ZM50.167,36a13.833,13.833,0,0,1-3.833,9.611,10.612,10.612,0,0,0-5.389-6.833,6.833,6.833,0,1,0-9.889,0,10.612,10.612,0,0,0-5.389,6.833A13.833,13.833,0,0,1,21.833,36a14.167,14.167,0,0,1,28.333,0Z" transform="translate(-18.5 -18.5)" fill="#c9e9fc" />
            </svg>
          </a>
        </div>
      </header>
    );
  }

  renderOld() {
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
                    <a href={ExternalRoutes.Lab} target="_blank">
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
