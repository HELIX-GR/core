import * as React from 'react';
import * as PropTypes from 'prop-types';

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

  static contextTypes = {
    intl: PropTypes.object,
  }

  get logoImage() {
    const { location } = this.props;

    if (location.pathname) {
      if (location.pathname.startsWith('/pubs')) {
        return '/images/svg/Helix-logo-White-on-Pink.svg';
      }
      if (location.pathname.startsWith('/publications')) {
        return '/images/svg/Helix-logo-White-on-Pink.svg';
      }
      if (location.pathname.startsWith('/datasets')) {
        return '/images/svg/Helix-logo-White-on-Blue.svg';
      }
      if (location.pathname.startsWith('/notebooks')) {
        return '/images/svg/Helix-logo-White-on-Purple.svg';
      }
    }
    return '/images/svg/Helix-logo-White-on-Black.svg';
  }

  resolveClassName() {
    const { location } = this.props;

    if (location.pathname) {
      if (location.pathname.startsWith('/pubs')) {
        return 'pubs-footer';
      }
      if (location.pathname.startsWith('/publications')) {
        return 'pubs-footer';
      }
      if (location.pathname.startsWith('/datasets')) {
        return 'data-footer';
      }
      if (location.pathname.startsWith('/notebooks')) {
        return 'lab-footer';
      }
    }
    return "main-footer";
  }

  render() {
    const { data: { host: dataHost } } = this.props.config;
    const _t = this.context.intl.formatMessage;

    return (
      <footer id="footer" className={this.resolveClassName()}>
        <div className="footer-content">
          <div className="d-flex flex-wrap">
            <div className="footer-column logo">
              <Link to={StaticRoutes.MAIN}>
                <img src={this.logoImage} alt="" />
              </Link>
            </div>
            <div className="footer-column about">
              <h3 className="footer-column-title">
                {_t({ id: 'footer.columns.about.title' })}
              </h3>
              <ul>
                <li><Link to={StaticRoutes.MAIN}>{_t({ id: 'footer.columns.about.links.home' })}</Link></li>
                <li><Link to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.WhatIsHelix])}>{_t({ id: 'footer.columns.about.links.what-is-helix' })}</Link></li>
                <li><Link to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.Contact])}>{_t({ id: 'footer.columns.about.links.contact' })}</Link></li>
                <li><Link to={buildPath(DynamicRoutes.PROJECT_PAGE, [WordPressPages.TermsOfUse])}>{_t({ id: 'footer.columns.about.links.terms-of-use' })}</Link></li>
              </ul>
            </div>
            <div className="footer-column research">
              <h3 className="footer-column-title">
                {_t({ id: 'footer.columns.research.title' })}
              </h3>
              <ul>
                <li><a href={dataHost}>{_t({ id: 'footer.columns.research.links.data' })}</a></li>
                <li><Link to={StaticRoutes.PUBS}>{_t({ id: 'footer.columns.research.links.pubs' })}</Link></li>
                <li><a href={ExternalRoutes.Lab}>{_t({ id: 'footer.columns.research.links.lab' })}</a></li>
                <li><a href=''>{_t({ id: 'footer.columns.research.links.topics' })}</a></li>
                <li><a href=''>{_t({ id: 'footer.columns.research.links.organizations' })}</a></li>
              </ul>
            </div>
            <div className="footer-column partners">
              <h3 className="footer-column-title">
                {_t({ id: 'footer.columns.partners.title' })}
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
          </div>
          <div className="copyright-notes">
            {_t({ id: 'footer.copyright' })}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
