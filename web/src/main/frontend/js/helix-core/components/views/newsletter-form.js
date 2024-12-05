/* global jQuery */

import * as React from 'react';
import * as ReactRedux from 'react-redux';

import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import { EnumLocale } from '../../model';

class NewsletterForm extends React.Component {

  componentDidMount() {
    // Inject mailchip JavaScript code

    const id = 'mailchip';
    const existingScript = document.getElementById(id);

    // Remove script if already exists
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }

    const script = document.createElement('script');
    script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
    script.id = id;

    document.body.appendChild(script);
    script.onload = () => {
      this.initializeForm(false);
    };
  }

  initializeForm(refresh) {
    (function ($) {
      window.fnames = new Array();
      window.ftypes = new Array();
      window.fnames[0] = 'EMAIL';
      window.ftypes[0] = 'email';
      window.fnames[1] = 'FNAME';
      window.ftypes[1] = 'text';
      window.fnames[2] = 'MMERGE2';
      window.ftypes[2] = 'text';
      window.fnames[6] = 'FOREAS';
      window.ftypes[6] = 'text';
      /*
       * Translated default messages for the $ validation plugin.
       * Locale: EL
       */
      $.extend($.validator.messages, {
        required: "Αυτό το πεδίο είναι υποχρεωτικό.",
        remote: "Παρακαλώ διορθώστε αυτό το πεδίο.",
        email: "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email.",
        url: "Παρακαλώ εισάγετε ένα έγκυρο URL.",
        date: "Παρακαλώ εισάγετε μια έγκυρη ημερομηνία.",
        dateISO: "Παρακαλώ εισάγετε μια έγκυρη ημερομηνία (ISO).",
        number: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό.",
        digits: "Παρακαλώ εισάγετε μόνο αριθμητικά ψηφία.",
        creditcard: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό πιστωτικής κάρτας.",
        equalTo: "Παρακαλώ εισάγετε την ίδια τιμή ξανά.",
        accept: "Παρακαλώ εισάγετε μια τιμή με έγκυρη επέκταση αρχείου.",
        maxlength: $.validator.format("Παρακαλώ εισάγετε μέχρι και {0} χαρακτήρες."),
        minlength: $.validator.format("Παρακαλώ εισάγετε τουλάχιστον {0} χαρακτήρες."),
        rangelength: $.validator.format("Παρακαλώ εισάγετε μια τιμή με μήκος μεταξύ {0} και {1} χαρακτήρων."),
        range: $.validator.format("Παρακαλώ εισάγετε μια τιμή μεταξύ {0} και {1}."),
        max: $.validator.format("Παρακαλώ εισάγετε μια τιμή μικρότερη ή ίση του {0}."),
        min: $.validator.format("Παρακαλώ εισάγετε μια τιμή μεγαλύτερη ή ίση του {0}.")
      });
    }(jQuery));
  }

  close(e) {
    e.preventDefault();

    this.props.close();
  }

  render() {
    const { locale } = this.props;
    const _t = this.props.intl.formatMessage;


    const link = locale === EnumLocale.EN ?
      "https://mailchimp.com/legal/privacy/#3._Privacy_for_Contacts" :
      "https://translate.google.com/translate?sl=en&tl=el&u=https%3A%2F%2Fmailchimp.com%2Flegal%2Fprivacy%2F%233._Privacy_for_Contacts";

    return (
      <React.Fragment>
        <div className="newsletter_modal__backdrop"></div>
        <div className="newsletter_modal">
          <div id="mc_embed_signup" className="newsletter_modal__inner">
            <a href="#" className="newsletter_modal__close" onClick={(e) => this.close(e)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="31.121" height="31.121"><g data-name="Group 506" fill="none" stroke="#971035" strokeWidth="3"><path data-name="Path 815" d="M1.061 1.061l29 29" /><path data-name="Path 2030" d="M1.061 30.061l29-29" /></g></svg>
            </a>
            <h2>{_t({ id: 'newsletter-form.title' })}</h2>
            <form
              action="https://climpact.us7.list-manage.com/subscribe/post?u=cdb557ea431b9771c4106bc80&id=3f4db02ad3"
              method="post" id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate" target="_blank" noValidate
            >
              <div id="mc_embed_signup_scroll">
                <div className="mc-field-group-split">
                  <div className="mc-field-group">
                    <label htmlFor="mce-FNAME">{_t({ id: 'newsletter-form.label.firstName' })} </label>
                    <input type="text" name="FNAME" className="" placeholder={_t({ id: 'newsletter-form.label.firstName' })} id="mce-FNAME" />
                  </div>
                  <div className="mc-field-group">
                    <label htmlFor="mce-MMERGE2">{_t({ id: 'newsletter-form.label.lastName' })} </label>
                    <input type="text" name="MMERGE2" className="" placeholder={_t({ id: 'newsletter-form.label.lastName' })} id="mce-MMERGE2" />
                  </div>
                </div>
                <div className="mc-field-group-split">
                  <div className="mc-field-group">
                    <label htmlFor="mce-EMAIL">{_t({ id: 'newsletter-form.label.email' })}  <span className="asterisk">*</span>
                    </label>
                    <input type="email" name="EMAIL" className="required email" placeholder="Email *" id="mce-EMAIL" />
                  </div>
                  <div className="mc-field-group">
                    <label htmlFor="mce-FOREAS">{_t({ id: 'newsletter-form.label.authority' })} </label>
                    <input type="text" name="FOREAS" className="" placeholder={_t({ id: 'newsletter-form.label.authority' })} id="mce-FOREAS" />
                  </div>
                </div>
                <div id="mergeRow-gdpr" className="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group">
                  <div className="content__gdpr">
                    <label>{_t({ id: 'newsletter-form.consent.title' })}</label>
                    <p>{_t({ id: 'newsletter-form.consent.text1' })}</p>
                    <fieldset className="mc_fieldset gdprRequired mc-field-group" name="interestgroup_field">
                      <label className="checkbox subfield" htmlFor="gdpr_50524">
                        <input type="checkbox" id="gdpr_50524" name="gdpr[50524]" value="Y" className="av-checkbox gdpr" />
                        <span className="checkbox__control"></span>
                        <span className="checkbox__label">{_t({ id: 'newsletter-form.consent.checkbox' })}</span>
                      </label>
                    </fieldset>
                    <p>{_t({ id: 'newsletter-form.consent.text2' })} <a target="_blank" href="https://climpact.gr/terms-of-use">{_t({ id: 'newsletter-form.consent.link1' })}</a> {_t({ id: 'newsletter-form.consent.text3' })} <a target="_blank" href={link}>{_t({ id: 'newsletter-form.consent.link1' })}</a>.</p>
                  </div>
                  <div className="content__gdprLegal">
                    <p>{_t({ id: 'newsletter-form.consent.text4' })} <a href="https://mailchimp.com/legal/" target="_blank">{_t({ id: 'newsletter-form.consent.link2' })}</a></p>
                  </div>
                </div>
                <div id="mce-responses" className="clear">
                  <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                  <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                </div>
                {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                  <input type="text" name="b_cdb557ea431b9771c4106bc80_3f4db02ad3" tabIndex="-1" />
                </div>
                <div className="clear">
                  <input type="submit" value={_t({ id: 'newsletter-form.button' })} name="subscribe" id="mc-embedded-subscribe" className="button" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.i18n.locale,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewsletterForm));
