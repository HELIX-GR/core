import * as React from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  buildPath,
  DynamicRoutes,
  ExternalRoutes,
  StaticRoutes,
  WordPressPages,
} from '../../model';

class Footer extends React.Component {

  constructor(props) {
    super(props);
  }

  resolveClassName() {
    const { location } = this.props;

    if (location.pathname) {
      if (location.pathname.startsWith('/pubs')) {
        return 'pubs-footer';
      }
    }
    return "main-footer";
  }

  render() {
    const { ckan: { host: ckanHost } } = this.props.config;

    return (
      <footer id="footer" className={this.resolveClassName()}>
        <div className="footer-content">

          <div className="footer-column logo">
            <Link to={StaticRoutes.MAIN}>
              <img src="/images/svg/Helix-logo-White-on-Black.svg" alt="" />
            </Link>
          </div>
          <div className="footer-column about">
            <h3 className="footer-column-title">
              About
            </h3>
            <ul>
              <li><Link to={StaticRoutes.MAIN}>Αρχική</Link></li>
              <li><Link to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.WhatIsHelix])}>Το έργο</Link></li>
              <li><Link to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Contact])}>Επικοινωνία</Link></li>
              <li><Link to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.TermsOfUse])}>Όροι χρήσης</Link></li>
            </ul>
          </div>
          <div className="footer-column research">
            <h3 className="footer-column-title">
              Έρευνα
            </h3>
            <ul>
              <li><a href={ckanHost}>Data</a></li>
              <li><Link to={StaticRoutes.PUBS}>Publications</Link></li>
              <li><a href={ExternalRoutes.Lab}>Lab</a></li>
              <li><a href="#">Θεματικές</a></li>
              <li><a href="#">Οργανισμοί</a></li>
            </ul>
          </div>
          <div className="footer-column partners">
            <h3 className="footer-column-title">
              Συνεργάτες
            </h3>
            <ul>
              <li>
                <a href="https://www.athenarc.gr/" target="blank">
                  <img src="/images/png/PARTNER-ATHENA.png" alt="" />
                </a>
              </li>

              <li>
                <a href="https://grnet.gr/" target="blank">
                  <img src="/images/png/PARTNER_GRNET.png" alt="" />
                </a>
              </li>

              <li>
                <a href="https://www.openaire.eu/" target="blank">
                  <img src="/images/png/PARTNER_OPENAIRE.png" alt="" />
                </a>
              </li>

              <li>
                <a href="https://www.minedu.gov.gr/" target="blank">
                  <img src="/images/png/PARTNER-EDUC.png" alt="" />
                </a>
              </li>

            </ul>
          </div>

          <div className="copyright-notes">
            © 2018 HELIX. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
