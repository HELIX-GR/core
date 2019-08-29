import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  bindActionCreators
} from 'redux';

import {
  getPage,
} from '../../../ducks/ui/views/project';

import {
  EnumLocale,
  WordPressPages,
} from '../../../model';

import {
  Faq,
} from './';

import {
  Code,
} from 'react-content-loader';

class Page extends React.Component {

  constructor(props) {
    super(props);

    const { name } = this.props.match.params;
    this.getPage(name);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { name: previousName } }, locale: previousLocale } = prevProps;
    const { match: { params: { name: nextName } }, locale: nextLocale } = this.props;

    if ((previousName !== nextName) || (previousLocale !== nextLocale)) {
      this.getPage(nextName);
    }
  }

  getPage(name) {
    const { locale } = this.props;
    if (locale !== EnumLocale.EN) {
      name = `${name}-${locale.toLowerCase()}`;
    }
    this.props.getPage(name).then(() => this.scrollToTop());
  }

  scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  toggleSecureUrl(content) {
    return content.replace(/(http:\/\/)/g, 'https://');
  }

  render() {
    const page = this.props.page;

    if (!page) {
      return (
        <div className="mt-3">
          <Code />
          <Code />
          <Code />
        </div>
      );
    }

    return (
      <div>
        {page && !page.slug.startsWith(WordPressPages.FAQ) &&
          <a href=''>
            <h4 className="about-details-header">
              {page.title.rendered.endsWith('-EL') ? page.title.rendered.slice(0, -3) : page.title.rendered}
            </h4>
          </a>
        }
        {page && !page.slug.startsWith(WordPressPages.FAQ) &&
          <div className="about-text style-5" dangerouslySetInnerHTML={{ __html: this.toggleSecureUrl(page.content.rendered) }}>
          </div>
        }
        {page && page.slug.startsWith(WordPressPages.FAQ) &&
          <Faq page={page} />
        }
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  page: state.ui.project.current,
  locale: state.i18n.locale,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPage,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Page);

