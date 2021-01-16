import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  bindActionCreators
} from 'redux';

import {
  getPage,
} from '../../../ducks/ui/views/project';

import { injectIntl } from 'react-intl';

import {
  EnumLocale,
} from '../../../model';

class WordPressPage extends React.Component {

  constructor(props) {
    super(props);

    this.getPage();
  }

  getPageName() {
    const { locale, name } = this.props;

    if (locale !== EnumLocale.EN) {
      return `${name}-${locale.toLowerCase()}`;
    }
    return name;
  }

  getPage() {
    const name = this.getPageName();

    this.props.getPage(name).then(() => window.scrollTo(0, 0));
  }

  toggleSecureUrl(content) {
    return content.replace(/(http:\/\/)/g, 'https://');
  }

  componentDidUpdate(prevProps) {
    const { name: previousName, locale: previousLocale } = prevProps;
    const { name: nextName, locale: nextLocale } = this.props;

    if ((previousName !== nextName) || (previousLocale !== nextLocale)) {
      this.getPage();
    }
  }

  render() {
    const { className, style = {}, pages } = this.props;

    const name = this.getPageName();

    if (!pages[name]) {
      return null;
    }

    const page = pages[name].page;

    return (
      <div className={className} style={style} dangerouslySetInnerHTML={{ __html: this.toggleSecureUrl(page.content.rendered) }}>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  countdown: state.countdown.value,
  locale: state.i18n.locale,
  pages: state.ui.project.pages,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPage,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(WordPressPage));
