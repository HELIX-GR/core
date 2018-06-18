import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactIntl from 'react-intl';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { basename } from '../history';

import {
  Pages,
} from '../model/routes';

import ContentRoot from './content-root';

import {
  LoginForm,
} from './pages';

//
// Add locale-specific data for each supported locale
//

import en from 'react-intl/locale-data/en';
import el from 'react-intl/locale-data/el';

ReactIntl.addLocaleData(en);
ReactIntl.addLocaleData(el);

class Root extends React.Component {

  static defaultProps = {
    locale: 'en-GB',
    messages: {},
  }

  render() {
    var { locale, messages, profile } = this.props;

    return (
      <ReactIntl.IntlProvider locale={locale} key={locale} messages={messages}>
        <BrowserRouter basename={basename} >
          <Switch>
            {!profile &&
              <Route path={Pages.Login} component={LoginForm} exact />
            }
            <Route path="/" component={ContentRoot} />
          </Switch>
        </BrowserRouter>
      </ReactIntl.IntlProvider>
    );
  }
}

const mapStateToProps = (state) => {
  const locale = state.i18n.locale;
  const messages = state.i18n.messages[locale];
  const profile = state.user.profile;
  return { locale, messages, profile };
};

const mapDispatchToProps = null;

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Root);
