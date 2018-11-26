import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';
import moment from '../../moment-localized';

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
  getPost,
  getRelatedPosts,
} from '../../ducks/ui/views/news';

import {
  buildPath,
  DynamicRoutes,
} from '../../model';

const PARAM_ID = 'id';

const truncateText = (text, tag, length = 200) => {
  const result = text.replace(`<${tag}>`, '').replace(`</${tag}>`, '');
  return result.length > length ? result.substring(0, length) + '...' : result;
};

class NewsDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  title(_t) {
    const { current: post } = this.props.news;
    const parts = [
      _t({ id: 'breadcrumb.news' }),
      moment(post.modified).year().toString(),
      post.title.rendered,
    ];
    return parts.filter(p => !!p).join(' \\\\\\ ');
  }

  getId(props) {
    const params = props.match.params;
    if (!isNaN(params[PARAM_ID])) {
      return +params[PARAM_ID];
    }
    return null;
  }

  getPost(id) {
    this.props.getPost(id)
      .then(() => this.props.getRelatedPosts(3))
      .then(() => this.scrollToTop());
  }

  getPostFirstCategory(post) {
    const key = 'wp:term';

    if ((post._embedded[key]) && (post._embedded[key].length !== 0)) {
      return post._embedded[key][0][0].name;
    }
    return null;
  }

  componentWillMount() {
    const id = this.getId(this.props);
    this.getPost(id);
  }

  shouldComponentUpdate(nextProps) {
    const currentId = this.getId(this.props);
    const nextId = this.getId(nextProps);

    if (currentId !== nextId) {
      this.getPost(nextId);
    }

    return true;
  }

  scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    const { current: post, related: relatedPosts } = this.props.news;
    const _t = this.context.intl.formatMessage;

    return (
      <div>
        <section>
          <div className="landing-section header">
          </div>
        </section>

        <section className="news-landing-page-content">

          <div className="news-helix-container container-fluid">
            {post &&
              <div className="row justify-content-center">
                <div className="col-sm-8">
                  <h4 className="news-details-header">
                    {this.title(_t)}
                  </h4>
                </div>

                <div className="col-sm-8">
                  <div className="news-item-details">
                    {this.renderPost(post, _t)}
                  </div>
                </div>

              </div>
            }
            {relatedPosts &&
              <div className="row justify-content-center">
                <div className="col-sm-8">
                  <h4 className="news-details-header">
                    {_t({ id: 'news.related-news' })}
                  </h4>
                </div>

                <div className="col-sm-8">
                  <div className="news-item-details-related">
                    {this.renderRelatedPosts(relatedPosts)}
                  </div>
                </div>

              </div>
            }
          </div>

        </section>
      </div>

    );
  }

  renderPost(p, _t) {
    const date = moment(p.modified).format("DD MMM YYYY");

    return (
      <div className="row" ref={this.lastPageFirstItem}>
        <div className="col-12">
          <div className="news-item news-item-last"
          >
            <div className="item-details">
              <a>
                <h1 className="item-title">
                  {p.title.rendered}
                </h1>
              </a>
              <div className="item-date">
                {date} \\\ {_t({ id: 'breadcrumb.helix-team' })}
              </div>
              <div className="item-excerpt style-5" dangerouslySetInnerHTML={{ __html: p.content.rendered }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderRelatedPosts(posts) {
    return posts.map((p, index, posts) => {
      const imageUrl = (
        p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'].length === 1 ?
          p._embedded['wp:featuredmedia'][0].source_url :
          '/images/jpg/news-1.jpg'
      );
      const age = moment.duration(moment() - moment(p.modified));
      const date = age.asHours() < 24 ?
        moment(p.modified).fromNow() :
        <FormattedDate value={p.modified} day='numeric' month='numeric' year='numeric' />;
      const _t = this.context.intl.formatMessage;

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
                <NavLink to={buildPath(DynamicRoutes.NEWS_PAGE, [p.id])}>
                  <h3 className="item-title">
                    {p.title.rendered}
                  </h3>
                </NavLink>
                <div className="item-excerpt style-5" dangerouslySetInnerHTML={{ __html: truncateText(p.excerpt.rendered, 'p') }}>
                </div>
                <div>
                  <NavLink to={buildPath(DynamicRoutes.NEWS_PAGE, [p.id])} className="read-more">
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

}

const mapStateToProps = (state) => ({
  news: state.ui.news,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPost,
  getRelatedPosts,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewsDetails);
