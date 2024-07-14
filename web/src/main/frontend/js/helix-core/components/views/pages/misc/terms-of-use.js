import * as React from 'react';

import { injectIntl } from 'react-intl';

import WordPressPage from '../word-press-page';

class TermsOfUse extends React.Component {

  render() {
    const { countdown, page } = this.props;

    const _t = this.props.intl.formatMessage;

    return (
      <main className="privacy page">
        <div className="container container--md">
          <div className="privacy__title">
            <h1 className="text-overlay">{_t({id: 'pages.terms-of-use.title'})}</h1>
          </div>
          <WordPressPage className="page__content__default page__wrapper" style={{ justifyContent: 'center' }} name={'terms-of-use'} />
        </div>
      </main>
    );
  }

}

export default injectIntl(TermsOfUse);
