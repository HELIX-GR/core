import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {
  FormattedDate,
} from 'react-intl';

import {
  buildPath,
  DynamicRoutes,
} from '../../../model';

class News extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="latest-news-container container-fluid">
        {posts.length !== 0 &&
          <div className="row">

            <div className="col-sm-12">
              <h4 className="latest-news-header">
                Latest News
              </h4>
            </div>

            {this.renderPosts(posts)}

          </div>
        }
      </div>
    );
  }

  renderPosts(posts) {
    return posts.map(p => {
      const imageUrl = (
        p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'].length === 1 ?
          p._embedded['wp:featuredmedia'][0].source_url :
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
              <NavLink to={buildPath(DynamicRoutes.NEWS_DETAILS, [p.id])}>
                <h3 className="item-title">
                  {p.title.rendered}
                </h3>
              </NavLink>
              <div className="item-excerpt style-5" dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }}>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

}

export default News;
