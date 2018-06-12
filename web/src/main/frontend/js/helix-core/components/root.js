import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactIntl from 'react-intl';

import { BrowserRouter, Route } from 'react-router-dom';
import { basename } from '../history';

import ContentRoot from './content-root';

//
// Add locale-specific data for each supported locale
//

import en from 'react-intl/locale-data/en';
import el from 'react-intl/locale-data/el';

ReactIntl.addLocaleData(en);
ReactIntl.addLocaleData(el);

class Root extends React.Component {

  render() {
    var { locale, messages } = this.props;

    return (
      <ReactIntl.IntlProvider locale={locale} key={locale} messages={messages}>
        <BrowserRouter basename={basename} >
          <Route path="/" component={ContentRoot} />
        </BrowserRouter>
      </ReactIntl.IntlProvider>
    );
  }
}

Root.defaultProps = {
  locale: 'en-GB',
  messages: {},
};

const mapStateToProps = (state) => {
  const locale = state.i18n.locale;
  const messages = state.i18n.messages[locale];
  return { locale, messages };
};

const mapDispatchToProps = null;

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Root);
