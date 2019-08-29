import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactIntl from 'react-intl';

import { Route, Switch } from 'react-router-dom';

import {
  EnumLocale,
  ErrorPages,
} from '../model';

import ContentRoot from './content-root';

import {
  Page401,
  Page403,
  Page404,
} from './pages';

//
// Add locale-specific data for each supported locale
//
// See: https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-to-using-native-intl-apis
//

import 'intl-pluralrules';
import '@formatjs/intl-relativetimeformat/polyfill';

import '@formatjs/intl-relativetimeformat/dist/locale-data/el';

class Root extends React.Component {

  static defaultProps = {
    locale: EnumLocale.EN,
    messages: {},
  }

  render() {
    var { locale, messages } = this.props;

    return (
      <ReactIntl.IntlProvider locale={locale} key={locale} messages={messages}>
        <Switch>
          <Route path={ErrorPages.Unauthorized} component={Page401} />
          <Route path={ErrorPages.Forbidden} component={Page403} exact />
          <Route path={ErrorPages.NotFound} component={Page404} exact />
          <Route path="/" component={ContentRoot} />
        </Switch>
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
