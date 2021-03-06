import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import classnames from 'classnames';
import moment from '../../../moment-localized';

import {
  bindActionCreators
} from 'redux';

import {
  NavLink,
} from 'react-router-dom';

import {
  FormattedDate,
} from 'react-intl';

import {
  getPosts,
} from '../../../ducks/ui/views/news';

import {
  buildPath,
  DynamicRoutes,
  EnumPostCategory,
} from '../../../model';

import {
  Code,
} from 'react-content-loader';

const truncateText = (text, tag, length = 200) => {
  const result = text.replace(`<${tag}>`, '').replace(`</${tag}>`, '');
  return result.length > length ? result.substring(0, length) + '...' : result;
};

class News extends React.Component {

  constructor(props) {
    super(props);

    this.lastPageFirstItem = React.createRef();
  }

  static propTypes = {
    category: PropTypes.string.isRequired,
  }

  onLoadMore(e) {
    e.preventDefault();

    const { category } = this.props;
    const { pageIndex, pageSize } = this.props.news.page;

    this.props.getPosts(pageIndex + 1, pageSize, category).then(() => {
      this.scrollElementIntoViewIfNeeded();
    });
  }

  componentDidMount() {
    const { category } = this.props;

    this.props.getPosts(1, 5, category);
  }

  getRoute() {
    const { category } = this.props;

    switch (category) {
      case EnumPostCategory.News:
        return DynamicRoutes.NEWS_PAGE;
      case EnumPostCategory.Events:
        return DynamicRoutes.EVENT_PAGE;
      case EnumPostCategory.Actions:
        return DynamicRoutes.ACTION_PAGE;
      default:
        return null;
    }
  }

  render() {
    const { category } = this.props;
    const { page, loading } = this.props.news;
    const _t = this.props.intl.formatMessage;

    return (
      <div>
        <section>
          <div className="landing-section header">
          </div>
        </section>

        <section className="news-landing-page-content">

          <div className="news-helix-container container-fluid">
            <div className="row">

              <div className="col-sm-12">
                <h4 className="news-header">
                  {_t({ id: `${category}.title` })}
                </h4>
              </div>

              <div className="col">
                <div className="news-item-list">
                  {!page.posts &&
                    <div className="mt-3">
                      <Code />
                      <Code />
                    </div>
                  }
                  {page.posts && page.posts.length !== 0 &&
                    this.renderPosts(page.posts)
                  }
                </div>
              </div>

            </div>
            {page.posts && page.posts.length !== 0 &&
              <div>
                <button
                  type="submit"
                  name="landing-search-button"
                  className="landing-search-button"
                  disabled={loading}
                  onClick={(e) => this.onLoadMore(e)}
                >
                  {!loading &&
                    <span>{_t({ id: `${category}.load-more` })}</span>
                  }
                  {loading &&
                    <i className='fa fa-spin fa-spinner'></i>
                  }
                </button>
              </div>
            }

          </div>

        </section>
      </div>
    );
  }

  toggleSecureUrl(content) {
    return content.replace(/(http:\/\/)/g, 'https://');
  }

  renderPosts(posts) {
    return posts.map((p, index, posts) => {
      const imageUrl = (
        p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'].length === 1 ?
          this.toggleSecureUrl(p._embedded['wp:featuredmedia'][0].source_url) :
          '/images/jpg/news-1.jpg'
      );

      const modifiedAt = moment(p.modified).parseZone();
      const age = moment.duration(moment() - modifiedAt);
      const date = age.asHours() < 24 ?
        moment(modifiedAt).fromNow() :
        <FormattedDate value={p.modified} day='numeric' month='numeric' year='numeric' />;
      const _t = this.props.intl.formatMessage;

      return (
        <div key={`${p.id}`} className="row" ref={this.lastPageFirstItem}>
          <div className="col-12">
            <div className={
              classnames({
                "news-item": true,
                'news-item-last': (posts.length - 1) === index,
              })
            }
            >
              <div className="featured-image">
                <div className="aspect-ratio">
                  <a className="image-content" style={{ backgroundImage: `url(${imageUrl})` }}>
                  </a>
                </div>
              </div>
              <div className="item-details">
                <div className="item-date">
                  {date}
                </div>
                <NavLink to={buildPath(this.getRoute(), [p.id])}>
                  <h3 className="item-title">
                    {p.title.rendered}
                  </h3>
                </NavLink>
                <div className="item-excerpt style-5" dangerouslySetInnerHTML={{ __html: truncateText(this.toggleSecureUrl(p.excerpt.rendered), 'p') }}>
                </div>
                <div>
                  <NavLink to={buildPath(this.getRoute(), [p.id])} className="read-more">
                    {_t({ id: 'news.read-more' })}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  scrollElementIntoViewIfNeeded() {
    // Scroll view is needed
  }
}

const mapStateToProps = (state) => ({
  news: state.ui.news,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPosts,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(News));
