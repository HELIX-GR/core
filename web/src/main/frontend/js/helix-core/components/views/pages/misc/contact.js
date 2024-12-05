import * as React from 'react';


import { injectIntl } from 'react-intl';

import WordPressPage from '../word-press-page';

class Contact extends React.Component {

  render() {
    const _t = this.props.intl.formatMessage;

    return (
      <main className="privacy contact page">
        <WordPressPage className="container container--md" name={'contact'} />
      </main>
    );
  }

}

export default injectIntl(Contact);
