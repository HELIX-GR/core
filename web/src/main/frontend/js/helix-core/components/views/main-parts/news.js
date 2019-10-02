import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { injectIntl } from 'react-intl';

import {
  FormattedDate,
} from 'react-intl';

import {
  buildPath,
  DynamicRoutes,
} from '../../../model';

const truncateText = (text, tag, length = 100) => {
  const result = text.replace(`<${tag}>`, '').replace(`</${tag}>`, '');
  return result.length > length ? result.substring(0, length) + '...' : result;
};

class News extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { posts = null } = this.props;
    const _t = this.props.intl.formatMessage;

    return (
      <div className="latest-news-container container-fluid">
        {posts &&
          <div className="row">

            <div className="col-sm-12">
              <h4 className="latest-news-header">
                {_t({ id: 'main.news.title' })}
              </h4>
            </div>

            {this.renderPosts(posts)}

          </div>
        }
      </div>
    );
  }

  toggleSecureUrl(content) {
    return content.replace(/(http:\/\/)/g, 'https://');
  }

  renderPosts(posts) {
    const _t = this.props.intl.formatMessage;

    return posts.map(p => {
      const imageUrl = (
        p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'].length === 1 ?
          this.toggleSecureUrl(p._embedded['wp:featuredmedia'][0].source_url) :
          '/images/jpg/news-1.jpg'
      );

      return (
        <div key={`${p.id}`} className="col-md-6 col-sm-6 col-xs-12">
          <div className="latest-news-item">
            <div className="featured-image">
              <div className="aspect-ratio">
                <a className="image-content" style={{ backgroundImage: `url(${imageUrl})` }}>
                </a>
              </div>
            </div>
            <div className="item-details">
              <div className="item-date">
                <FormattedDate value={p.modified} day='numeric' month='numeric' year='numeric' />
              </div>
              <NavLink to={buildPath(DynamicRoutes.NEWS_PAGE, [p.id])}>
                <h3 className="item-title">
                  {p.title.rendered}
                </h3>
              </NavLink>
              <div className="item-excerpt style-5">
                <p dangerouslySetInnerHTML={{ __html: truncateText(this.toggleSecureUrl(p.excerpt.rendered), 'p') }}></p>
                <NavLink to={buildPath(DynamicRoutes.NEWS_PAGE, [p.id])} className="read-more">
                  {_t({ id: 'main.news.read-more' })}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

}

export default injectIntl(News);
