import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  NavLink,
} from 'react-router-dom';

import {
  Pages,
  StaticRoutes,
} from '../../model/routes';

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
      <header className="header fixed">
        <div className="logo-area">
          <NavLink to={StaticRoutes.HOME}>
            <img className="logo-image" src="/images/svg/Helix-logo.svg" alt="Helix" />
          </NavLink>
        </div>
        <div className="menu-wrapper">
          <nav className="nav-menu">
            <ul className="menu-items">
              <li id="menu-item-data" className="menu-item domain-item has-sub-menu">
                <a href="index_data.html">
                  Data
                </a>
                <ul className="sub-menu">
                  <li><a href="#">Συμμετέχοντες</a></li>
                  <li><a href="#">Διοργανωτές</a></li>
                  <li><a href="#">Χρηματοδότηση</a></li>
                  <li><a href="#">Ερευνητικό Έργο</a></li>
                </ul>
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
              <li id="menu-item-project" className="menu-item aux-item">
                <NavLink to={StaticRoutes.PROJECT_CHILDREN.DEFAULT} activeClassName="active-link" strict={false}>Το έργο</NavLink>
              </li>
              <li id="menu-item-news" className="menu-item aux-item">
                <NavLink to={StaticRoutes.NEWS} activeClassName="active-link">Νέα</NavLink>
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
              <a onClick={(e) => this.props.logout()}>
                <img className="account-icon" src={this.props.profile.imageUrl || '/images/svg/Avatar.svg'} alt="Account tab" />
              </a>
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
