import * as React from 'react';

import { injectIntl } from 'react-intl';

import {
  Link,
} from 'react-router-dom';

import {
  StaticRoutes,
} from '../../model';

class Footer extends React.Component {

  constructor(props) {
    super(props);
  }

  get logoImage() {
    return '/images/climact-logo-white.png';
  }

  resolveClassName() {
    const { location } = this.props;

    if (location.pathname) {
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
    const _t = this.props.intl.formatMessage;

    return (
      <footer id="footer" className={this.resolveClassName()}>
        <div className="footer-content">
          <div className="d-flex flex-wrap" style={{ alignItems: 'center' }}>
            <div className="footer-column logo">
              <Link to={StaticRoutes.MAIN}>
                <img src={this.logoImage} alt="" />
              </Link>
            </div>
            <div className="footer-column logo">
              <div className="eu-logo">
                <img src="/images/eu-logo.jpg" alt="" />
              </div>
            </div>
            <div className="footer-column about">
              <ul>
                <li><a href="#">{_t({ id: 'footer.members-area' })}</a></li>
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

export default injectIntl(Footer);
