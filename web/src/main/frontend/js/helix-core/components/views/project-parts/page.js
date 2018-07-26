import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  bindActionCreators
} from 'redux';

import {
  getPage,
} from '../../../ducks/ui/views/project';

import {
  WordPressPages,
} from '../../../model';

import {
  ProjectFaq,
} from './';

class Page extends React.Component {

  constructor(props) {
    super(props);

    const { name } = this.props.match.params;
    this.getPage(name);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { name: previousName } }, locale: previousLocale } = this.props;
    const { match: { params: { name: nextName } }, locale: nextLocale } = nextProps;

    if ((previousName !== nextName) || (previousLocale !== nextLocale)) {
      this.getPage(nextName);
    }
  }

  getPage(name) {
    const { locale } = this.props;
    if (locale !== 'en-GB') {
      name = `${name}-${locale.toLowerCase()}`;
    }
    this.props.getPage(name);
  }

  render() {
    const page = this.props.page;

    return (
      <div>
        {page &&
          <a href="#">
            <h4 className="about-details-header">
              {page.title.rendered}
            </h4>
          </a>
        }
        {page && page.slug !== WordPressPages.FAQ &&
          <div className="item-excerpt style-5" dangerouslySetInnerHTML={{ __html: page.content.rendered }}>
          </div>
        }
        {page && page.slug === WordPressPages.FAQ &&
          <ProjectFaq page={page} />
        }
      </div >

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
