import * as React from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Link,
} from 'react-router-dom';
import { NewsletterForm } from '.';

import {
  StaticRoutes,
} from '../../model';

class Footer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newsletterForm: false,
    };
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

  showNewsletterForm(e) {
    e.preventDefault();

    this.setState({ newsletterForm: true });
  }

  render() {
    const _t = this.props.intl.formatMessage;

    return (
      <React.Fragment>
        <footer className="footer">
          <div className="container">
            <div className="footer__upper">
              <div className="footer__upper__block">
                <h3><FormattedMessage id="text.footer.join.header" /></h3>
                <p><FormattedMessage id="text.footer.join.content" /></p>
                <Link to={StaticRoutes.Join} className="btn btn--std">{_t({ id: 'buttons.join' })}</Link>
              </div>
              <div className="footer__upper__block">
                <h3><FormattedMessage id="text.footer.subscribe.header" /></h3>
                <input type="text" placeholder="Email address" style={{ visibility: 'hidden' }} />
                <a href="#" className="btn btn--std" onClick={(e) => this.showNewsletterForm(e)}>{_t({ id: 'buttons.keep-me-updated' })}</a>
              </div>
            </div>
            <div className="footer__logo">
              <a href="/"><img src="/images/logo_footer.png" alt="" /></a>
            </div>
            <div className="footer__logos">
              <a target="_blank" href="http://www.gsrt.gr/"><img src="/images/logos/footer_logo_1.png" alt="" /></a>
              <a target="_blank" href="http://www.mindev.gov.gr/"><img src="/images/logos/footer_logo_2.png" alt="" /></a>
            </div>
            <div className="footer__social">
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/CLIMPACT-%CE%95%CE%B8%CE%BD%CE%B9%CE%BA%CF%8C-%CE%94%CE%AF%CE%BA%CF%84%CF%85%CE%BF-%CE%B3%CE%B9%CE%B1-%CF%84%CE%B7%CE%BD-%CE%9A%CE%BB%CE%B9%CE%BC%CE%B1%CF%84%CE%B9%CE%BA%CE%AE-%CE%91%CE%BB%CE%BB%CE%B1%CE%B3%CE%AE-103548691367278"
                    target="_blank"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12.533" height="24" viewBox="0 0 12.533 24">
                      <path id="Path_1707" data-name="Path 1707" d="M88.133,24V13.067h3.733L92.4,8.8H88.133V6.133c0-1.2.4-2.133,2.133-2.133h2.267V.133C92,.133,90.667,0,89.2,0,86,0,83.733,2,83.733,5.6V8.8H80v4.267h3.733V24Z" transform="translate(-80)" fill="#c9e9fc" fillRule="evenodd" />
                    </svg>
                  </a>
                </li>
                {/* <li>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="27.123" height="22" viewBox="0 0 27.123 22">
                    <path id="Path_1708" data-name="Path 1708" d="M46.589,24c10.247,0,15.822-8.438,15.822-15.822V7.425a12.249,12.249,0,0,0,2.712-2.863,12.509,12.509,0,0,1-3.164.9A5.863,5.863,0,0,0,64.37,2.452,13.821,13.821,0,0,1,60.9,3.808,5.381,5.381,0,0,0,56.836,2,5.661,5.661,0,0,0,51.26,7.575a2.938,2.938,0,0,0,.151,1.205A15.579,15.579,0,0,1,39.959,2.9a5.771,5.771,0,0,0-.753,2.863,5.987,5.987,0,0,0,2.411,4.671,5.08,5.08,0,0,1-2.562-.753h0a5.507,5.507,0,0,0,4.521,5.425,4.645,4.645,0,0,1-1.507.151,2.564,2.564,0,0,1-1.055-.151,5.709,5.709,0,0,0,5.274,3.918,11.377,11.377,0,0,1-6.931,2.411A4.172,4.172,0,0,1,38,21.288,14.223,14.223,0,0,0,46.589,24" transform="translate(-38 -2)" fill="#c9e9fc" fillRule="evenodd" />
                  </svg>
                </a>
              </li> */}
                {/* <li>
                <a href="#">
                  <svg id="Group_526" data-name="Group 526" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path id="Path_1770" data-name="Path 1770" d="M190.649,161.579a5.226,5.226,0,0,0-4.707,2.587h-.07v-2.185H181.1V178h4.97V170.07c0-2.089.4-4.109,2.983-4.109,2.549,0,2.587,2.384,2.587,4.243V178h4.971v-8.8C196.61,164.9,195.683,161.579,190.649,161.579Z" transform="translate(-172.61 -154.005)" fill="#c9e9fc" />
                    <rect id="Rectangle_147" data-name="Rectangle 147" width="4.976" height="16.023" transform="translate(0.396 7.977)" fill="#c9e9fc" />
                    <path id="Path_1771" data-name="Path 1771" d="M2.882,0A2.9,2.9,0,1,0,5.764,2.882,2.883,2.883,0,0,0,2.882,0Z" fill="#c9e9fc" />
                  </svg>
                </a>
              </li> */}
              </ul>
            </div>
            <div className="footer__copyright">
              <p><FormattedMessage id="text.footer.title" /></p>
              <ul>
                <li><Link to={StaticRoutes.Contact}><FormattedMessage id="text.footer.contact" /></Link></li>
                {/*
              <li><a href="/privacy.html">PRIVACY POLICY</a></li>
              */}
                <li><Link to={StaticRoutes.TermsOfUse}><FormattedMessage id="text.footer.terms-of-use" /></Link></li>
              </ul>
            </div>
          </div>
        </footer>
        {this.state.newsletterForm &&
          <NewsletterForm close={() => this.setState({ newsletterForm: false })} />
        }
      </React.Fragment>
    );
  }

}

export default injectIntl(Footer);
